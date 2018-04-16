import { Component, ChangeDetectorRef, ElementRef, Input, OnInit, SimpleChanges, ViewEncapsulation, OnDestroy, HostListener, QueryList, ViewChildren, Renderer2, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { MatSnackBar, MatSelect } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { Key } from 'ts-keycode-enum';

import * as assessActions from '../store/assess.actions';
import * as assessReducers from '../store/assess.reducers';

import { AppState } from '../../root-store/app.reducers';
import { Assessment3 } from '../../models/assess/assessment3';
import { AssessmentsService } from '../assessments.service';
import { Assessment3Meta } from '../../models/assess/assessment3-meta';
import { Assessment3Object } from '../../models/assess/assessment3-object';
import { Assessment3Question } from '../../models/assess/assessment3-question';
import { Constance } from '../../utils/constance';
import { Dictionary } from '../../models/json/dictionary';
import { GenericApi } from '../../core/services/genericapi.service';
import { Measurements } from './models/measurements';
import { MenuItem } from 'primeng/primeng';
import { LoadAssessmentWizardData, SaveAssessment, UpdatePageTitle, CleanAssessmentWizardData } from '../store/assess.actions';
import { Stix } from '../../models/stix/stix';
import { JsonApiData } from '../../models/json/jsonapi-data';
import { KEY_CODE } from './key-code.enum';
import { UserProfile } from '../../models/user/user-profile';
import { FullAssessmentResultState } from '../result/store/full-result.reducers';
import { LoadAssessmentResultData } from '../result/store/full-result.actions';
import { heightCollapse } from '../../global/animations/height-collapse';
import { WizardAssessment } from './models/wizard-assessment';
import { ScoresModel } from './models/scores-model';

type ButtonLabel = 'SAVE' | 'CONTINUE';

@Component({
  selector: 'unf-assess3-wizard',
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

  public model: JsonApiData<Assessment3, Dictionary<Assessment3>>;
  public publishDate = new Date();
  public buttonLabel: ButtonLabel = 'CONTINUE';
  public navigations: { label: string, page: number }[] = [];
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
  public currentCapability = {} as any;
  public page = 1;
  public meta = new Assessment3Meta();
  public ratioOfQuestionsAnswered = 0;
  public openedSidePanel: string;
  public insertMode = false;
  private assessments: WizardAssessment[] = [];
  private groupings = [];
  private capabilities: any[];
  private scoresModel: ScoresModel = {} as ScoresModel;
  public categories: Dictionary<{ scoresModel: ScoresModel, capabilities: any[] }> = {};

  private readonly subscriptions: Subscription[] = [];
  private readonly sidePanelOrder: string[] = ['categories', 'summary'];

  constructor(
    private genericApi: GenericApi,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2,
    private userStore: Store<AppState>,
    private assessStore: Store<FullAssessmentResultState>,
    private wizardStore: Store<assessReducers.AssessState>,
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
          let meta: Partial<Assessment3Meta> = {};
          let assessmentId = params.assessmentId || '';
          if (assessmentId) {
            this.loadExistingAssessment(assessmentId, meta);
          }
          this.wizardStore.dispatch(new LoadAssessmentWizardData(meta));
        },
        (err) => console.log(err),
        () => idParamSub$.unsubscribe());

    const sub4$ = this.wizardStore
      .select('assessment')
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
      .select('assessment')
      .pluck('page')
      .distinctUntilChanged()
      .subscribe(
        (page: number) => this.page = page,
        (err) => console.log(err));

    interface SavedState { finished: boolean, id: string };
    const sub6$ = this.wizardStore
      .select('assessment')
      .pluck('saved')
      .distinctUntilChanged()
      .filter((el: SavedState) => el && el.finished === true)
      .subscribe(
        (saved: SavedState) => {
          const id = saved.id;
          this.router.navigate(['/assess3/result/summary', id]);
        },
        (err) => console.log(err));

    const sub7$ = this.wizardStore
      .select('assessment')
      .pluck('assessment')
      .pluck('assessmentMeta')
      .distinctUntilChanged()
      .subscribe(
        (assessmentMeta: Assessment3Meta) => this.meta = assessmentMeta,
        (err) => console.log(err));

    const sub8$ = this.userStore
      .select('users')
      .pluck('userProfile')
      .distinctUntilChanged()
      .take(1)
      .subscribe(
        (user: UserProfile) => this.currentUser = user,
        (err) => console.log(err));

    this.subscriptions.push(sub4$, sub5$, sub6$, sub7$, sub8$);
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

  public loadExistingAssessment(assessmentId: string, meta: Partial<Assessment3Meta>) {
    const sub$ = this.userStore
      .select('users')
      .pluck('userProfile')
      .take(1)
      .subscribe(
        (user: UserProfile) => {
          const sub1$ = this.assessStore
            .select('fullAssessment')
            .pluck('assessmentTypes')
            .distinctUntilChanged()
            .subscribe(
              (arr: Assessment3[]) => this.loadAssessments(assessmentId, arr, meta),
              (err) => console.log(err));
          this.subscriptions.push(sub1$);
        },
        (err) => console.log(err));
    this.subscriptions.push(sub$);
    this.assessStore.dispatch(new LoadAssessmentResultData(assessmentId));
  }

  public loadAssessments(assessmentId: string, arr: Array<Assessment3>, meta: Partial<Assessment3Meta>) {
    if (!arr || arr.length === 0) {
      return;
    }

    /*
     * making the model a collection of all the assessments matching the given rollup id, plus a summary of all the
     * assessed objects to make it easier to use the existing code to display the questions and existing answers
     */
    const summary = new Assessment3();
    const typedAssessments = {};
    arr.forEach(assessment => {
      summary.id = assessment.id;
      summary.type = assessment.type;
      summary.name = assessment.name;
      summary.description = assessment.description;
      summary.created = assessment.created;
      summary.modified = assessment.modified;
      summary.assessmentMeta = assessment.assessmentMeta;
      summary.assessment_objects = summary.assessment_objects.concat(assessment.assessment_objects);
      summary.created_by_ref = assessment.created_by_ref;
      // if (!assessment.metaProperties) {
      //   assessment.metaProperties = {};
      //   if (!assessment.metaProperties.rollupId) {
      //     assessment.metaProperties.rollupId = rollupId;
      //   }
      // }
      // if (assessment.assessment_objects.every(el => el.stix.type === 'indicator')) {
      //   typedAssessments[this.sidePanelOrder[0]] = assessment;
      //   meta.includesIndicators = true;
      // } else if (assessment.assessment_objects.every(el => el.stix.type === 'course-of-action')) {
      //   typedAssessments[this.sidePanelOrder[1]] = assessment;
      //   meta.includesMitigations = true;
      // } else if (assessment.assessment_objects.every(el => el.stix.type === 'x-unfetter-sensor')) {
      //   typedAssessments[this.sidePanelOrder[2]] = assessment;
      //   meta.includesSensors = true;
      // } else {
      //   console.log('We got a weird assessment document that is not all of one category, or has unknown categories',
      //     assessment);
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
    const panels = [...this.sidePanelOrder];
    const hasContents = panels.filter((name) => {
      return this[name] && this[name].length > 0;
    });
    return hasContents;
  }

  /*
   * @description name of first side panel with data
   * @return {string} name of first open side panel
   */
  public determineFirstOpenSidePanel(): string {
    const hasContents = this.determinePanelsWithData();
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
    if (this.openedSidePanel && this.capabilities && this.openedSidePanel !== 'summary') {
      // save current state, if needed
      this.categories[this.openedSidePanel] = { scoresModel: undefined, capabilities: undefined };
      this.categories[this.openedSidePanel].capabilities = [...this.capabilities];
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
      this.capabilities = [...this.categories[this.openedSidePanel].capabilities];
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

  /*
   * @description
   * @return {void}
   */
  public updateRatioOfAnswerQuestions(): void {
    if (this.capabilities && this.capabilities.length > 1) {
      const allQuestions = this.capabilities
        // flat map assessments across groups
        .map((groups) => groups.assessments)
        .reduce((assessments, memo) => memo ? memo.concat(assessments) : assessments, [])
        // flat map across questions
        .map((assessments) => assessments.measurements)
        .reduce((measurements, memo) => memo ? memo.concat(measurements) : measurements, []);
      const numQuestions = allQuestions.length;
      const answeredQuestions = allQuestions.filter((el) => el.risk > -1).length;
      if (answeredQuestions > 0) {
        const ratio = answeredQuestions / numQuestions;
        this.ratioOfQuestionsAnswered = Math.round(ratio * 100);
      } else {
        this.ratioOfQuestionsAnswered = 0;
      }
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
    if (!this.currentCapability || !this.currentCapability.assessments) {
      return;
    }

    this.currentCapability.assessments.forEach((assessment) => {
      const measurements = assessment.measurements;
      measurements.forEach((measurement: Assessment3Question) => {
        // TODO: Update once we have scoring
        // const options = measurement.options;
        // const index = answerIndex < options.length ? answerIndex : 0;
        // const option = options[index];
        // this.updateRisks({ selected: { value: option.risk } }, measurement, assessment);
        // this.questions.forEach((question) => {
        //   question.value = option.risk;
        // });
        // this.selectedValue(measurement, option, assessment);
      });
      // calculate risk of all measurements
      this.updateRatioOfAnswerQuestions();
    });
  }

  /*
   * @description
   * @return {void}
   */
  public setSelectedRiskValue(): void {
    if (this.model && this.currentCapability) {
      this.currentCapability.assessments.forEach(assessment => this.collectModelAssessments(assessment));
      this.calculateGroupRisk();
    } else {
      this.calculateGroupRisk();
    }
  }

  public collectModelAssessments(assessment: any) {
    if (this.model && this.model.attributes && this.model.attributes.assessment_objects
      && this.model.attributes.assessment_objects.length > 0 && assessment && assessment.id) {
      const assessmentObject = this.model.attributes.assessment_objects.find(obj => obj.stix ? assessment.id === obj.stix.id : false);
      if (!assessmentObject) {
        console.warn(`assessmentObject not found! id: ${assessment.id}, moving on...`);
        return;
      }
      // TODO: Resurrect this once we have scoring
      // assessment.risk = assessmentObject.risk ? assessmentObject.risk : 0;
      // if (assessment.measurements && assessmentObject.questions) {
      //   assessment.measurements.forEach((m) => {
      //     const question = assessmentObject.questions.find((q) => q.name === m.name);
      //     if (question) {
      //       m.risk = question.risk ? question.risk : 0;
      //     }
      //   });
      // }
    } else {
      console.warn(`unable to execute collection of model assessments; moving on... model: ${JSON.stringify(this.model)}`);
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

  // TODO: commented for now, e
  /*
   * @description update riskss
   * @param option
   * @param measurement
   * @param assessment
   * @returns {void}
   */
  /*public updateRisks(option: any, measurement: Assessment3Question, assessment: any): void {
    const newRisk = option.selected.value;
    // update measurement value in assessments
    const assessmentMeasurementToUpdate = assessment.measurements
      .find((measure) => measure.name === measurement.name);
    this.updateQuestionRisk(assessmentMeasurementToUpdate, newRisk);
    // we need a temp model to hold selected question
    if (!this.model) {
      if (!this.tempModel[assessment.id]) {
        this.tempModel[assessment.id] = { assessment: new Assessment3(), measurements: [] };
      }
      this.tempModel[assessment.id].assessment = assessment;
      this.tempModel[assessment.id].measurements = this.tempModel[assessment.id].measurements.filter((m) => {
        return m.name !== assessmentMeasurementToUpdate.name;
      });
      // only add if question is selected
      if (newRisk >= 0) {
        this.tempModel[assessment.id].measurements.push(assessmentMeasurementToUpdate);
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
    assessment.risk = this.calculateMeasurementsAvgRisk(assessment.measurements);
    const groupRisk = this.calculateGroupRisk();

    if (this.model) {
      let assessment_object = this.model.attributes.assessment_objects
        .find((assessmentObject) => assessment.id === assessmentObject.stix.id);

      if (!assessment_object) {
        assessment_object = {
          questions: [measurement],
          risk: newRisk,
          stix: {
            id: assessment.id,
            description: assessment.description,
            type: assessment.type,
            name: assessment.name
          } as Stix
        } as Assessment3Object;
        this.model.attributes.assessment_objects.push(assessment_object);
        switch (assessment.type) {
          case 'indicator':
            this.model.relationships[this.sidePanelOrder[0]].assessment_objects.push(assessment_object);
            break;
          case 'course-of-action':
            this.model.relationships[this.sidePanelOrder[1]].assessment_objects.push(assessment_object);
            break;
          case 'x-unfetter-sensor':
            this.model.relationships[this.sidePanelOrder[2]].assessment_objects.push(assessment_object);
            break;
        }
      } else {
        if (newRisk < 0) {
          assessment_object.questions = assessment_object.questions.filter((q) => { return q.name !== measurement.name });
          if (assessment_object.questions.length === 0) {
            assessment_object.risk = newRisk;
          }
        } else {
          let question = assessment_object.questions.find((q) => q.name === measurement.name);
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

    // last page for this assessment type
    if (this.page + 1 > this.capabilities.length) {
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
   * @param {Assessment} assessment - optional
   * @return {number}
   */
  // public selectedValue(measurement: any, option: any, assessment?: Assessment3): number {
  //   if (!this.model) {
  //     if (this.tempModel) {
  //       if (this.tempModel[assessment.id]) {
  //         const found = this.tempModel[assessment.id].measurements.find((m) => { return m.name === measurement.name; });
  //         return found ? found.risk : this.defaultValue;
  //       } else {
  //         return option.value ? option.value : this.defaultValue;
  //       }
  //     } else {
  //       return option.value ? option.value : this.defaultValue;
  //     }
  //   } else {
  //     let a = this.model.attributes.assessment_objects.find(
  //       (assessment_objects) => {
  //         return assessment_objects.stix.id === assessment.id;
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

    this.capabilities = this.createCapabilities(data);
    this.currentCapability = this.getCurrentCapability();
    this.updateChart();
  }

  /*
   * @description
   * @param {void}
   * @return {any}
   */
  private getCurrentCapability(): any {
    let index = 0;
    if (this.page) {
      index = this.page - 1;
    }
    if (index >= this.capabilities.length) {
      index = 0;
    }
    return this.capabilities[index];
  }

  /* 
   * For testing only
   * @return {any[]}
   */
  public getCapabilities(): any[] {
    return this.capabilities;
  }

  /* 
   * For testing only
   * @return {any[]}
   */
  public setCapabilities(newCapabilities: any[]): void {
    this.capabilities = newCapabilities;
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
      // Go through and build each assessment
      // We do this so we can just save all the assessments later.
      this.assessments = assessedObjects
        // .map((el) => el.attributes)
        .map((assessedObject) => {
          const assessment = new WizardAssessment();
          if (assessedObject.metaProperties && assessedObject.metaProperties.groupings) {
            assessment.groupings = assessedObject.metaProperties.groupings;
          }
          assessment.id = assessedObject.id;
          assessment.name = assessedObject.name;
          assessment.description = assessedObject.description;
          assessment.scores = assessedObject.id ? this.buildMeasurements(assessedObject.id) : [];
          assessment.type = assessedObject.type;
          const risk = this.getRisk(assessment.scores);
          assessment.risk = -1;
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
        const capability: any = {};
        capability.name = phaseName;
        const step = index + 1;
        this.navigations.push({
          label: this.splitTitle(phaseName),
          page: step
        });
        this.item = this.navigations;
        // TODO: Need to get description somehow from the key phase information
        capability.description = this.groupings[phaseName];
        capability.assessments = courseOfActionGroup;
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
  private buildGrouping(stixObjects: WizardAssessment[]): any {
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
    if (capability && capability.assessments && capability.assessments.length > 0) {
      groupRisk = this.calculateRisk(capability.assessments);
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
    chartData[0].data = this.currentCapability
      ? this.currentCapability.riskArray : [];
    this.doughnutChartData = chartData;
  }

  /*
   * @description handle an assessment's worth of summary chart data
   * @return {any[]}
   */
  public generateSummaryChartDataForAnAssessmentType(assessmentData): number[] {
    let result: number[] = [];

    if (assessmentData) {
      if (this.capabilities && this.capabilities.length > 0) {
        this.capabilities.forEach(element => {
          if (element.assessments) {
            element.assessments.forEach(assessment => this.collectModelAssessments(assessment))
          }
          this.calculateGroupRisk(element);
        });
        const singleAssessmentRiskArray: number[] = this.capabilities
          .map((groups) => groups.riskArray)
          .reduce(this.riskReduction, [0, 0])
          .map((riskSum) => riskSum / this.capabilities.length);
        result = singleAssessmentRiskArray;
      }
    }
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
  private generateBaselineAssessment(tempModel: ScoresModel, assessmentMeta: Assessment3Meta): Assessment3 {
    const assessment = new Assessment3();
    assessment.assessmentMeta = assessmentMeta;
    assessment.name = this.meta.title;
    assessment.description = this.meta.description;
    assessment.created = this.publishDate.toISOString();
    assessment.created_by_ref = this.meta.created_by_ref;
    const assessmentSet = new Set<Assessment3Object>();

    Object.keys(tempModel)
      .forEach((assessmentId) => {
        const assessmentObj = tempModel[assessmentId];
        const temp = new Assessment3Object();
        const stix = new Stix();
        stix.id = assessmentObj.assessment.id;
        stix.type = assessmentObj.assessment.type;
        stix.description = assessmentObj.assessment.description || '';
        stix.name = assessmentObj.assessment.name;
        stix.created_by_ref = assessmentObj.assessment.created_by_ref;
        temp.stix = stix;
        temp.questions = [];
        // if (assessmentObj.measurements !== undefined) {
        //   temp.questions = assessmentObj.measurements
        //     .filter((measurement) => {
        //       return measurement.selected_value && measurement.selected_value.risk >= 0;
        //     });
        // }
        // temp.risk = temp.questions
        //   .map((question) => question.risk)
        //   .reduce((prev, cur) => (prev += cur), 0) / temp.questions.length;
        assessmentSet.add(temp);
      });

    assessment['assessment_objects'] = Array.from(assessmentSet);
    return assessment;
  }

  /*
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
        .map((name) => this.categories[name])
        .filter((el) => el !== undefined)
        .map((el) => el.scoresModel)
        .filter((el) => el !== undefined)
        .map((el) => this.generateBaselineAssessment(el, this.meta))
      this.wizardStore.dispatch(new SaveAssessment(assessments));
    }
  }
}
