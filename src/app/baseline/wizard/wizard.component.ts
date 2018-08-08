import { of as observableOf,  Observable ,  Subscription  } from 'rxjs';

import { take, filter, distinctUntilChanged, pluck, tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit, QueryList, Renderer2, ViewChildren, ViewChild } from '@angular/core';
import { MatDialog, MatSelect, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AssessmentSet, Capability, Category, ObjectAssessment } from 'stix/assess/v3/baseline';
import { AttackPattern } from 'stix/unfetter/attack-pattern';
import { Key } from 'ts-keycode-enum';
import { GenericApi } from '../../core/services/genericapi.service';
import { heightCollapse } from '../../global/animations/height-collapse';
import { UserProfile } from '../../models/user/user-profile';
import { AppState } from '../../root-store/app.reducers';
import { CleanBaselineWizardData, FetchAttackPatterns, FetchBaseline, FetchCapabilities, FetchCapabilityGroups, SaveBaseline, SetCurrentBaselineCapability, SetCurrentBaselineGroup, SetCurrentBaselineObjectAssessment } from '../store/baseline.actions';
import { BaselineState } from '../store/baseline.reducers';
import { AttackPatternChooserComponent } from './attack-pattern-chooser/attack-pattern-chooser.component';
import { Measurements } from './models/measurements';
import { Assess3Meta } from 'stix/assess/v3';
import { CapabilityComponent } from './capability/capability.component';
import { MarkingDefinition } from '../../models';
import { MarkingsChipsComponent } from '../../global/components/marking-definitions/markings-chips.component';
import MarkingDefinitionHelpers from '../../global/static/marking-definition-helper';

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
  public readonly sidePanelCollapseHeight = '32px';
  public readonly sidePanelExpandedHeight = '32px';
  public buttonLabel: ButtonLabel = 'CONTINUE';
  private readonly sidePanelNames: string[] = ['categories', 'capability-selector', 'capabilities', 'summary'];

  public meta = new Assess3Meta();
  public showSummary = false;
  public page = 1;
  public totalPages = 0;
  public insertMode = false;
  public openedSidePanel: string = this.sidePanelNames[0];
  public navigation: { id: string, label: string, page: number };
  public navigations: any[];   // These are group and capability nodes only - not including 'Group Setup' and 'Summary'
  
  private currentBaseline: AssessmentSet;
  private objAssessments: ObjectAssessment[];
  public allCategories: Category[] = [];
  public baselineGroups: Category[] = [];
  public currentBaselineGroup = {} as Category;
  public allCapabilities: Capability[] = [];
  public baselineCapabilities: Capability[] = [];
  public currentCapability = {} as Capability;
  @ViewChild('capabilityPane') capabilityPane: CapabilityComponent;
  private baselineObjAssessments: ObjectAssessment[] = [];

  public marking$: Observable<MarkingDefinition[]>;
  @ViewChild('markingsChips') markingsChips: MarkingsChipsComponent;

  public showHeatmap = false;
  public allAttackPatterns: Observable<AttackPattern[]> = observableOf([]);
  public selectedFrameworkAttackPatterns: Observable<AttackPattern[]> = observableOf([]);

  private readonly subscriptions: Subscription[] = [];
  
  constructor(
    private genericApi: GenericApi,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
    private userStore: Store<AppState>,
    private wizardStore: Store<BaselineState>,
    private changeDetection: ChangeDetectorRef,
    private dialog: MatDialog,
  ) {
    super();
  }

  /*
   * @description
   *  initializes this component, fetchs data to build page
   */
  public ngOnInit(): void {
    const idParamSub$ = this.route.params
      .subscribe(
        (params) => {
          const baselineId = params.baselineId || '';
          if (baselineId) {
            this.wizardStore.dispatch(new FetchBaseline(baselineId));
          }
        },
        (err) => console.log(err),
        () => idParamSub$.unsubscribe());

    const sub4$ = this.wizardStore
      .select('baseline').pipe(
      pluck('finishedLoading'),
      distinctUntilChanged(),
      filter((loaded: boolean) => loaded && loaded === true))
      .subscribe(
        (loaded: boolean) => {
          const panel = this.determineFirstOpenSidePanel();
          if (panel) {
            this.page = 1;
            this.openedSidePanel = 'categories';
          }
          this.updateWizardData();
        },
        (err) => console.log(err));

    const sub5$ = this.wizardStore
      .select('baseline').pipe(
      pluck('page'),
      distinctUntilChanged())
      .subscribe(
        (page: number) => this.page = page,
        (err) => console.log(err));

    interface SavedState { finished: boolean, id: string };
    const sub6$ = this.wizardStore
      .select('baseline').pipe(
      pluck('saved'),
      distinctUntilChanged(),
      filter((el: SavedState) => el && el.finished === true))
      .subscribe(
        (saved: SavedState) => {
          const id = saved.id;
          this.router.navigate(['/baseline/result/summary', id]);
        },
        (err) => console.log(err));

    const sub7$ = this.wizardStore
      .select('baseline').pipe(
      pluck('baseline'),
      filter((el) => el !== undefined),
      distinctUntilChanged())
      .subscribe(
        (assessmentSet: AssessmentSet) => {
          if (!assessmentSet['object_marking_refs']) {
            assessmentSet['object_marking_refs'] = [];
          }
          this.currentBaseline = assessmentSet;
          this.meta = new Assess3Meta();
          this.meta.title = this.currentBaseline.name;
          this.meta.description = this.currentBaseline.description;
          this.meta.created_by_ref = this.currentBaseline.created_by_ref;
        },
        (err) => console.log(err));

    const sub8$ = this.userStore
      .select('users').pipe(
      pluck('userProfile'),
      distinctUntilChanged(),
      take(1))
      .subscribe(
      (user: UserProfile) => {
          const framework = (user && user.preferences && user.preferences.killchain) 
            ? user.preferences.killchain : undefined;
          this.currentUser = user;
          this.wizardStore.dispatch(new FetchAttackPatterns(framework));
        },
        (err) => console.log(err));

    const sub9$ = this.wizardStore
      .select('baseline').pipe(
      pluck('baselineGroups'),
      distinctUntilChanged())
      .subscribe(
        (baselineGroups: Category[]) => {
          this.baselineGroups = baselineGroups;
          this.updateNavigations();
        },
        (err) => console.log(err));

      const sub10$ = this.wizardStore
        .select('baseline').pipe(
        pluck('capabilityGroups'),
        filter((el) => el !== undefined),
        distinctUntilChanged())
        .subscribe(
          (baselineGroups: Category[]) => {
            this.allCategories = (baselineGroups) ? baselineGroups.slice() : [];
          },
          (err) => console.log(err));

      const sub11$ = this.wizardStore
        .select('baseline').pipe(
        pluck('capabilities'),
        distinctUntilChanged())
        .subscribe(
          (capabilities: Capability[]) => {
            this.allCapabilities = (capabilities) ? capabilities.slice() : [];
          },
          (err) => console.log(err));

      const sub12$ = this.wizardStore
        .select('baseline').pipe(
        pluck('baselineCapabilities'),
        distinctUntilChanged())
        .subscribe(
          (capabilities: Capability[]) => {
            this.baselineCapabilities = (capabilities) ? capabilities.slice() : [];
            this.updateNavigations();
          },
          (err) => console.log(err));
  
      const sub13$ = this.wizardStore
        .select('baseline').pipe(
        pluck('currentCapabilityGroup'),
        distinctUntilChanged())
        .subscribe(
          (capabilityGroup: Category) => {
            this.currentBaselineGroup = capabilityGroup;
            this.updateNavigations();
          },
          (err) => console.log(err));
    
      const sub14$ = this.wizardStore
        .select('baseline').pipe(
        pluck('currentCapability'),
        distinctUntilChanged())
        .subscribe(
          (capability: Capability) => {
            this.currentCapability = capability;
          },
        (err) => console.log(err));
      
      const sub15$ = this.wizardStore
        .select('baseline').pipe(
        pluck('baselineObjAssessments'),
        distinctUntilChanged())
        .subscribe(
          (baselineObjAssessments: ObjectAssessment[]) => {
            this.baselineObjAssessments = baselineObjAssessments;
          },
        (err) => console.log(err));

      this.allAttackPatterns = this.wizardStore
        .select('baseline').pipe(
        pluck<{}, AttackPattern[]>('allAttackPatterns'),
        distinctUntilChanged());
    
      this.selectedFrameworkAttackPatterns = this.wizardStore
        .select('baseline').pipe(
        pluck<{}, AttackPattern[]>('selectedFrameworkAttackPatterns'),
        distinctUntilChanged());

      this.marking$ = this.userStore
        .select('stix')
        .pipe(
          pluck('markingDefinitions')
        );

      this.subscriptions.push(sub4$, sub5$, sub6$, sub7$, sub8$, sub9$, sub10$, sub11$, sub12$, sub13$, sub14$, sub15$);

      // Fetch categories and capabilities to power this wizard
      this.wizardStore.dispatch(new FetchCapabilityGroups());
      this.wizardStore.dispatch(new FetchCapabilities());
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
  public onOpenSidePanel(panelName: string, group?: Category, event?: Event): void {
    if (event) {
      event.preventDefault();
    }

    // Bail if this was implicitly called as the result of a wizard button press
    if (event && event.target instanceof HTMLSpanElement) {
      return;
    }

    if (group) {
      // Adjust page based on given group
      this.wizardStore.dispatch(new SetCurrentBaselineGroup(group));
    } else {
      // If Group Setup or Summary, indicate as such
      if (panelName === 'summary') {
        // Set page to last page
        this.page = 1 // group setup
                    + this.navigations.length
                    + 1;   // summary
      } else {
        this.page = 1;  // group setup
      }
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

    this.page = this.navigations.find(navigation => navigation.id === capabilityId).page;
    const capability = this.baselineCapabilities.find((c) => c.id === capabilityId);
    this.wizardStore.dispatch(capability);
    this.wizardStore.dispatch(new SetCurrentBaselineGroup(this.baselineGroups.find(category => category.id === capability.category)));

    this.updateWizardData();
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
   * @description navigate directly to next group
   * @param {UIEvent} event optional
   * @return {void}
   */
  public onNextGroup(event?: UIEvent): void {
    if (event) {
      event.preventDefault();
    }

    // Set page to next group in the list
    let groupIndex = this.baselineGroups.findIndex(group => group.id === this.currentBaselineGroup.id);
    this.page = this.navigations.find(nav => nav.id === this.baselineGroups[groupIndex + 1].id).page;

    this.updateWizardData();
  }

  public hasNextGroup(): boolean {
    return this.page > 1 && this.currentBaselineGroup &&
           this.baselineGroups.findIndex(group => group.id === this.currentBaselineGroup.id) < this.baselineGroups.length - 1;
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

    this.updateWizardData();
  }

  /*
   * @description navigate directly to previous group
   * @param {UIEvent} event optional
   * @return {void}
   */
  public onBackGroup(event?: UIEvent): void {
    if (event) {
      event.preventDefault();
    }

    // Set page to previous group in the list
    let groupIndex = this.baselineGroups.findIndex(group => group.id === this.currentBaselineGroup.id);
    this.page = this.navigations.find(nav => nav.id === this.baselineGroups[groupIndex - 1].id).page;

    this.updateWizardData();
  }

  public hasBackGroup(): boolean {
    return this.currentBaselineGroup &&
           this.baselineGroups.findIndex(group => group.id === this.currentBaselineGroup.id) > 0;
  }

  private updateWizardData(): void {
    this.showSummary = false;
    this.buttonLabel = 'CONTINUE';

    // Have we made it beyond the cat/cap pages (i.e. Group Setup + cat/cap pages)?
    if (this.page === 1) {
      // Show categories page
      this.openedSidePanel = 'categories';
      this.wizardStore.dispatch(new SetCurrentBaselineGroup(undefined));
      this.wizardStore.dispatch(new SetCurrentBaselineCapability(undefined));
      this.wizardStore.dispatch(new SetCurrentBaselineObjectAssessment(undefined));
    } else {
      // Have we made it beyond the cat/cap pages (i.e. Group Setup + cat/cap pages)?
      if (this.page > 1 + this.navigations.length) {
        // Show summary page
        this.openedSidePanel = 'summary';
        this.wizardStore.dispatch(new SetCurrentBaselineGroup(undefined));
        this.wizardStore.dispatch(new SetCurrentBaselineCapability(undefined));
        this.wizardStore.dispatch(new SetCurrentBaselineObjectAssessment(undefined));
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
          this.wizardStore.dispatch(new SetCurrentBaselineObjectAssessment(undefined));
        } else {
          this.openedSidePanel = 'capabilities';

          // Update current capability group if we've drifted onto another one
          let currCap = this.baselineCapabilities.find(capability => capability.id === currPage.id) as Capability;
          if (!this.currentBaselineGroup || currCap.category !== this.currentBaselineGroup.id) {
            this.wizardStore.dispatch(new SetCurrentBaselineGroup(this.allCategories.find((category) => category.id === currCap.category)));
          }

          this.wizardStore.dispatch(new SetCurrentBaselineCapability(currCap));
          let currObjAssessment = this.baselineObjAssessments.find(((oa) => oa.object_ref === currCap.id));
          this.wizardStore.dispatch(new SetCurrentBaselineObjectAssessment(currObjAssessment));
        }
      }
    }
  }

  /*
   * @description
   * @return {void}
   */
  public showSummarySavePage(): void {
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
    return !this.currentBaseline.name || this.currentBaseline.name.trim() === '';
  }

  /*
   * @description
   * @return {boolean} true if no groups have been selected, otherwise false
   */
  public isGroupsNone(): boolean {
    return this.baselineGroups.length <= 0;
  }

  /*
   * @description
   * @return {boolean} true if no capabilities have been selected otherwise false
   */
  public isCapabilitiesNone(): boolean {
    return this.baselineCapabilities.length <= 0;
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
      let capsForThisCategory = this.baselineCapabilities.filter(cap => cap.category === category.id);
      capsForThisCategory.forEach((cap) => {
          this.navigations.push( { id: cap.id, label: cap.name,  page: index++ } );
        })
    });
  }

  /*
   * @description
   * @param {void}
   * @return {any}
   */
  private getCurrentCapability(): any {
    if (this.allCapabilities) {
      let index = 0;
      if (this.page) {
        index = this.page - 1;
      }
      if (index >= this.allCapabilities.length) {
        index = 0;
      }
      return this.allCapabilities[index];
    } else {
      return undefined;
    }
  }

  /* 
   * Returns only those capabilities categorized to the given category
   * @return {any[]}
   */
  public getCapabilities(category: Category): Capability[] {
    return this.baselineCapabilities
                    .filter((capability) => capability.category === category.id)
                    .sort();
  }

  /**
   * @description Displays a slide-out that shows the user a heat map of all attack patterns for filtering
   */
  public toggleHeatMap(assessed: any[]): void {
    if (this.showHeatmap) {
      this.showHeatmap = false;
      this.dialog.closeAll();
    } else {
      this.showHeatmap = true;
      const currentPatterns = assessed ? assessed.map(ap => ({
        id: ap.capability_id,
        name: ap.capability,
        description: ap.definition,
      })) : [];
      const dialog = this.dialog.open(AttackPatternChooserComponent, {
        width: '80vw',
        height: '80vh',
        hasBackdrop: true,
        disableClose: false,
        closeOnNavigation: true,
        data: { active: currentPatterns },
      });

      const sub$ = dialog.afterClosed().subscribe(
        (result) => {
          if (result) {
            this.capabilityPane.onAttackPatternChange(result);
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

  public getMarkingLabel(marking) {
    return MarkingDefinitionHelpers.getMarkingLabel(marking);
  }

  public onMarkingChange(marking) {
    this.markingsChips['setMarkings'](this.currentBaseline);
    this.markingsChips['changeDetection'].markForCheck();
  }

  /*
   * @description save an baseline object to the database
   * @param {void}
   * @return {void}
   */
  private saveAssessments(): void {
    this.wizardStore.dispatch(new SaveBaseline(this.currentBaseline));
  }

}
