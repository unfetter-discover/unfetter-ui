import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { MatSelect, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/components/common/menuitem';
import { Subscription } from 'rxjs/Subscription';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { filter } from 'rxjs/operators/filter';
import { pluck } from 'rxjs/operators/pluck';
import { take } from 'rxjs/operators/take';
import { AssessmentObject } from 'stix/assess/v2/assessment-object';
import { AssessmentQuestion } from 'stix/assess/v2/assessment-question';
import { Assess3Meta } from 'stix/assess/v3/assess3-meta';
import { Assessment } from 'stix/assess/v3/assessment';
import { ObjectAssessment } from 'stix/assess/v3/baseline/object-assessment';
import { Dictionary } from 'stix/common/dictionary';
import { JsonApiData } from 'stix/json/jsonapi-data';
import { StixCoreEnum } from 'stix/stix/stix-core.enum';
import * as Indicator from 'stix/unfetter/indicator';
import { Stix } from 'stix/unfetter/stix';
import { StixEnum } from 'stix/unfetter/stix.enum';
import { Key } from 'ts-keycode-enum';
import { GenericApi } from '../../../core/services/genericapi.service';
import { heightCollapse } from '../../../global/animations/height-collapse';
import { UserProfile } from '../../../models/user/user-profile';
import { AppState } from '../../../root-store/app.reducers';
import { Constance } from '../../../utils/constance';
import { LoadAssessmentsByRollupId } from '../result/store/full-result.actions';
import { FullAssessmentResultState } from '../result/store/full-result.reducers';
import { CleanAssessmentWizardData, LoadAssessmentWizardData, SaveAssessment, UpdatePageTitle } from '../store/assess.actions';
import * as assessReducers from '../store/assess.reducers';
import { Measurements } from './models/measurements';
import { SidePanelName } from './models/side-panel-name.enum';
import { TempModel } from './models/temp-model';
import { WizardAssessment } from './models/wizard-assessment';

type ButtonLabel = 'SAVE' | 'CONTINUE';

@Component({
  selector: 'unf-assess-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
  animations: [heightCollapse],
})
export class WizardComponent extends Measurements
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('question') public questions: QueryList<MatSelect>;

  public readonly CHART_BG_COLORS: any[];
  public readonly CHART_HOVER_BG_COLORS: any[];
  public readonly CHART_LABELS: string[];
  public readonly CHART_TYPE: string;
  public readonly DEFAULT_CHART_COLORS: any[];
  public readonly defaultMeasurement = 'Nothing';
  public readonly defaultValue = -1;
  public readonly sidePanelCollapseHeight = '32px';
  public readonly sidePanelExpandedHeight = '32px';

  public buttonLabel: ButtonLabel = 'CONTINUE';
  public capabilities: ObjectAssessment[];
  public currentAssessmentGroup = {} as any;
  public currentUser: UserProfile;
  public doughnutChartColors: any[] = this.DEFAULT_CHART_COLORS;
  public doughnutChartData: {
    data: any[];
    backgroundColor: any[];
    hoverBackgroundColor: any[];
  }[];
  public doughnutChartLabels: string[];
  public doughnutChartType: string = this.CHART_TYPE;
  public finishedLoading = false;
  public indicators: Indicator.UnfetterIndicator[];
  public insertMode = false;
  public item: MenuItem[];
  public meta = new Assess3Meta();
  public mitigations: Stix[];
  public model: JsonApiData<Assessment, Dictionary<Assessment>>;
  public navigations: { label: string; page: number }[] = [];
  public openedSidePanel: SidePanelName;
  public page = 1;
  public publishDate = new Date();
  public ratioOfQuestionsAnswered = 0;
  public showSummary = false;
  public summaryDoughnutChartColors = this.DEFAULT_CHART_COLORS;
  public summaryDoughnutChartData: {
    data: any[];
    backgroundColor: any[];
    hoverBackgroundColor: any[];
  }[];
  public summaryDoughnutChartLabels: string[] = this.CHART_LABELS;
  public summaryDoughnutChartType: string = this.CHART_TYPE;
  public chartOptions = {
    legend: {
      display: false,
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem, data) => {
          const allData = data.datasets[tooltipItem.datasetIndex].data;
          const tooltipLabel = data.labels[tooltipItem.index];
          const tooltipData = allData[tooltipItem.index];
          let total = 0;
          allData.forEach(d => {
            total += d;
          });
          const tooltipPercentage = Math.round(tooltipData / total * 100);
          return `${tooltipLabel}: ${tooltipPercentage}%`;
        },
      },
    },
  };
  // public description = `An Assessment is your evaluation of the implementations of your network.  You will rate your environment
  // ' to the best of your ability. On the final page of the survey, you will be asked to enter a name for the report and a description.
  // Unfetter Discover will use the survey to help you understand your gaps, how important they are and which should be addressed.
  // You may create multiple reports to see how your risk is changed when implementing different security processes.`;

  private assessmentGroups: any[];
  private assessmentTypeGroups: Dictionary<{
    tempModel: TempModel;
    assessmentsGroups: any[];
  }> = {};
  private assessments: WizardAssessment[] = [];
  private groupings = [];
  private tempModel: TempModel = {} as TempModel;

  private readonly subscriptions: Subscription[] = [];
  private readonly sidePanelOrder: SidePanelName[] = [
    'indicators',
    'mitigations',
    'capabilities',
    'summary',
  ];

  constructor(
    private assessStore: Store<FullAssessmentResultState>,
    private changeDetection: ChangeDetectorRef,
    private genericApi: GenericApi,
    private location: Location,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private userStore: Store<AppState>,
    private wizardStore: Store<assessReducers.AssessState>
  ) {
    super();
    this.CHART_TYPE = 'doughnut';
    this.DEFAULT_CHART_COLORS = [{}];
    this.CHART_LABELS = ['Risk Accepted', 'Risk Addressed'];
    this.CHART_BG_COLORS = [Constance.COLORS.red, Constance.COLORS.green];
    this.CHART_HOVER_BG_COLORS = [
      Constance.COLORS.darkRed,
      Constance.COLORS.darkGreen,
    ];
  }

  /**
   * @description
   *    initializes this component, fetchs data to build page
   * @returns void
   */
  public ngOnInit(): void {
    this.doughnutChartColors = this.DEFAULT_CHART_COLORS;
    this.doughnutChartData = [
      {
        data: [],
        backgroundColor: this.CHART_BG_COLORS,
        hoverBackgroundColor: this.CHART_HOVER_BG_COLORS,
      },
    ];
    this.doughnutChartLabels = this.CHART_LABELS;
    this.doughnutChartType = this.CHART_TYPE;
    this.summaryDoughnutChartColors = this.DEFAULT_CHART_COLORS;
    this.summaryDoughnutChartData = [
      {
        data: [],
        backgroundColor: this.CHART_BG_COLORS,
        hoverBackgroundColor: this.CHART_HOVER_BG_COLORS,
      },
    ];
    this.summaryDoughnutChartLabels = this.CHART_LABELS;
    this.summaryDoughnutChartType = this.CHART_TYPE;

    const idParamSub$ = this.route.params.subscribe(
      params => {
        const isTrue = (val: number) => val === 1;
        const includesIndicators = isTrue(
          +this.route.snapshot.paramMap.get('includesIndicators')
        );
        const includesMitigations = isTrue(
          +this.route.snapshot.paramMap.get('includesMitigations')
        );
        const baselineRef = this.route.snapshot.paramMap.get('baselineRef');
        const meta: Partial<Assess3Meta> = {
          includesIndicators,
          includesMitigations,
          baselineRef,
        };

        const rollupId = params.rollupId || '';
        if (rollupId) {
          // this is an edit
          this.loadExistingAssessment(rollupId, meta);
        } else {
          // this is a new wizard
          this.wizardStore.dispatch(new LoadAssessmentWizardData(meta));
        }
      },
      err => console.log(err),
      () => idParamSub$.unsubscribe()
    );

    const sub1$ = this.wizardStore
      .select(assessReducers.getIndicatorQuestions)
      .pipe(distinctUntilChanged())
      .subscribe(
        (arr: Indicator.UnfetterIndicator[]) => (this.indicators = arr)
      );

    const sub2$ = this.wizardStore
      .select(assessReducers.getMitigationsQuestions)
      .pipe(distinctUntilChanged())
      .subscribe((arr: Stix[]) => (this.mitigations = arr));

    const sub3$ = this.wizardStore
      .select(assessReducers.getCurrentBaselineQuestions)
      .pipe(distinctUntilChanged())
      .subscribe((arr: ObjectAssessment[]) => (this.capabilities = arr));

    const sub4$ = this.wizardStore
      .select(assessReducers.getFinishedLoading)
      .pipe(
        distinctUntilChanged(),
        filter((loaded: boolean) => loaded && loaded === true)
      )
      .subscribe(
        (loaded: boolean) => {
          this.finishedLoading = loaded;
          const panel = this.determineFirstOpenSidePanel();
          if (panel) {
            this.onOpenSidePanel(panel);
          }
        },
        err => console.log(err)
      );

    const sub5$ = this.wizardStore
      .select(assessReducers.getCurrentWizardPage)
      .pipe(distinctUntilChanged())
      .subscribe((page: number) => (this.page = page), err => console.log(err));

    interface SavedState {
      finished: boolean;
      rollupId: string;
      id: string;
    }
    const sub6$ = this.wizardStore
      .select(assessReducers.getAssessmentSavedState)
      .pipe(
        distinctUntilChanged(),
        filter((el: SavedState) => el && el.finished === true)
      )
      .subscribe(
        (saved: SavedState) => {
          const rollupId = saved.rollupId;
          const id = saved.id;
          this.router.navigate(['/assess-beta/result/summary', rollupId, id]);
        },
        err => console.log(err)
      );

    const sub7$ = this.wizardStore
      .select(assessReducers.getAssessmentMeta)
      .pipe(distinctUntilChanged())
      .subscribe(
        (assessmentMeta: Assess3Meta) => (this.meta = assessmentMeta),
        err => console.log(err)
      );

    this.subscriptions.push(sub1$, sub2$, sub3$, sub4$, sub5$, sub6$, sub7$);
  }

  /**
   * @description
   * @returns {void}
   */
  public ngAfterViewInit(): void {
    // after the question dropdown have been initialized, focus on the first on the page
    this.questions.changes.subscribe(
      (questionElements: QueryList<MatSelect>) => {
        const firstQuestion = questionElements.first;
        if (firstQuestion) {
          firstQuestion.focus();
          this.changeDetection.detectChanges();
        }
      }
    );
  }

  /**
   * @param  {string} rollupId
   * @param  {Partial<Assess3Meta>} meta
   * @returns void
   */
  public loadExistingAssessment(
    rollupId: string,
    meta: Partial<Assess3Meta>
  ): void {
    const sub$ = this.userStore
      .select('users')
      .pipe(pluck('userProfile'), take(1))
      .subscribe(
        (user: UserProfile) => {
          const sub1$ = this.assessStore
            .select('fullAssessment')
            .pipe(pluck('assessmentTypes'), distinctUntilChanged())
            .subscribe(
              (arr: Assessment[]) => this.loadAssessments(rollupId, arr, meta),
              err => console.log(err)
            );
          this.subscriptions.push(sub1$);
        },
        err => console.log(err)
      );
    this.subscriptions.push(sub$);
    this.assessStore.dispatch(new LoadAssessmentsByRollupId(rollupId));
  }

  /**
   * @param  {string} rollupId
   * @param  {Array<Assessment>} arr
   * @param  {Partial<Assess3Meta>} meta
   * @returns void
   */
  public loadAssessments(
    rollupId: string,
    arr: Array<Assessment>,
    meta: Partial<Assess3Meta>
  ): void {
    if (!arr || arr.length === 0) {
      return;
    }

    meta.includesIndicators = false;
    meta.includesMitigations = false;
    meta.baselineRef = undefined;

    /*
     * making the model a collection of all the assessments matching the given rollup id, plus a summary of all the
     * assessed objects to make it easier to use the existing code to display the questions and existing answers
     */
    const summary = new Assessment();
    const typedAssessments = {};
    arr.forEach(assessment => {
      summary.id = assessment.id;
      summary.type = assessment.type;
      summary.name = assessment.name;
      summary.description = assessment.description;
      summary.created = assessment.created;
      summary.modified = assessment.modified;
      summary.assessmentMeta = assessment.assessmentMeta;
      summary.assessment_objects = summary.assessment_objects.concat(
        assessment.assessment_objects
      );
      summary.created_by_ref = meta.created_by_ref = assessment.created_by_ref;
      if (!assessment.metaProperties) {
        assessment.metaProperties = { published: false };
        if (!assessment.metaProperties.rollupId) {
          assessment.metaProperties.rollupId = rollupId;
        }
      }
      if (
        assessment.assessment_objects.every(el => el.stix.type === StixCoreEnum.INDICATOR)
      ) {
        typedAssessments[this.sidePanelOrder[0]] = assessment;
        meta.includesIndicators = true;
      } else if (
        assessment.assessment_objects.every(
          el => el.stix.type === StixCoreEnum.COURSE_OF_ACTION
        )
      ) {
        typedAssessments[this.sidePanelOrder[1]] = assessment;
        meta.includesMitigations = true;
      } else if (
        assessment.assessment_objects.every(
          el => el.stix.type === StixEnum.OBJECT_ASSESSMENT
        )
      ) {
        typedAssessments[this.sidePanelOrder[2]] = assessment;
      } else {
        console.log(
          'We got a weird assessment document that is not all of one category, or has unknown categories',
          assessment
        );
      }
    });

    this.model = {
      id: summary.id,
      type: summary.type,
      attributes: summary,
      relationships: typedAssessments,
      links: undefined,
    };

    meta.title = summary.name;
    meta.description = summary.description;
    this.wizardStore.dispatch(new LoadAssessmentWizardData(meta));
    this.wizardStore.dispatch(new UpdatePageTitle(meta));
  }

  /**
   * @description
   *  cleans up this component, unsubscribes to data
   */
  public ngOnDestroy(): void {
    this.wizardStore.dispatch(new CleanAssessmentWizardData());
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * @description find panel names with data
   * @return {SidePanelName[]}
   */
  public determinePanelsWithData(): SidePanelName[] {
    const panels = [...this.sidePanelOrder];
    const hasContents = panels.filter(name => {
      return this[name] && this[name].length > 0;
    });
    return hasContents;
  }

  /**
   * @description name of first side panel with data
   * @return {string} name of first open side panel
   */
  public determineFirstOpenSidePanel(): SidePanelName {
    const hasContents = this.determinePanelsWithData();
    // return first panel w/ data
    return hasContents[0];
  }

  /**
   * @description first panel with data, after the currently opened
   * @return {string} name of last listed side panel with data
   */
  public determineNextSidePanel(): SidePanelName {
    const panels: SidePanelName[] = [
      ...this.determinePanelsWithData(),
      'summary',
    ];
    const openedIndex = panels.findIndex(el => el === this.openedSidePanel);
    const nextPanels = panels.slice(openedIndex + 1, panels.length);
    // first panel with data, after the currently opened
    return nextPanels[0];
  }

  /**
   * @description
   * @param {string} panel name
   * @param {UIEvent} event
   * @return {void}
   */
  public onOpenSidePanel(panelName: SidePanelName, event?: UIEvent): void {
    if (
      this.openedSidePanel &&
      this.assessmentGroups &&
      this.openedSidePanel !== 'summary'
    ) {
      // save current state, if needed
      this.assessmentTypeGroups[this.openedSidePanel] = {
        tempModel: undefined,
        assessmentsGroups: undefined,
      };
      this.assessmentTypeGroups[this.openedSidePanel].assessmentsGroups = [
        ...this.assessmentGroups,
      ];
      this.assessmentTypeGroups[this.openedSidePanel].tempModel = {
        ...this.tempModel,
      };
    }

    // clear out state
    this.tempModel = {};
    this.page = 1;
    this.showSummary = false;
    this.buttonLabel = 'CONTINUE';

    // switch to new open panel
    this.openedSidePanel = panelName;
    // reload questions
    this.refreshToOpenedAssessmentType();
    if (
      this.openedSidePanel &&
      this.assessmentTypeGroups[this.openedSidePanel]
    ) {
      // reload previous state for given type/panel if it exists
      this.assessmentGroups = [
        ...this.assessmentTypeGroups[this.openedSidePanel].assessmentsGroups,
      ];
      this.currentAssessmentGroup = this.getCurrentAssessmentGroup();
      this.tempModel = {
        ...this.assessmentTypeGroups[this.openedSidePanel].tempModel,
      };
    }

    // reset progress
    this.setSelectedRiskValue();
    this.changeDetection.detectChanges();
    if (panelName !== 'summary') {
      this.updateChart();
    }
    this.updateRatioOfAnswerQuestions();
  }

  /**
   * @description refresh the questions and graphs to the currently open assessment type
   * @return {void}
   */
  public refreshToOpenedAssessmentType(): void {
    const data = this[this.openedSidePanel];
    if (data) {
      this.navigations = [];
      this.updateRatioOfAnswerQuestions();
      this.build(data);
    }
  }

  /**
   * @description
   * @return {void}
   */
  public updateRatioOfAnswerQuestions(): void {
    if (this.assessmentGroups && this.assessmentGroups.length > 1) {
      const allQuestions = this.assessmentGroups
        // flat map assessments across groups
        .map(groups => groups.assessments)
        .reduce(
          (assessments, memo) =>
            memo ? memo.concat(assessments) : assessments,
          []
        )
        // flat map across questions
        .map(assessments => assessments.measurements)
        .reduce(
          (measurements, memo) =>
            memo ? memo.concat(measurements) : measurements,
          []
        );
      const numQuestions = allQuestions.length;
      const answeredQuestions = allQuestions.filter(el => el.risk > -1).length;
      if (answeredQuestions > 0) {
        const ratio = answeredQuestions / numQuestions;
        this.ratioOfQuestionsAnswered = Math.round(ratio * 100);
      } else {
        this.ratioOfQuestionsAnswered = 0;
      }
    }
  }

  /**
   * @description
   */
  @HostListener('window:keyup', ['$event'])
  public keyEvent(event: KeyboardEvent) {
    if (this.insertMode === true) {
      const validOptions = [
        Key.Zero,
        Key.One,
        Key.Two,
        Key.Three,
        Key.Four,
        Key.Five,
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

  /**
   * @description
   * @param {answerIndex}
   * @return {void}
   */
  public updateAllQuestions(answerIndex: number): void {
    if (
      !this.currentAssessmentGroup ||
      !this.currentAssessmentGroup.assessments
    ) {
      return;
    }

    this.currentAssessmentGroup.assessments.forEach(assessment => {
      const measurements = assessment.measurements;
      measurements.forEach((measurement: AssessmentQuestion) => {
        const options = measurement.options;
        const index = answerIndex < options.length ? answerIndex : 0;
        const option = options[index];
        this.updateRisks(
          { selected: { value: option.risk } },
          measurement,
          assessment
        );
        this.questions.forEach(question => {
          question.value = option.risk;
        });
        this.selectedValue(measurement, option, assessment);
      });
      // calculate risk of all measurements
      this.updateRatioOfAnswerQuestions();
    });
  }

  /**
   * @description
   * @return {void}
   */
  public setSelectedRiskValue(): void {
    if (this.model && this.currentAssessmentGroup) {
      this.currentAssessmentGroup.assessments.forEach(assessment =>
        this.collectModelAssessments(assessment)
      );
      this.calculateGroupRisk();
    } else {
      this.calculateGroupRisk();
    }
  }

  public collectModelAssessments(assessment: any) {
    if (
      this.model &&
      this.model.attributes &&
      this.model.attributes.assessment_objects &&
      this.model.attributes.assessment_objects.length > 0 &&
      assessment &&
      assessment.id
    ) {
      const assessmentObject = this.model.attributes.assessment_objects.find(
        obj => (obj.stix ? assessment.id === obj.stix.id : false)
      );
      if (!assessmentObject) {
        console.warn(
          `assessmentObject not found! id: ${assessment.id}, moving on...`
        );
        return;
      }
      assessment.risk = assessmentObject.risk ? assessmentObject.risk : 0;
      if (assessment.measurements && assessmentObject.questions) {
        assessment.measurements.forEach(m => {
          const question = assessmentObject.questions.find(
            q => q.name === m.name
          );
          if (question) {
            m.risk = question.risk ? question.risk : 0;
          }
        });
      }
    } else {
      console.warn(
        `unable to execute collection of model assessments; moving on... model: ${JSON.stringify(
          this.model
        )}`
      );
    }
  }

  /**
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

  /**
   * @description update risks
   * @param option
   * @param measurement
   * @param assessment
   * @returns {void}
   */
  public updateRisks(
    option: any,
    measurement: AssessmentQuestion,
    assessment: any
  ): void {
    const newRisk = option.selected.value;
    // update measurement value in assessments
    const assessmentMeasurementToUpdate = assessment.measurements.find(
      measure => measure.name === measurement.name
    );
    this.updateQuestionRisk(assessmentMeasurementToUpdate, newRisk);
    // we need a temp model to hold selected question
    if (!this.model) {
      if (!this.tempModel[assessment.id]) {
        this.tempModel[assessment.id] = {
          assessment: new Assessment(),
          measurements: [],
        };
      }
      this.tempModel[assessment.id].assessment = assessment;
      this.tempModel[assessment.id].measurements = this.tempModel[
        assessment.id
      ].measurements.filter(m => {
        return m.name !== assessmentMeasurementToUpdate.name;
      });
      // only add if question is selected
      if (newRisk >= 0) {
        this.tempModel[assessment.id].measurements.push(
          assessmentMeasurementToUpdate
        );
      }
      // if no questions selected remove
      if (this.tempModel[assessment.id].measurements.length === 0) {
        delete this.tempModel[assessment.id];
      }
    }
    // can not have negative. if new newRisk is < 0
    // set assessmentMeasurementToUpdate.risk to 1
    if (newRisk < 0) {
      assessmentMeasurementToUpdate.risk = -1;
    }
    // calculate risk of all measurements
    assessment.risk = this.calculateMeasurementsAvgRisk(
      assessment.measurements
    );
    const groupRisk = this.calculateGroupRisk();

    if (this.model) {
      let assessment_object = this.model.attributes.assessment_objects.find(
        assessmentObject => assessment.id === assessmentObject.stix.id
      );

      if (!assessment_object) {
        assessment_object = {
          questions: [measurement],
          risk: newRisk,
          stix: {
            id: assessment.id,
            description: assessment.description,
            type: assessment.type,
            name: assessment.name,
          } as Stix,
        } as AssessmentObject;
        this.model.attributes.assessment_objects.push(assessment_object);
        switch (assessment.type) {
          case StixCoreEnum.INDICATOR:
            this.model.relationships[
              this.sidePanelOrder[0]
            ].assessment_objects.push(assessment_object);
            break;
          case StixCoreEnum.COURSE_OF_ACTION:
            this.model.relationships[
              this.sidePanelOrder[1]
            ].assessment_objects.push(assessment_object);
            break;
          case StixEnum.OBJECT_ASSESSMENT:
            this.model.relationships[
              this.sidePanelOrder[2]
            ].assessment_objects.push(assessment_object);
            break;
        }
      } else {
        if (newRisk < 0) {
          assessment_object.questions = assessment_object.questions.filter(
            q => {
              return q.name !== measurement.name;
            }
          );
          if (assessment_object.questions.length === 0) {
            assessment_object.risk = newRisk;
          }
        } else {
          let question = assessment_object.questions.find(
            q => q.name === measurement.name
          );
          if (!question) {
            question = measurement;
            assessment_object.questions.push(question);
          } else {
            this.updateQuestionRisk(question, newRisk);
          }
          assessment_object.risk = assessment.risk;
        }
      }
    }
    this.updateChart();
    this.updateRatioOfAnswerQuestions();
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

    if (this.page === 1) {
      return;
    }
    this.page = this.page - 1;
    this.buttonLabel = 'CONTINUE';
    this.currentAssessmentGroup = this.getCurrentAssessmentGroup();
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

    // last page for this assessment type
    if (this.page + 1 > this.assessmentGroups.length) {
      const nextPanel = this.determineNextSidePanel();
      // last page
      if (nextPanel !== 'summary') {
        //  but not last assessment type, advance the assessment type
        this.onOpenSidePanel(nextPanel);
      } else {
        // last assessment type, show save page
        this.page = 1;
        this.onOpenSidePanel('summary');
        this.showSummarySavePage();
      }
    } else {
      // advance to next page within a given assessment type
      this.page = this.page + 1;
      this.currentAssessmentGroup = this.getCurrentAssessmentGroup();
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
    this.currentAssessmentGroup = null;
    this.showSummary = true;
    this.buttonLabel = 'SAVE';
    this.updateSummaryChart();
  }

  /*
   * @description
   * @param measurement 
   * @param option 
   * @param {Assessment} assessment - optional
   * @return {number}
   */
  public selectedValue(
    measurement: any,
    option: any,
    assessment?: Assessment
  ): number {
    if (!this.model) {
      if (this.tempModel) {
        if (this.tempModel[assessment.id]) {
          const found = this.tempModel[assessment.id].measurements.find(m => {
            return m.name === measurement.name;
          });
          return found ? found.risk : this.defaultValue;
        } else {
          return option.value ? option.value : this.defaultValue;
        }
      } else {
        return option.value ? option.value : this.defaultValue;
      }
    } else {
      let a = this.model.attributes.assessment_objects.find(
        assessment_objects => {
          return assessment_objects.stix.id === assessment.id;
        }
      );
      if (!a) {
        return this.defaultValue;
      } else {
        const q = a.questions.find(question => {
          return question.name === measurement.name;
        });
        return q && q.selected_value
          ? q.selected_value.risk
          : this.defaultValue;
      }
    }
  }

  /*
   * @description
   * @return {boolean} true if first page of first side panel otherwise false
   */
  public isFirstPageOfFirstSidePanel(): boolean {
    const isFirstPanel =
      this.openedSidePanel === this.determineFirstOpenSidePanel();
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
  public trackByFn(index, item): number {
    return item && item.id ? item.id : index;
  }

  /**
   * @description build page and refresh chart
   * @param data
   * @return {void}
   */
  private build(data?: Stix[]): void {
    if (!data) {
      return;
    }

    this.assessmentGroups = this.createAssessmentGroups(data);
    this.currentAssessmentGroup = this.getCurrentAssessmentGroup();
    this.updateChart();
  }

  /**
   * @description
   * @param {void}
   * @return {any}
   */
  private getCurrentAssessmentGroup(): any {
    let index = 0;
    if (this.page) {
      index = this.page - 1;
    }
    if (index >= this.assessmentGroups.length) {
      index = 0;
    }
    return this.assessmentGroups[index];
  }

  /**
   * For testing only
   * @return {any[]}
   */
  public getAssessmentGroups(): any[] {
    return this.assessmentGroups;
  }

  /**
   * For testing only
   * @return {any[]}
   */
  public setAssessmentGroups(newAssessementGroups: any[]): void {
    this.assessmentGroups = newAssessementGroups;
  }

  /**
   * @description
   * @param {Stix[]}
   * @return {any[]}
   */
  public createAssessmentGroups(assessedObjects: Stix[]): any[] {
    const assessmentGroups = [];

    if (assessedObjects) {
      // Go through and build each assessment
      // We do this so we can just save all the assessments later.
      this.assessments = assessedObjects
        // .map((el) => el.attributes)
        .map(assessedObject => {
          const assessment = new WizardAssessment();
          if (
            assessedObject.metaProperties &&
            assessedObject.metaProperties.groupings
          ) {
            assessment.groupings = assessedObject.metaProperties.groupings;
          } else {
            if (assessedObject.type === StixEnum.OBJECT_ASSESSMENT) {
              const objectAssessment = assessedObject as ObjectAssessment;
              const assessmentGroup = {
                groupName: objectAssessment.object_ref,
                groupValue: objectAssessment.name,
              };
              assessment.groupings = [assessmentGroup];
            }
          }
          assessment.id = assessedObject.id;
          assessment.name = assessedObject.name;
          assessment.description = assessedObject.description;
          assessment.measurements = assessedObject.id
            ? this.buildMeasurements(assessedObject.id)
            : [];
          assessment.type = assessedObject.type;
          const risk = this.getRisk(assessment.measurements);
          assessment.risk = risk >= 0 ? risk : -1;
          return assessment;
        });
      this.groupings = this.buildGrouping(this.assessments);

      const assessmentObjectsGroups = this.doObjectGroupings(this.assessments);
      // console.log(`assessmentObjectGroups: ${JSON.stringify(assessmentObjectsGroups)}`);
      const keys = Object.keys(assessmentObjectsGroups).sort();
      keys.forEach((phaseName, index) => {
        // TODO - Need to remove the 'courseOfAction' name
        const courseOfActionGroup = assessmentObjectsGroups[phaseName];

        // This is the x-unfetter-control-assessments
        const assessmentGroup: any = {};
        assessmentGroup.name = phaseName;
        const step = index + 1;
        this.navigations.push({
          label: this.splitTitle(phaseName),
          page: step,
        });
        this.item = this.navigations;
        // TODO: Need to get description somehow from the key phase information
        assessmentGroup.description = this.groupings[phaseName];
        assessmentGroup.assessments = courseOfActionGroup;
        assessmentGroup.risk = 1;
        const riskArray = [1, 0];
        assessmentGroup.riskArray = riskArray;
        const riskArrayLabels = ['Risk Accepted', 'Risk Addressed'];
        assessmentGroup.riskArrayLabels = riskArrayLabels;
        assessmentGroups.push(assessmentGroup);
      });
    }

    return assessmentGroups;
  }

  /**
   * @description
   * @param stixObjects
   * @return {any}
   */
  private buildGrouping(stixObjects: WizardAssessment[]): any {
    const groupings = [];
    stixObjects.forEach(stixObject => {
      const groupingStages = stixObject.groupings;
      if (!groupingStages) {
        const phaseName = 'unknown';
        // if (!groupings[phaseName]) {
        //   const description = 'unknown description';
        //   groupings[phaseName] = description;
        // }
      } else {
        groupingStages.forEach(groupingStage => {
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

  /**
   * @description
   * @param stixObjects
   * @return {any}
   */
  private doObjectGroupings(stixObjects): any {
    const hash = {};
    stixObjects.forEach(stixObject => {
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
        groupingStages.forEach(groupingStage => {
          const phaseName = groupingStage.groupingValue;
          let objectProxies = hash[phaseName];
          if (objectProxies === undefined) {
            objectProxies = [];
            hash[phaseName] = objectProxies;
          }
          const objectProxy = {
            content: stixObject,
          };

          objectProxies.push(stixObject);
        });
      }
    });

    return hash;
  }

  /**
   * @description
   * @param {any} assessmentGroup
   * @return {number}
   */
  public calculateGroupRisk(
    assessmentGroup: any = this.currentAssessmentGroup
  ): number {
    let groupRisk = 0; // based on the default value from the calculateRisk function below
    if (
      assessmentGroup &&
      assessmentGroup.assessments &&
      assessmentGroup.assessments.length > 0
    ) {
      groupRisk = this.calculateRisk(assessmentGroup.assessments);
      const riskArray = [];
      riskArray.push(groupRisk);
      riskArray.push(1 - groupRisk);
      assessmentGroup.risk = groupRisk;
      assessmentGroup.riskArray = riskArray;
    }
    return groupRisk;
  }

  /**
   * @description update the chart data
   * @return {void}
   */
  private updateChart(): void {
    const chartData = this.doughnutChartData.slice();
    chartData[0].data = this.currentAssessmentGroup
      ? this.currentAssessmentGroup.riskArray
      : [];
    this.doughnutChartData = chartData;
  }

  /**
   * @description handle an assessment's worth of summary chart data
   * @return {any[]}
   */
  public generateSummaryChartDataForAnAssessmentType(assessmentData): number[] {
    let result: number[] = [];

    if (assessmentData) {
      if (this.assessmentGroups && this.assessmentGroups.length > 0) {
        this.assessmentGroups.forEach(element => {
          if (element.assessments) {
            element.assessments.forEach(assessment =>
              this.collectModelAssessments(assessment)
            );
          }
          this.calculateGroupRisk(element);
        });
        const singleAssessmentRiskArray: number[] = this.assessmentGroups
          .map(groups => groups.riskArray)
          .reduce(this.riskReduction, [0, 0])
          .map(riskSum => riskSum / this.assessmentGroups.length);
        result = singleAssessmentRiskArray;
      }
    }
    return result;
  }

  /**
   * @description update the summary chart data
   * @return {void}
   */
  public updateSummaryChart(): void {
    // default for problematic data
    let chartData = [
      { data: [], backgroundColor: [], hoverBackgroundColor: [] },
    ];
    const assessmentData: number[][] = [];
    if (
      this.summaryDoughnutChartData &&
      this.summaryDoughnutChartData[0].data
    ) {
      chartData = this.summaryDoughnutChartData.slice();
      const assessmentTypes: string[] = [
        'mitigations',
        'capabilities',
        'indicators',
      ];
      assessmentTypes.forEach(element => {
        if (this[element] && this[element].length > 0) {
          this.openedSidePanel = element as SidePanelName;
          // reload questions
          this.refreshToOpenedAssessmentType();
          if (
            this.openedSidePanel &&
            this.assessmentTypeGroups[this.openedSidePanel]
          ) {
            // reload previous state for given type/panel if it exists
            this.assessmentGroups = [
              ...this.assessmentTypeGroups[this.openedSidePanel]
                .assessmentsGroups,
            ];
            this.currentAssessmentGroup = this.getCurrentAssessmentGroup();
            this.tempModel = {
              ...this.assessmentTypeGroups[this.openedSidePanel].tempModel,
            };
          }

          // reset progress
          this.setSelectedRiskValue();
          this.updateRatioOfAnswerQuestions();

          const singleAssessmentData = this.generateSummaryChartDataForAnAssessmentType(
            this.currentAssessmentGroup
          );
          if (singleAssessmentData && singleAssessmentData.length > 0) {
            assessmentData.push(singleAssessmentData);
          }
        }
      });
      if (assessmentData && assessmentData.length > 0) {
        chartData[0].data = assessmentData
          .reduce(this.riskReduction, [0, 0])
          .map(riskSum => riskSum / assessmentData.length);
      }
    }
    this.summaryDoughnutChartData = chartData;
    this.openedSidePanel = 'summary';
  }

  public riskReduction(
    currentTotalRisk: number[],
    currentRisk: number[]
  ): number[] {
    let result: number[] = [];
    if (currentRisk) {
      result = currentTotalRisk.map(
        (riskValue, index) => (riskValue += currentRisk[index])
      );
    }
    return result;
  }

  /**
   * @description
   * @param title
   * @return {string}
   */
  private splitTitle(title?: string): string {
    const split = title
      ? title.split('-')
      : this.currentAssessmentGroup.name.split('-');
    for (let i = 0; i < split.length; i++) {
      let s = split[i];
      s = s.charAt(0).toUpperCase() + s.slice(1);
      split[i] = s;
    }
    return split.join(' ');
  }

  /**
   * @description
   * @param {any}
   * @return {Assessment}
   */
  private generateXUnfetterAssessment(
    tempModel: TempModel,
    assessmentMeta: Assess3Meta
  ): Assessment {
    const assessment = new Assessment();
    assessment.assessmentMeta = assessmentMeta;
    assessment.name = this.meta.title;
    assessment.description = this.meta.description;
    assessment.created = this.publishDate.toISOString();
    assessment.created_by_ref = this.meta.created_by_ref;
    const assessmentSet = new Set<AssessmentObject>();

    Object.keys(tempModel).forEach(assessmentId => {
      const assessmentObj = tempModel[assessmentId];
      const temp = new AssessmentObject();
      const stix = new Stix();
      stix.id = assessmentObj.assessment.id;
      stix.type = assessmentObj.assessment.type;
      stix.description = assessmentObj.assessment.description || '';
      stix.name = assessmentObj.assessment.name;
      stix.created_by_ref = assessmentObj.assessment.created_by_ref;
      temp.stix = stix;
      temp.questions = [];
      if (assessmentObj.measurements !== undefined) {
        temp.questions = assessmentObj.measurements.filter(measurement => {
          return (
            measurement.selected_value && measurement.selected_value.risk >= 0
          );
        });
      }
      temp.risk =
        temp.questions
          .map(question => question.risk)
          .reduce((prev, cur) => (prev += cur), 0) / temp.questions.length;
      assessmentSet.add(temp);
    });

    assessment['assessment_objects'] = Array.from(assessmentSet);
    return assessment;
  }

  /**
   * @description save an assessment object to the database
   * @param {void}
   * @return {void}
   */
  private saveAssessments(): void {
    if (this.model) {
      const assessments = Object.values(this.model.relationships);
      assessments.forEach(assessment => {
        assessment.modified = this.publishDate.toISOString();
        assessment.description = this.meta.description;
        if (this.meta.created_by_ref) {
          assessment.created_by_ref = this.meta.created_by_ref;
        }
      });
      this.wizardStore.dispatch(new SaveAssessment(assessments));
    } else {
      const assessments = this.sidePanelOrder
        .map(name => this.assessmentTypeGroups[name])
        .filter(el => el !== undefined)
        .map(el => el.tempModel)
        .filter(el => el !== undefined)
        .map(el => this.generateXUnfetterAssessment(el, this.meta));
      this.wizardStore.dispatch(new SaveAssessment(assessments));
    }
  }
}
