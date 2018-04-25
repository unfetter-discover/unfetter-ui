import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { MatSelect, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/primeng';
import { Subscription } from 'rxjs/Subscription';
import { Category } from 'stix';
import { Key } from 'ts-keycode-enum';
import { GenericApi } from '../../core/services/genericapi.service';
import { heightCollapse } from '../../global/animations/height-collapse';
import { Baseline } from '../../models/baseline/baseline';
import { BaselineMeta } from '../../models/baseline/baseline-meta';
import { BaselineObject } from '../../models/baseline/baseline-object';
import { Dictionary } from '../../models/json/dictionary';
import { JsonApiData } from '../../models/json/jsonapi-data';
import { Stix } from '../../models/stix/stix';
import { Capability } from '../../models/unfetter/capability';
import { UserProfile } from '../../models/user/user-profile';
import { AppState } from '../../root-store/app.reducers';
import { Constance } from '../../utils/constance';
import { LoadAssessmentResultData } from '../result/store/full-result.actions';
import { FullBaselineResultState } from '../result/store/full-result.reducers';
import { CleanAssessmentWizardData, LoadAssessmentWizardData, SaveAssessment, UpdatePageTitle } from '../store/baseline.actions';
import { BaselineState } from '../store/baseline.reducers';
import { Measurements } from './models/measurements';
import { ScoresModel } from './models/scores-model';
import { WizardBaseline } from './models/wizard-baseline';

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

  public model: JsonApiData<Baseline, Dictionary<Baseline>>;
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
  public meta = new BaselineMeta();
  public ratioOfQuestionsAnswered = 0;
  public insertMode = false;
  private baselines: WizardBaseline[] = [];
  private groupings = [];
  private scoresModel: ScoresModel = {} as ScoresModel;
  public openedSidePanel: string;
  // public categoryNames: string[] = [ 'Network Analysis', 'Network Firewall', 'sysmon' ];
  public categoryNames: string[] = [];
  public navigation: { label: string, page: number };
  public navigations: any[];
  public categories: Dictionary<{ name: string, scoresModel: ScoresModel, capabilities: any[] }>[] = [];
  private currentCapabilities: Capability[] = [];
  private currentCapability = {} as Capability;
  
  private readonly subscriptions: Subscription[] = [];
  private readonly sidePanelNames: string[] = ['categories', 'capabilities', 'capability', 'summary'];

  constructor(
    private genericApi: GenericApi,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
    private userStore: Store<AppState>,
    private assessStore: Store<FullBaselineResultState>,
    private wizardStore: Store<BaselineState>,
    private changeDetection: ChangeDetectorRef
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

    const idParamSub$ = this.route.params
      .subscribe(
        (params) => {
          let meta: Partial<BaselineMeta> = {};
          let baselineId = params.baselineId || '';
          if (baselineId) {
            this.loadExistingAssessment(baselineId, meta);
          }
          this.wizardStore.dispatch(new LoadAssessmentWizardData(meta));
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
            this.onOpenSidePanel(panel);
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
      .pluck('baselineMeta')
      .distinctUntilChanged()
      .subscribe(
        (baselineMeta: BaselineMeta) => this.meta = baselineMeta,
        (err) => console.log(err));

    const sub8$ = this.userStore
      .select('users')
      .pluck('userProfile')
      .distinctUntilChanged()
      .take(1)
      .subscribe(
        (user: UserProfile) => this.currentUser = user,
        (err) => console.log(err));

    const sub9$ = this.wizardStore
      .select('baseline')
      .pluck('categorySteps')
      .distinctUntilChanged()
      .subscribe(
        (categorySteps: Category[]) => {
          this.categoryNames = categorySteps
            .filter((cat) => cat !== undefined)
            .map((category) => category.name)
        },
        (err) => console.log(err));

      this.subscriptions.push(sub4$, sub5$, sub6$, sub7$, sub8$, sub9$);
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

  public loadExistingAssessment(baselineId: string, meta: Partial<BaselineMeta>) {
    const sub$ = this.userStore
      .select('users')
      .pluck('userProfile')
      .take(1)
      .subscribe(
        (user: UserProfile) => {
          const sub1$ = this.assessStore
            .select('fullBaseline')
            .pluck('baselineTypes')
            .distinctUntilChanged()
            .subscribe(
              (arr: Baseline[]) => this.loadAssessments(baselineId, arr, meta),
              (err) => console.log(err));
          this.subscriptions.push(sub1$);
        },
        (err) => console.log(err));
    this.subscriptions.push(sub$);
    this.assessStore.dispatch(new LoadAssessmentResultData(baselineId));
  }

  public loadAssessments(baselineId: string, arr: Array<Baseline>, meta: Partial<BaselineMeta>) {
    if (!arr || arr.length === 0) {
      return;
    }

    /*
     * making the model a collection of all the baselines matching the given rollup id, plus a summary of all the
     * assessed objects to make it easier to use the existing code to display the questions and existing answers
     */
    const summary = new Baseline();
    const typedAssessments = {};
    arr.forEach(baseline => {
      summary.id = baseline.id;
      summary.type = baseline.type;
      summary.name = baseline.name;
      summary.description = baseline.description;
      summary.created = baseline.created;
      summary.modified = baseline.modified;
      summary.baselineMeta = baseline.baselineMeta;
      summary.baseline_objects = summary.baseline_objects.concat(baseline.baseline_objects);
      summary.created_by_ref = baseline.created_by_ref;
      // if (!baseline.metaProperties) {
      //   baseline.metaProperties = {};
      //   if (!baseline.metaProperties.rollupId) {
      //     baseline.metaProperties.rollupId = rollupId;
      //   }
      // }
      // if (baseline.baseline_objects.every(el => el.stix.type === 'indicator')) {
      //   typedAssessments[this.sidePanelOrder[0]] = baseline;
      //   meta.includesIndicators = true;
      // } else if (baseline.baseline_objects.every(el => el.stix.type === 'course-of-action')) {
      //   typedAssessments[this.sidePanelOrder[1]] = baseline;
      //   meta.includesMitigations = true;
      // } else if (baseline.baseline_objects.every(el => el.stix.type === 'x-unfetter-sensor')) {
      //   typedAssessments[this.sidePanelOrder[2]] = baseline;
      //   meta.includesSensors = true;
      // } else {
      //   console.log('We got a weird baseline document that is not all of one category, or has unknown categories',
      //     baseline);
      // }
    });

    this.model = {
      id: summary.id,
      type: summary.type,
      attributes: summary,
      relationships: typedAssessments,
      links: undefined
    };

    meta.title = summary.name;
    meta.description = summary.description;
    this.wizardStore.dispatch(new LoadAssessmentWizardData(meta));
    this.wizardStore.dispatch(new UpdatePageTitle(meta));
  }

  /*
   * @description
   *  cleans up this component, unsubscribes to data
   */
  public ngOnDestroy(): void {
    this.wizardStore.dispatch(new CleanAssessmentWizardData());
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  /*
   * @description find panel names with data
   * @return {SidePanelName[]}
   */
  public determinePanelsWithData(): string[] {
    let panelsWithData = [];
    if (this.categoryNames.length > 0) {
      let catPanels = [ ...this.categoryNames ];
      catPanels.forEach(catName => {
        panelsWithData = [ ...panelsWithData, catName ];
        if (this.categories[catName] && this.categories[catName].capabilities) {
          this.categories[catName].capabilities.forEach(cap => {
            panelsWithData = [ ...panelsWithData, cap];
          });
        }
      });
    }

    return panelsWithData;
  }

  /*
   * @description name of first side panel with data
   * @return {string} name of first open side panel
   */
  public determineFirstOpenSidePanel(): string {
    const hasContents = [ this.sidePanelNames[0], ...this.determinePanelsWithData() ];

    // return first panel w/ data
    return hasContents[0];
  }

  /*
   * @description first panel with data, after the currently opened
   * @return {string} name of last listed side panel with data
   */
  public determineNextSidePanel(): string {
    const panels: string[] = [...this.determinePanelsWithData(), 'summary'];
    const openedIndex = panels.findIndex((el) => el === this.openedSidePanel);
    const nextPanels = panels.slice(openedIndex + 1, panels.length);
    // first panel with data, after the currently opened
    return nextPanels[0];
  }

  /*
   * @description
   * @param {string} panel name
   * @param {UIEvent} event
   * @return {void}
   */
  public onOpenSidePanel(panelName: string, event?: UIEvent): void {
    if (this.openedSidePanel && this.currentCapabilities && this.openedSidePanel !== 'summary') {
      // save current state, if needed
      this.categories[this.openedSidePanel] = { name: undefined, scoresModel: undefined, capabilities: undefined };
      this.categories[this.openedSidePanel].capabilities = [...this.currentCapabilities];
      this.categories[this.openedSidePanel].scoresModel = { ...this.scoresModel };
    }

    // clear out state
    this.scoresModel = {};
    this.page = 1;
    this.showSummary = false;
    this.buttonLabel = 'CONTINUE';

    // switch to new open panel
    this.openedSidePanel = panelName;

    // reload questions
    this.refreshToOpenedAssessmentType();
    if (this.openedSidePanel && this.categories[this.openedSidePanel]) {
      // reload previous state for given type/panel if it exists
      this.currentCapabilities = [...this.categories[this.openedSidePanel].capabilities];
      this.currentCapability = this.getCurrentCapability();
      this.scoresModel = { ...this.categories[this.openedSidePanel].scoresModel };
    }

    // reset progress 
    this.setSelectedRiskValue();
    this.changeDetection.detectChanges();
    if (panelName !== 'summary') {
      this.updateChart();
    }
    this.updateRatioOfAnswerQuestions();
  }

  /*
   * @description refresh the questions and graphs to the currently open baseline type
   * @return {void}
   */
  public refreshToOpenedAssessmentType(): void {
    const data = this[this.openedSidePanel];
    if (data) {
      // this.capability = [];
      this.updateRatioOfAnswerQuestions();
      this.build(data);
    }
  }

  /*
   * @description
   * @return {void}
   */
  public updateRatioOfAnswerQuestions(): void {
    if (this.currentCapabilities && this.currentCapabilities.length > 1) {
      // const allQuestions = this.currentCapabilities
      //   // flat map baselines across groups
      //   .map((groups) => groups.baselines)
      //   .reduce((baselines, memo) => memo ? memo.concat(baselines) : baselines, [])
      //   // flat map across questions
      //   .map((baselines) => baselines.measurements)
      //   .reduce((measurements, memo) => memo ? memo.concat(measurements) : measurements, []);
      // const numQuestions = allQuestions.length;
      // const answeredQuestions = allQuestions.filter((el) => el.risk > -1).length;
      // if (answeredQuestions > 0) {
      //   const ratio = answeredQuestions / numQuestions;
      //   this.ratioOfQuestionsAnswered = Math.round(ratio * 100);
      // } else {
      //   this.ratioOfQuestionsAnswered = 0;
      // }
    }
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
        this.updateAllQuestions(index);
      }
      this.insertMode = false;
    } else if (event.keyCode === Key.GraveAccent) {
      this.insertMode = true;
    }
  }

  /*
   * @description
   * @param {answerIndex}
   * @return {void}
   */
  public updateAllQuestions(answerIndex: number): void {
    // if (!this.currentCapability || !this.currentCapability.baselines) {
    //   return;
    // }

    // this.currentCapability.baselines.forEach((baseline) => {
    //   const measurements = baseline.measurements;
    //   measurements.forEach((measurement: Assessment3Question) => {
    //     // TODO: Update once we have scoring
    //     // const options = measurement.options;
    //     // const index = answerIndex < options.length ? answerIndex : 0;
    //     // const option = options[index];
    //     // this.updateRisks({ selected: { value: option.risk } }, measurement, baseline);
    //     // this.questions.forEach((question) => {
    //     //   question.value = option.risk;
    //     // });
    //     // this.selectedValue(measurement, option, baseline);
    //   });
    //   // calculate risk of all measurements
    //   this.updateRatioOfAnswerQuestions();
    // });
  }

  /*
   * @description
   * @return {void}
   */
  public setSelectedRiskValue(): void {
    // if (this.model && this.currentCapability) {
    //   this.currentCapability.baselines.forEach(baseline => this.collectModelAssessments(baseline));
    //   this.calculateGroupRisk();
    // } else {
    //   this.calculateGroupRisk();
    // }
  }

  public collectModelAssessments(baseline: any) {
    if (this.model && this.model.attributes && this.model.attributes.baseline_objects
      && this.model.attributes.baseline_objects.length > 0 && baseline && baseline.id) {
      const baselineObject = this.model.attributes.baseline_objects.find(obj => obj.stix ? baseline.id === obj.stix.id : false);
      if (!baselineObject) {
        console.warn(`baselineObject not found! id: ${baseline.id}, moving on...`);
        return;
      }
      // TODO: Resurrect this once we have scoring
      // baseline.risk = baselineObject.risk ? baselineObject.risk : 0;
      // if (baseline.measurements && baselineObject.questions) {
      //   baseline.measurements.forEach((m) => {
      //     const question = baselineObject.questions.find((q) => q.name === m.name);
      //     if (question) {
      //       m.risk = question.risk ? question.risk : 0;
      //     }
      //   });
      // }
    } else {
      console.warn(`unable to execute collection of model baselines; moving on... model: ${JSON.stringify(this.model)}`);
    }

  }

  /*
   * @description clicked a stepper
   * @param {number} step
   * @param {UIEvent} event optional
   * @returns {void}
   */
  public navigationClicked(step: number, event?: UIEvent): void {
    if (event) {
      event.preventDefault();
    }

    if (step > this.page) {
      this.page = step - 1;
      this.onNext();
    } else if (step < this.page) {
      this.page = step + 1;
      this.onBack();
    }
  }

  // TODO: commented for now
  /*
   * @description update riskss
   * @param option
   * @param measurement
   * @param baseline
   * @returns {void}
   */
  /*public updateRisks(option: any, measurement: Assessment3Question, baseline: any): void {
    const newRisk = option.selected.value;
    // update measurement value in baselines
    const baselineMeasurementToUpdate = baseline.measurements
      .find((measure) => measure.name === measurement.name);
    this.updateQuestionRisk(baselineMeasurementToUpdate, newRisk);
    // we need a temp model to hold selected question
    if (!this.model) {
      if (!this.tempModel[baseline.id]) {
        this.tempModel[baseline.id] = { baseline: new Assessment3(), measurements: [] };
      }
      this.tempModel[baseline.id].baseline = baseline;
      this.tempModel[baseline.id].measurements = this.tempModel[baseline.id].measurements.filter((m) => {
        return m.name !== baselineMeasurementToUpdate.name;
      });
      // only add if question is selected
      if (newRisk >= 0) {
        this.tempModel[baseline.id].measurements.push(baselineMeasurementToUpdate);
      }
      // if no questions selected remove
      if (this.tempModel[baseline.id].measurements.length === 0) {
        delete this.tempModel[baseline.id];
      }
    }
    // can not have negative. if new newRisk is < 0
    // set baselineMeasurementToUpdate.risk to 1
    if (newRisk < 0) {
      baselineMeasurementToUpdate.risk = -1;
    }
    // calculate risk of all measurements
    baseline.risk = this.calculateMeasurementsAvgRisk(baseline.measurements);
    const groupRisk = this.calculateGroupRisk();

    if (this.model) {
      let baseline_object = this.model.attributes.baseline_objects
        .find((baselineObject) => baseline.id === baselineObject.stix.id);

      if (!baseline_object) {
        baseline_object = {
          questions: [measurement],
          risk: newRisk,
          stix: {
            id: baseline.id,
            description: baseline.description,
            type: baseline.type,
            name: baseline.name
          } as Stix
        } as Assessment3Object;
        this.model.attributes.baseline_objects.push(baseline_object);
        switch (baseline.type) {
          case 'indicator':
            this.model.relationships[this.sidePanelOrder[0]].baseline_objects.push(baseline_object);
            break;
          case 'course-of-action':
            this.model.relationships[this.sidePanelOrder[1]].baseline_objects.push(baseline_object);
            break;
          case 'x-unfetter-sensor':
            this.model.relationships[this.sidePanelOrder[2]].baseline_objects.push(baseline_object);
            break;
        }
      } else {
        if (newRisk < 0) {
          baseline_object.questions = baseline_object.questions.filter((q) => { return q.name !== measurement.name });
          if (baseline_object.questions.length === 0) {
            baseline_object.risk = newRisk;
          }
        } else {
          let question = baseline_object.questions.find((q) => q.name === measurement.name);
          if (!question) {
            question = measurement;
            baseline_object.questions.push(question);
          } else {
            this.updateQuestionRisk(question, newRisk);
          }
          baseline_object.risk = baseline.risk;
        }
      }
    }
    this.updateChart();
    this.updateRatioOfAnswerQuestions();
  }*/

  /*
   * @description clicked back a page
   * @param {UIEvent} event optional
   * @returns {void}
   */
  public onBack(event?: UIEvent): void {
    if (event) {
      event.preventDefault();
    }

    if (this.page === 1) {
      return;
    }
    this.page = this.page - 1;
    this.buttonLabel = 'CONTINUE';
    this.currentCapability = this.getCurrentCapability();
    this.showSummary = false;
    this.setSelectedRiskValue();
    this.updateChart();
    this.updateRatioOfAnswerQuestions();
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

    this.showSummary = false;
    this.buttonLabel = 'CONTINUE';

    // last page for this category
    if (this.page + 1 > this.currentCapabilities.length) {
      const nextPanel = this.determineNextSidePanel();
      // last page
      if (nextPanel !== 'summary') {
        //  but not last category, advance to the next category
        this.onOpenSidePanel(nextPanel);
      } else {
        // last category, show save page
        this.page = 1;
        this.onOpenSidePanel('summary');
        this.showSummarySavePage();
      }
    } else {
      // advance to next page within a given baseline type
      this.page = this.page + 1;
      this.currentCapability = this.getCurrentCapability();
      this.setSelectedRiskValue();
      this.updateChart();
    }
    this.updateRatioOfAnswerQuestions();
  }

  /*
   * @description
   * @return {void}
   */
  public showSummarySavePage(): void {
    //  set show summary to show save page
    this.currentCapability = null;
    this.showSummary = true;
    this.buttonLabel = 'SAVE';
    this.updateSummaryChart();
  }

  /*
   * @description
   * @param measurement 
   * @param option 
   * @param {Assessment} baseline - optional
   * @return {number}
   */
  // public selectedValue(measurement: any, option: any, baseline?: Assessment3): number {
  //   if (!this.model) {
  //     if (this.tempModel) {
  //       if (this.tempModel[baseline.id]) {
  //         const found = this.tempModel[baseline.id].measurements.find((m) => { return m.name === measurement.name; });
  //         return found ? found.risk : this.defaultValue;
  //       } else {
  //         return option.value ? option.value : this.defaultValue;
  //       }
  //     } else {
  //       return option.value ? option.value : this.defaultValue;
  //     }
  //   } else {
  //     let a = this.model.attributes.baseline_objects.find(
  //       (baseline_objects) => {
  //         return baseline_objects.stix.id === baseline.id;
  //       }
  //     );
  //     if (!a) {
  //       return this.defaultValue;
  //     } else {
  //       const q = a.questions.find((question) => {
  //         return question.name === measurement.name;
  //       });
  //       return q && q.selected_value ? q.selected_value.risk : this.defaultValue;
  //     }
  //   }
  // }

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
   * @description
   * @param index
   * @param item
   * @returns {number}
   */
  public trackByFn(index, item) {
    return index;
  }

  /*
   * @description build page and refresh chart
   * @param data 
   * @return {void}
   */
  private build(data?: Stix[]): void {
    if (!data) {
      return;
    }

    // TODO: fetch capabilities from this current baseline set
    // this.currentCapabilities = this.createCapabilities(data);
    this.currentCapability = this.getCurrentCapability();
    this.updateChart();
  }
  /**
   * @param  {Category[]} steps
   */
  private updateCategorySteps(steps: Category[]) {
    
  }

  /*
   * @description
   * @param {void}
   * @return {any}
   */
  private getCurrentCapability(): any {
    if (this.currentCapabilities) {
      let index = 0;
      if (this.page) {
        index = this.page - 1;
      }
      if (index >= this.currentCapabilities.length) {
        index = 0;
      }
      return this.currentCapabilities[index];
    } else {
      return undefined;
    }
  }

  /* 
   * For testing only
   * @return {any[]}
   */
  public getCapabilities(): any[] {
    return this.currentCapabilities;
  }

  /* 
   * For testing only
   * @return {any[]}
   */
  public setCapabilities(newCapabilities: any[]): void {
    this.currentCapabilities = newCapabilities;
  }

  /*
   * @description
   * @param {Stix[]}
   * @return {any[]}
   */
  public createCapabilities(assessedObjects: Stix[]): any[] {
    const capabilities = [];
    const self = this;

    if (assessedObjects) {
      // Go through and build each baseline
      // We do this so we can just save all the baselines later.
      this.baselines = assessedObjects
        // .map((el) => el.attributes)
        .map((assessedObject) => {
          const baseline = new WizardBaseline();
          if (assessedObject.metaProperties && assessedObject.metaProperties.groupings) {
            baseline.groupings = assessedObject.metaProperties.groupings;
          }
          baseline.id = assessedObject.id;
          baseline.name = assessedObject.name;
          baseline.description = assessedObject.description;
          baseline.scores = assessedObject.id ? this.buildMeasurements(assessedObject.id) : [];
          baseline.type = assessedObject.type;
          const risk = this.getRisk(baseline.scores);
          // baseline.risk = -1;
          return baseline;
        });
      this.groupings = this.buildGrouping(this.baselines);

      const baselineObjectsGroups = this.doObjectGroupings(this.baselines);
      // console.log(`baselineObjectGroups: ${JSON.stringify(baselineObjectsGroups)}`);
      const keys = Object.keys(baselineObjectsGroups).sort();
      keys.forEach((phaseName, index) => {
        // TODO - Need to remove the 'courseOfAction' name
        const courseOfActionGroup = baselineObjectsGroups[phaseName];

        // This is the x-unfetter-control-baselines
        const capability: any = {};
        capability.name = phaseName;
        const step = index + 1;
        this.navigations.push( { label: this.splitTitle(phaseName),  page: step } );
        // this.item = this.capability;
        // TODO: Need to get description somehow from the key phase information
        capability.description = this.groupings[phaseName];
        capability.baselines = courseOfActionGroup;
        capability.risk = 1;
        const riskArray = [1, 0];
        capability.riskArray = riskArray;
        const riskArrayLabels = ['Risk Accepted', 'Risk Addressed'];
        capability.riskArrayLabels = riskArrayLabels;
        capabilities.push(capability);
      });
    }

    return capabilities;
  }

  /*
   * @description
   * @param stixObjects
   * @return {any} 
   */
  private buildGrouping(stixObjects: WizardBaseline[]): any {
    const groupings = [];
    stixObjects.forEach((stixObject) => {
      const groupingStages = stixObject.groupings;
      if (!groupingStages) {
        const phaseName = 'unknown';
        // if (!groupings[phaseName]) {
        //   const description = 'unknown description';
        //   groupings[phaseName] = description;
        // }
      } else {
        groupingStages.forEach((groupingStage) => {
          const phaseName = groupingStage.groupingValue;
          if (!groupings[phaseName]) {
            const description = groupingStage.description;
            if (description) {
              groupings[phaseName] = description;
            }
            // else {
            //   groupings[phaseName] = phaseName;
            // }
          }
        });
      }
    });
    return groupings;
  }

  /*
   * @description
   * @param stixObjects
   * @return {any}
   */
  private doObjectGroupings(stixObjects): any {
    const hash = {};
    stixObjects.forEach((stixObject) => {
      const groupingStages = stixObject.groupings;
      if (!groupingStages) {
        const phaseName = 'unknown';
        let objectProxies = hash[phaseName];
        if (objectProxies === undefined) {
          objectProxies = [];
          hash[phaseName] = objectProxies;
        }
        const objectProxy = { content: stixObject };
        objectProxies.push(stixObject);
      } else {
        groupingStages.forEach((groupingStage) => {
          const phaseName = groupingStage.groupingValue;
          let objectProxies = hash[phaseName];
          if (objectProxies === undefined) {
            objectProxies = [];
            hash[phaseName] = objectProxies;
          }
          const objectProxy = {
            content: stixObject
          };

          objectProxies.push(stixObject);
        });
      }
    });

    return hash;
  }

  /*
   * @description
   * @param {any} capability 
   * @return {number}
   */
  public calculateGroupRisk(capability: any = this.currentCapability): number {
    let groupRisk = 0; // based on the default value from the calculateRisk function below
    if (capability && capability.baselines && capability.baselines.length > 0) {
      groupRisk = this.calculateRisk(capability.baselines);
      const riskArray = [];
      riskArray.push(groupRisk);
      riskArray.push(1 - groupRisk);
      capability.risk = groupRisk;
      capability.riskArray = riskArray;
    }
    return groupRisk;
  }

  /*
   * @description update the chart data
   * @return {void}
   */
  private updateChart(): void {
    const chartData = this.doughnutChartData.slice();
    // chartData[0].data = this.currentCapability
    //   ? this.currentCapability.riskArray : [];
    this.doughnutChartData = chartData;
  }

  /*
   * @description handle an baseline's worth of summary chart data
   * @return {any[]}
   */
  public generateSummaryChartDataForAnAssessmentType(baselineData): number[] {
    let result: number[] = [];

    // if (baselineData) {
    //   if (this.currentCapabilities && this.currentCapabilities.length > 0) {
    //     this.currentCapabilities.forEach(element => {
    //       if (element.baselines) {
    //         element.baselines.forEach(baseline => this.collectModelAssessments(baseline))
    //       }
    //       this.calculateGroupRisk(element);
    //     });
    //     const singleAssessmentRiskArray: number[] = this.currentCapabilities
    //       .map((groups) => groups.riskArray)
    //       .reduce(this.riskReduction, [0, 0])
    //       .map((riskSum) => riskSum / this.currentCapabilities.length);
    //     result = singleAssessmentRiskArray;
    //   }
    // }
    return result;
  }

  /*
   * @description update the summary chart data
   * @return {void}
   */
  public updateSummaryChart(): void {
    this.openedSidePanel = 'summary';
  }

  public riskReduction(currentTotalRisk: number[], currentRisk: number[]): number[] {
    let result: number[] = [];
    if (currentRisk) {
      result = currentTotalRisk.map((riskValue, index) => riskValue += currentRisk[index]);
    }
    return result;
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
  private generateBaselineAssessment(tempModel: ScoresModel, baselineMeta: BaselineMeta): Baseline {
    const baseline = new Baseline();
    baseline.baselineMeta = baselineMeta;
    baseline.name = this.meta.title;
    baseline.description = this.meta.description;
    baseline.created = this.publishDate.toISOString();
    baseline.created_by_ref = this.meta.created_by_ref;
    const baselineSet = new Set<BaselineObject>();

    Object.keys(tempModel)
      .forEach((baselineId) => {
        const baselineObj = tempModel[baselineId];
        const temp = new BaselineObject();
        const stix = new Stix();
        stix.id = baselineObj.baseline.id;
        stix.type = baselineObj.baseline.type;
        stix.description = baselineObj.baseline.description || '';
        stix.name = baselineObj.baseline.name;
        stix.created_by_ref = baselineObj.baseline.created_by_ref;
        temp.stix = stix;
        temp.questions = [];
        // if (baselineObj.measurements !== undefined) {
        //   temp.questions = baselineObj.measurements
        //     .filter((measurement) => {
        //       return measurement.selected_value && measurement.selected_value.risk >= 0;
        //     });
        // }
        // temp.risk = temp.questions
        //   .map((question) => question.risk)
        //   .reduce((prev, cur) => (prev += cur), 0) / temp.questions.length;
        baselineSet.add(temp);
      });

    baseline['baseline_objects'] = Array.from(baselineSet);
    return baseline;
  }

  /*
   * @description save an baseline object to the database
   * @param {void}
   * @return {void}
   */
  private saveAssessments(): void {
    if (this.model) {
      const baselines = Object.values(this.model.relationships);
      baselines.forEach(baseline => {
        baseline.modified = this.publishDate.toISOString();
        baseline.description = this.meta.description;
        if (this.meta.created_by_ref) {
          baseline.created_by_ref = this.meta.created_by_ref;
        }
      });
      this.wizardStore.dispatch(new SaveAssessment(baselines));
    } else {
      // TODO: ....
      // const baselines = this.sidePanelOrder
      //   .map((name) => this.categories[name])
      //   .filter((el) => el !== undefined)
      //   .map((el) => el.scoresModel)
      //   .filter((el) => el !== undefined)
      //   .map((el) => this.generateBaselineAssessment(el, this.meta))
      // this.wizardStore.dispatch(new SaveAssessment(baselines));
    }
  }
}
