import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { MatDialog, MatSelect, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/primeng';
import { Subscription } from 'rxjs/Subscription';
import { AssessmentSet, Capability, Category, ObjectAssessment } from 'stix/assess/v3/baseline';
import { AttackPattern } from 'stix/unfetter/attack-pattern';
import { Key } from 'ts-keycode-enum';
import { GenericApi } from '../../core/services/genericapi.service';
import { heightCollapse } from '../../global/animations/height-collapse';
import { BaselineMeta } from '../../models/baseline/baseline-meta';
import { Dictionary } from '../../models/json/dictionary';
import { JsonApiData } from '../../models/json/jsonapi-data';
import { Stix } from '../../models/stix/stix';
import { UserProfile } from '../../models/user/user-profile';
import { AppState } from '../../root-store/app.reducers';
import { Constance } from '../../utils/constance';
import { LoadAssessmentResultData } from '../result/store/full-result.actions';
import { FullAssessmentResultState } from '../result/summary/store/full-result.reducers';
import { CleanBaselineWizardData, FetchCapabilities, FetchCapabilityGroups, LoadBaselineWizardData, SetCurrentBaselineCapability, SetCurrentBaselineGroup, UpdatePageTitle, FetchAttackPatterns } from '../store/baseline.actions';
import { BaselineState } from '../store/baseline.reducers';
import { AttackPatternChooserComponent } from './attack-pattern-chooser/attack-pattern-chooser.component';
import { Measurements } from './models/measurements';
import { WeightsModel } from './models/weights-model';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash.uniq'

type ButtonLabel = 'SAVE' | 'CONTINUE';

@Component({
  selector: 'unf-baseline-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
  animations: [heightCollapse],
})
export class WizardComponent extends Measurements implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren('question')
  public questions: QueryList<MatSelect>;

  public currentUser: UserProfile;
  public readonly defaultValue = -1;
  public readonly defaultMeasurement = 'Nothing';
  public readonly sidePanelCollapseHeight = '32px';
  public readonly sidePanelExpandedHeight = '32px';
  public readonly CHART_TYPE: string;
  public readonly DEFAULT_CHART_COLORS: any[];
  public readonly CHART_LABELS: string[];
  public readonly CHART_BG_COLORS: any[];
  public readonly CHART_HOVER_BG_COLORS: any[];

  public model: JsonApiData<ObjectAssessment, Dictionary<ObjectAssessment>>;
  public publishDate = new Date();
  public buttonLabel: ButtonLabel = 'CONTINUE';
  public item: MenuItem[];
  public doughnutChartLabels: string[];
  public doughnutChartData: { data: any[], backgroundColor: any[], hoverBackgroundColor: any[] }[];
  public doughnutChartType: string = this.CHART_TYPE;
  public doughnutChartColors: any[] = this.DEFAULT_CHART_COLORS;

  public summaryDoughnutChartLabels: string[] = this.CHART_LABELS;
  public summaryDoughnutChartData: { data: any[], backgroundColor: any[], hoverBackgroundColor: any[] }[];
  public summaryDoughnutChartType: string = this.CHART_TYPE;
  public summaryDoughnutChartColors = this.DEFAULT_CHART_COLORS;
  public chartOptions = {
    legend: {
      display: false
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const allData = data.datasets[tooltipItem.datasetIndex].data;
          const tooltipLabel = data.labels[tooltipItem.index];
          const tooltipData = allData[tooltipItem.index];
          let total = 0;
          allData.forEach((d) => {
            total += d;
          });
          const tooltipPercentage = Math.round(tooltipData / total * 100);
          return `${tooltipLabel}: ${tooltipPercentage}%`;
        }
      }
    }
  };

  // public description = `An Assessment is your evaluation of the implementations of your network.  You will rate your environment
  // ' to the best of your ability. On the final page of the survey, you will be asked to enter a name for the report and a description.
  // Unfetter Discover will use the survey to help you understand your gaps, how important they are and which should be addressed.
  // You may create multiple reports to see how your risk is changed when implementing different security processes.`;
  public showSummary = false;
  public page = 1;
  public totalPages = 0;
  public meta = new BaselineMeta();
  public insertMode = false;
  private groupings = [];
  public openedSidePanel: string;
  public navigation: { id: string, label: string, page: number };
  public navigations: any[];
  
  private objAssessments: ObjectAssessment[];
  private currentObjAssessment: ObjectAssessment;
  public allCategories: Category[] = [];
  public baselineGroups: Category[] = [];
  public currentBaselineGroup = {} as Category;
  public allCapabilities: Capability[] = [];
  public baselineCapabilities: Capability[] = [];
  public currentCapability = {} as Capability;

  public showHeatmap = false;
  public allAttackPatterns: Observable<AttackPattern[]> = Observable.of([]);
  public selectedFrameworkAttackPatterns: Observable<AttackPattern[]> = Observable.of([]);
  public selectedAttackPatterns: AttackPattern[] = [];

  private readonly subscriptions: Subscription[] = [];
  private readonly sidePanelNames: string[] = ['categories', 'capability-selector', 'capabilities', 'summary'];

  constructor(
    private genericApi: GenericApi,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
    private userStore: Store<AppState>,
    private baselineStore: Store<FullAssessmentResultState>,
    private wizardStore: Store<BaselineState>,
    private changeDetection: ChangeDetectorRef,
    private dialog: MatDialog,
  ) {
    super();
    this.CHART_TYPE = 'doughnut';
    this.DEFAULT_CHART_COLORS = [{}];
    this.CHART_LABELS = ['Risk Accepted', 'Risk Addressed'];
    this.CHART_BG_COLORS = [Constance.COLORS.red, Constance.COLORS.green];
    this.CHART_HOVER_BG_COLORS = [Constance.COLORS.darkRed, Constance.COLORS.darkGreen];
  }

  /*
   * @description
   *  initializes this component, fetchs data to build page
   */
  public ngOnInit(): void {

    this.initChart();

    const idParamSub$ = this.route.params
      .subscribe(
        (params) => {
          const meta: Partial<BaselineMeta> = new BaselineMeta();
          const baselineId = params.baselineId || '';
          if (baselineId) {
            this.loadExistingBaseline(baselineId, meta);
          }
          this.wizardStore.dispatch(new LoadBaselineWizardData(meta));
        },
        (err) => console.log(err),
        () => idParamSub$.unsubscribe());

    const sub4$ = this.wizardStore
      .select('baseline')
      .pluck('finishedLoading')
      .distinctUntilChanged()
      .filter((loaded: boolean) => loaded && loaded === true)
      .subscribe(
        (loaded: boolean) => {
          const panel = this.determineFirstOpenSidePanel();
          if (panel) {
            this.page = 1;
            this.openedSidePanel = 'categories';
          }
        },
        (err) => console.log(err));

    const sub5$ = this.wizardStore
      .select('baseline')
      .pluck('page')
      .distinctUntilChanged()
      .subscribe(
        (page: number) => this.page = page,
        (err) => console.log(err));

    interface SavedState { finished: boolean, id: string };
    const sub6$ = this.wizardStore
      .select('baseline')
      .pluck('saved')
      .distinctUntilChanged()
      .filter((el: SavedState) => el && el.finished === true)
      .subscribe(
        (saved: SavedState) => {
          const id = saved.id;
          this.router.navigate(['/baseline/result/summary', id]);
        },
        (err) => console.log(err));

    const sub7$ = this.wizardStore
      .select('baseline')
      .pluck('baseline')
      .filter((el) => el !== undefined)
      .distinctUntilChanged()
      .subscribe(
        (assessmentSet: AssessmentSet) => {
          const meta = new BaselineMeta();
          meta.title = assessmentSet.name || meta.title;
          meta.description = assessmentSet.description || meta.description;
          meta.created_by_ref = assessmentSet.created_by_ref || meta.created_by_ref;
          this.meta = meta;
        },
        (err) => console.log(err));

    const sub8$ = this.userStore
      .select('users')
      .pluck('userProfile')
      .distinctUntilChanged()
      .take(1)
      .subscribe(
      (user: UserProfile) => {
          const framework = (user && user.preferences && user.preferences.killchain) 
            ? user.preferences.killchain : undefined;
          this.currentUser = user;
          this.wizardStore.dispatch(new FetchAttackPatterns(framework));
        },
        (err) => console.log(err));

    const sub9$ = this.wizardStore
      .select('baseline')
      .pluck('baselineGroups')
      .distinctUntilChanged()
      .subscribe(
        (baselineGroups: Category[]) => {
          this.baselineGroups = baselineGroups;
          this.updateNavigations();
        },
        (err) => console.log(err));

      const sub10$ = this.wizardStore
        .select('baseline')
        .pluck('capabilityGroups')
        .filter((el) => el !== undefined)
        .distinctUntilChanged()
        .subscribe(
          (baselineGroups: Category[]) => {
            this.allCategories = baselineGroups.slice();
          },
          (err) => console.log(err));

      const sub11$ = this.wizardStore
        .select('baseline')
        .pluck('capabilities')
        .distinctUntilChanged()
        .subscribe(
          (capabilities: Capability[]) => {
            this.allCapabilities = capabilities.slice();
          },
          (err) => console.log(err));

      const sub12$ = this.wizardStore
        .select('baseline')
        .pluck('baselineCapabilities')
        .distinctUntilChanged()
        .subscribe(
          (capabilities: Capability[]) => {
            this.baselineCapabilities = capabilities.slice();
            console.log('Current baseline capabilities:');
            console.log(JSON.stringify(this.baselineCapabilities));
            this.updateNavigations();
          },
          (err) => console.log(err));
  
          const sub13$ = this.wizardStore
          .select('baseline')
          .pluck('currentCapabilityGroup')
          .distinctUntilChanged()
          .subscribe(
            (capabilityGroup: Category) => {
              this.currentBaselineGroup = capabilityGroup;
              this.updateNavigations();
            },
            (err) => console.log(err));
    
            const sub14$ = this.wizardStore
            .select('baseline')
            .pluck('currentCapability')
            .distinctUntilChanged()
            .subscribe(
              (capability: Capability) => {
                this.currentCapability = capability;
              },
              (err) => console.log(err));
      
              this.allAttackPatterns = this.wizardStore
        .select('baseline')
        .pluck<{}, AttackPattern[]>('allAttackPatterns')
        .distinctUntilChanged();
    
      this.selectedFrameworkAttackPatterns = this.wizardStore
        .select('baseline')
        .pluck<{}, AttackPattern[]>('selectedFrameworkAttackPatterns')
        .distinctUntilChanged();
    
      this.subscriptions.push(sub4$, sub5$, sub6$, sub7$, sub8$, sub9$, sub10$, sub11$, sub12$, sub13$, sub14$);

      // Fetch categories and capabilities to power this wizard
      this.wizardStore.dispatch(new FetchCapabilityGroups());
      this.wizardStore.dispatch(new FetchCapabilities());
  }

  /**
   * @description initialize the chart data
   * @returns void
   */
  public initChart(): void {
    this.doughnutChartColors = this.DEFAULT_CHART_COLORS;
    this.doughnutChartData = [{
      data: [],
      backgroundColor: this.CHART_BG_COLORS,
      hoverBackgroundColor: this.CHART_HOVER_BG_COLORS,
    }
    ];
    this.doughnutChartLabels = this.CHART_LABELS;
    this.doughnutChartType = this.CHART_TYPE;
    this.summaryDoughnutChartColors = this.DEFAULT_CHART_COLORS;
    this.summaryDoughnutChartData = [{
      data: [],
      backgroundColor: this.CHART_BG_COLORS,
      hoverBackgroundColor: this.CHART_HOVER_BG_COLORS,
    }
    ];
    this.summaryDoughnutChartLabels = this.CHART_LABELS;
    this.summaryDoughnutChartType = this.CHART_TYPE;
  }

  /**
   * @description
   * @returns {void}
   */
  public ngAfterViewInit(): void {
    this.questions.changes.subscribe((questionElements: QueryList<MatSelect>) => {
      const firstQuestion = questionElements.first;
      if (firstQuestion) {
        firstQuestion.focus();
        this.changeDetection.detectChanges();
      }
    });
  }

  public loadExistingBaseline(baselineId: string, meta: Partial<BaselineMeta>): void {
    const sub$ = this.userStore
      .select('users')
      .pluck('userProfile')
      .take(1)
      .subscribe(
        (user: UserProfile) => {
          const sub1$ = this.baselineStore
            .select('fullBaselineNew')
            .distinctUntilChanged()
            .subscribe(
              (arr: AssessmentSet) => this.loadAssessments(baselineId, arr, meta),
              (err) => console.log(err));
          this.subscriptions.push(sub1$);
        },
        (err) => console.log(err));
    this.subscriptions.push(sub$);
    this.baselineStore.dispatch(new LoadAssessmentResultData(baselineId));
  }

  public loadAssessments(baselineId: string, arr: AssessmentSet, meta: Partial<BaselineMeta>): void {
    if (!arr) {
      return;
    }

    /*
     * making the model a collection of all the baselines matching the given rollup id, plus a summary of all the
     * assessed objects to make it easier to use the existing code to display the questions and existing answers
     */
    const summary = new AssessmentSet();
    summary.id = arr.id;
    summary.name = arr.name;
    summary.description = arr.description;
    summary.created = arr.created;
    summary.modified = arr.modified;
    summary.assessments = summary.assessments.concat(arr.assessments);
    summary.created_by_ref = arr.created_by_ref;

    meta.title = summary.name;
    meta.description = summary.description;
    this.wizardStore.dispatch(new LoadBaselineWizardData(meta));
    this.wizardStore.dispatch(new UpdatePageTitle(meta));
  }

  /*
   * @description
   *  cleans up this component, unsubscribes to data
   */
  public ngOnDestroy(): void {
    this.wizardStore.dispatch(new CleanBaselineWizardData());
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  /*
   * @description name of first side panel with data
   * @return {string} name of first open side panel
   */
  public determineFirstOpenSidePanel(): string {
    // TODO: For now, go to first panel (Group Setup), but eventually
    //       want to check for first incomplete capability in this assessment set

    let hasContents = [ this.sidePanelNames[0] ];

    // return first panel w/ data
    return hasContents[0];
  }

  /*
   * @description
   * @param {string} panel name
   * @param {UIEvent} event
   * @return {void}
   */
  public onOpenSidePanel(panelName: string, group?: Category): void {
    if (group) {
      // Adjust page based on given group
      // this.page = this.navigations.find(navigation => navigation.id === group.id).page;

      this.wizardStore.dispatch(new SetCurrentBaselineGroup(group));
    }

    this.updateWizardData();

    this.changeDetection.detectChanges();
  }

  /*
   * @description
   */
  @HostListener('window:keyup', ['$event'])
  public keyEvent(event: KeyboardEvent) {
    if (this.insertMode === true) {
      const validOptions = [
        Key.Zero, Key.One, Key.Two,
        Key.Three, Key.Four, Key.Five
      ];
      const index = validOptions.indexOf(event.keyCode);
      if (index > -1) {
        // this.updateAllQuestions(index);
      }
      this.insertMode = false;
    } else if (event.keyCode === Key.GraveAccent) {
      this.insertMode = true;
    }
  }

  /*
   * @description clicked a stepper
   * @param {number} step
   * @param {UIEvent} event optional
   * @returns {void}
   */
  public navigationClicked(capabilityId: string, event?: UIEvent): void {
    if (event) {
      event.preventDefault();
    }

    this.page = this.navigations.find(navigation => navigation.id === capabilityId);
    this.wizardStore.dispatch(this.baselineCapabilities.find((capability) => capability.id === capability.id));
    this.wizardStore.dispatch(new SetCurrentBaselineGroup(this.baselineGroups.find(category => category.name === this.currentCapability.category)));

    this.openedSidePanel = 'capabilities';
  }

  /*
   * @description
   * @param {UIEvent} event optional
   */
  public onSave(event?: UIEvent): void {
    if (event) {
      event.preventDefault();
    }
    this.saveAssessments();
  }

  /*
   * @description clicked next page
   * @param {UIEvent} event optional
   * @return {void}
   */
  public onNext(event?: UIEvent): void {
    if (event) {
      event.preventDefault();
    }

    this.page += 1;

    this.updateWizardData();
  }

    /*
   * @description clicked back a page
   * @param {UIEvent} event optional
   * @returns {void}
   */
  public onBack(event?: UIEvent): void {
    if (event) {
      event.preventDefault();
    }

    this.page = this.page - 1;

    if (this.page === 1) {
      // Headed to capability group step
      this.openedSidePanel = 'categories';
    }

    this.buttonLabel = 'CONTINUE';

    this.updateWizardData();
  }

  private updateWizardData(): void {
    this.showSummary = false;
    this.buttonLabel = 'CONTINUE';

    // Have we made it beyond the cat/cap pages (i.e. Group Setup + cat/cap pages)?
    if (this.page > 1 + this.navigations.length) {
      // Show summary page
      this.openedSidePanel = 'summary';
      this.showSummarySavePage();
    } else {
      // Determine ID for this page
      const currPage = this.navigations.find((navigation) => navigation.page === this.page);
      const catIndex = this.allCategories.find((category) => category.id === currPage.id);
      let nextPanel: string;

      // Is the next page a category?
      if (catIndex) {
        this.openedSidePanel = 'capability-selector';

        // Move to the next category and its capabilities
        this.wizardStore.dispatch(new SetCurrentBaselineGroup(this.allCategories.find((category) => category.id === currPage.id)));
        this.wizardStore.dispatch(new SetCurrentBaselineCapability(undefined));
      } else {
        this.openedSidePanel = 'capabilities';

        // Update current capability group if we've drifted onto another one
        let currCap = this.baselineCapabilities.find(capability => capability.id === currPage.id) as Capability;
        if (currCap.category !== this.currentBaselineGroup.name) {
          this.wizardStore.dispatch(new SetCurrentBaselineGroup(this.allCategories.find((category) => category.name === currCap.category)));
        }

        this.wizardStore.dispatch(new SetCurrentBaselineCapability(currCap));
      }
    }
  }

  /*
   * @description
   * @return {void}
   */
  public showSummarySavePage(): void {
    this.wizardStore.dispatch(new SetCurrentBaselineCapability(undefined));
    
    this.showSummary = true;
    this.buttonLabel = 'SAVE';
  }

  /*
   * @description
   * @return {boolean} true if first page of first side panel otherwise false
   */
  public isFirstPageOfFirstSidePanel(): boolean {
    const isFirstPanel = this.openedSidePanel === this.determineFirstOpenSidePanel();
    return isFirstPanel && this.isFirstPage();
  }

  /*
   * @description
   * @return {boolean} true if first page of first side panel otherwise false
   */
  public isFirstPage(): boolean {
    return this.page <= 1;
  }

  /*
   * @description
   * @return {boolean} true if title is empty otherwise false
   */
  public isTitleEmpty(): boolean {
    return !this.meta.title || this.meta.title.trim() === '';
  }

  /**
   * @description angular track by list function, uses the items id if
   *  it exists, otherwise uses the index
   * @param {number} index
   * @param {item}
   * @return {number}
   */
  public trackByFn(index: number, item: any): number {
    return item.id || index;
  }

  /*
   * @description Update active list of categories in this wizard 
   * @param categorySteps 
   * @return {void}
   */
  private updateNavigations(): void {
    if (!this.baselineGroups) {
      return;
    }

    this.navigations = [];

    // TODO: Fill out navigations array and baselineGroups dictionary
    let index = 2;   // start at 2; 1 is 'GROUP SETUP'
    this.baselineGroups.forEach((category) => {
      this.navigations.push( { id: category.id, label: category.name,  page: index++ } );
      console.log('Added category: ', category.name);
      let capsForThisCategory = this.baselineCapabilities.filter(cap => cap.category === category.name);
      capsForThisCategory.forEach((cap) => {
          this.navigations.push( { id: cap.id, label: cap.name,  page: index++ } );
          console.log('Added capability: ', cap.name);
        })
    });
  }

  /* 
   * Returns only those capabilities categorized to the given category
   * @return {any[]}
   */
  public getCapabilities(category: Category): Capability[] {
    return this.baselineCapabilities
                    .filter((capability) => capability.category === category.name)
                    .sort();
  }

  /**
   * @description Displays a slide-out that shows the user a heat map of all attack patterns for filtering
   */
  public toggleHeatMap(): void {
    if (this.showHeatmap) {
      this.showHeatmap = false;
      this.dialog.closeAll();
    } else {
      this.showHeatmap = true;
      const dialog = this.dialog.open(AttackPatternChooserComponent, {
        width: '80vw',
        height: '80vh',
        hasBackdrop: true,
        disableClose: false,
        closeOnNavigation: true,
        data: {
          active: null, // @todo This needs to be replaced with the current capability's list of attack patterns!!
                        //       The current model appears to have no hook for this.
        },
      });

      const sub$ = dialog.afterClosed().subscribe(
        (result) => {
          if (result) {
            console.log('selected patterns', result);
            this.selectedAttackPatterns = result;
          }
          this.showHeatmap = false;
        },
        (err) => console.log(err),
      );
      this.subscriptions.push(sub$);
    }
  }

  /*
   * @description
   * @param title
   * @return {string}
   */
  private splitTitle(title?: string): string {
    const split = title
      ? title.split('-')
      : this.currentCapability.name.split('-');
    for (let i = 0; i < split.length; i++) {
      let s = split[i];
      s = s.charAt(0).toUpperCase() + s.slice(1);
      split[i] = s;
    }
    return split.join(' ');
  }

  /*
   * @description
   * @param {any}
   * @return {Assessment}
   */
  private generateBaseline(tempModel: WeightsModel, baselineMeta: BaselineMeta): AssessmentSet {
    const baseline = new AssessmentSet();
    baseline.name = this.meta.title;
    baseline.description = this.meta.description;
    baseline.created = this.publishDate.toISOString();
    baseline.created_by_ref = this.meta.created_by_ref;
    const objAssessments = new Set<ObjectAssessment>();

    Object.keys(tempModel)
      .forEach((baselineId) => {
        const baselineObj = tempModel[baselineId];
        const temp = new ObjectAssessment();
        const stix = new Stix();
        stix.id = baselineObj.baseline.id;
        stix.type = baselineObj.baseline.type;
        stix.description = baselineObj.baseline.description || '';
        stix.name = baselineObj.baseline.name;
        stix.created_by_ref = baselineObj.baseline.created_by_ref;
        Object.assign(temp, stix);
        temp.assessments_objects = [];
        objAssessments.add(temp);
      });

    baseline['baseline_objects'] = Array.from(objAssessments);
    return baseline;
  }

  /*
   * @description save an baseline object to the database
   * @param {void}
   * @return {void}
   */
  private saveAssessments(): void {
    // TODO: once model is set, implement this to save AssessmentSet
    // if (this.model) {
    //   const baselines = Object.values(this.model.relationships);
    //   baselines.forEach(baseline => {
    //     baseline.modified = this.publishDate.toISOString();
    //     baseline.description = this.meta.description;
    //     if (this.meta.created_by_ref) {
    //       baseline.created_by_ref = this.meta.created_by_ref;
    //     }
    //   });
    //   this.wizardStore.dispatch(new SaveAssessment(baselines));
    // } else {
    //   const baselines = this.sidePanelOrder
    //     .map((name) => this.categories[name])
    //     .filter((el) => el !== undefined)
    //     .map((el) => el.scoresModel)
    //     .filter((el) => el !== undefined)
    //     .map((el) => this.generateBaselineAssessment(el, this.meta))
    //   this.wizardStore.dispatch(new SaveAssessment(baselines));
    // }
  }
}
