import { Component, ChangeDetectorRef, ElementRef, ViewChild, Input, OnInit, SimpleChanges, ViewEncapsulation, OnDestroy, HostListener, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { MatSnackBar, MatSelect } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { Key } from 'ts-keycode-enum';

import * as assessActions from '../store/assess.actions';
import * as assessReducers from '../store/assess.reducers';

import { AssessmentsService } from '../assessments.service';
import { AssessmentMeta } from '../../models/assess/assessment-meta';
import { Constance } from '../../utils/constance';
import { GenericApi } from '../../core/services/genericapi.service';
import { Measurements } from './measurements';
import { MenuItem } from 'primeng/primeng';
import { LoadAssessmentWizardData, SaveAssessment } from '../store/assess.actions';
import { Assessment } from '../../models/assess/assessment';
import { Stix } from '../../models/stix/stix';
import { Indicator } from '../../models/stix/indicator';
import { JsonApiData } from '../../models/json/jsonapi-data';
import { KEY_CODE } from './key-code.enum';
import { AssessmentObject } from '../../models/assess/assessment-object';
import { AssessmentQuestion } from '../../models/assess/assessment-question';
import { WizardAssessment } from './wizard-assessment';
import { Dictionary } from '../../models/json/dictionary';

type SidePanelName = 'indicators' | 'mitigations' | 'sensors';

interface TempModel {
  [index: string]: {
    assessment: Assessment,
    measurements: AssessmentQuestion[]
  }
};

@Component({
  selector: 'unf-assess-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent extends Measurements implements OnInit, OnDestroy {

  @ViewChildren('question')
  public questions: QueryList<MatSelect>;

  public readonly defaultValue = -1;
  public readonly defaultMeasurement = 'Nothing';
  public readonly sidePanelCollapseHeight = '32px';
  public readonly sidePanelExpandedHeight = '32px';

  public model: JsonApiData<Assessment>;
  public saved = false;
  public publishDate = new Date();
  public buttonLabel = 'Next';
  public navigations: { label: string, page: number }[] = [];
  public item: MenuItem[];
  public doughnutChartLabels = ['Risk Accepted', 'Risk Addressed'];
  public doughnutChartData = [
    {
      data: [],
      backgroundColor: [Constance.COLORS.red, Constance.COLORS.green],
      hoverBackgroundColor: [
        Constance.COLORS.darkRed,
        Constance.COLORS.darkGreen
      ]
    }
  ];
  public doughnutChartType: string = 'doughnut';
  public doughnutChartColors = [{}];
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
  public currentAssessmentGroup = {} as any;
  public page = 1;
  public meta = new AssessmentMeta();
  public indicators: JsonApiData<Indicator>[];
  public sensors: JsonApiData<Stix>[];
  public mitigations: JsonApiData<Stix>[];
  public ratioOfQuestionsAnswered = 0;
  public openedSidePanel: SidePanelName;
  public insertMode = false;
  private assessments: WizardAssessment[] = [];
  private groupings = [];
  private assessmentGroups: any[];
  private tempModel: TempModel = {} as TempModel;
  private assessmentTypeGroups: Dictionary<{ tempModel: TempModel, assessmentsGroups: any[] }> = {};

  private readonly subscriptions: Subscription[] = [];
  private readonly sidePanelOrder: SidePanelName[] = ['indicators', 'mitigations', 'sensors'];

  constructor(
    private genericApi: GenericApi,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    private store: Store<assessReducers.AssessState>,
  ) {
    super();
  }

  /**
   * @description
   *  initializes this component, fetchs data to build page
   */
  public ngOnInit(): void {
    console.log('in wizard component');
    // TODO: if no id is given in url, then load in progress assessment

    const isTrue = (val: number) => val === 1;
    const includesIndicators = isTrue(+this.route.snapshot.paramMap.get('includesIndicators'));
    const includesMitigations = isTrue(+this.route.snapshot.paramMap.get('includesMitigations'));
    const includesSensors = isTrue(+this.route.snapshot.paramMap.get('includesSensors'));
    let meta: Partial<AssessmentMeta> = new AssessmentMeta();
    meta = {
      includesIndicators,
      includesMitigations,
      includesSensors,
    };

    this.store.dispatch(new LoadAssessmentWizardData(meta));

    const sub1 = this.store
      .select('assessment')
      .pluck('indicators')
      .distinctUntilChanged()
      .subscribe((arr: JsonApiData<Indicator>[]) => this.indicators = arr);

    const sub2 = this.store
      .select('assessment')
      .pluck('mitigations')
      .distinctUntilChanged()
      .subscribe((arr: JsonApiData<Stix>[]) => this.mitigations = arr);

    const sub3 = this.store
      .select('assessment')
      .pluck('sensors')
      .distinctUntilChanged()
      .subscribe((arr: JsonApiData<Stix>[]) => this.sensors = arr);

    const sub4 = this.store
      .select('assessment')
      .pluck('finishedLoading')
      .distinctUntilChanged()
      .filter((loaded: boolean) => loaded && loaded === true)
      .subscribe((loaded: boolean) => {
        this.openedSidePanel = this.determineFirstOpenSidePanel();
        this.refreshToOpenedAssessmentType();
      },
      (err) => console.log(err));

    const sub5 = this.store
      .select('assessment')
      .pluck('page')
      .distinctUntilChanged()
      .subscribe(
      (page: number) => this.page = page,
      (err) => console.log(err),
      () => sub5.unsubscribe());

    const sub6 = this.store
      .select('assessment')
      .pluck('saved')
      .distinctUntilChanged()
      .subscribe(
      (saved: boolean) => {
        this.saved = saved;
        // TODO: route the page
        // this.location.back();
      },
      (err) => console.log(err),
      () => sub6.unsubscribe());

    const sub7 = this.store
      .select('assessment')
      .pluck('assessment')
      .pluck('assessmentMeta')
      .distinctUntilChanged()
      .subscribe(
      (assessmentMeta: AssessmentMeta) => this.meta = assessmentMeta,
      (err) => console.log(err),
      () => sub7.unsubscribe());

    this.subscriptions.push(sub1, sub2, sub3, sub4);

    // this.url = this.generateUrl(type) + '?metaproperties=true';
    // const logErr = (err) => console.log(err);
    // const sub1 = this.genericApi.get(this.url)
    //   .subscribe((data) => {
    //     this.build(data);
    //     if (id) {
    //       this.url = 'api/x-unfetter-assessments';
    //       const sub2 = this.genericApi.get(this.url, id)
    //         .subscribe((res) => {
    //           this.model = res;
    //           if (this.model.attributes.created !== undefined) {
    //             this.publishDate = new Date(this.model.attributes.created);
    //           }
    //           this.setSelectedRiskValue(null);
    //           this.updateChart();
    //         }, logErr);
    //       this.subscriptions.push(sub2);
    //     }
    //   }, logErr);

  }

  /**
   * @description
   *  cleans up this component, unsubscribes to data
   */
  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  /**
   * @description find panel names with data
   * @return {SidePanelName[]}
   */
  public determinePanelsWithData(): SidePanelName[] {
    const panels = [...this.sidePanelOrder];
    const hasContents = panels.filter((name) => {
      return this[name] && this[name].length > 0;
    });
    return hasContents;
  }

  /**
   * @description
   * @return {string} name of first open side panel
   */
  public determineFirstOpenSidePanel(): SidePanelName {
    const hasContents = this.determinePanelsWithData();
    // return first panel w/ data
    return hasContents[0];
  }

  /**
   * @description
   * @return {string} name of last listed side panel
   */
  public determineNextSidePanel(): SidePanelName {
    const panels = [...this.sidePanelOrder];
    const openedIndex = panels.findIndex((el) => el === this.openedSidePanel);
    const nextPanels = panels.slice(openedIndex + 1, panels.length);
    // first panel after the currently opened
    return nextPanels[0];
  }

  /**
   * @description
   * @return {string} name of last listed side panel
   */
  public determineLastSidePanel(): SidePanelName {
    const hasContents = this.determinePanelsWithData();
    // return last panel w/ data
    return hasContents.reverse()[0];
  }

  /**
   * @description
   * @param {string} panel name
   * @param {UIEvent} event
   * @return {void}
   */
  public onOpenSidePanel(panelName: SidePanelName, event?: UIEvent): void {
    if (this.openedSidePanel && this.assessmentGroups) {
      // save current state, if needed
      this.assessmentTypeGroups[this.openedSidePanel] = { tempModel: undefined, assessmentsGroups: undefined };
      this.assessmentTypeGroups[this.openedSidePanel].assessmentsGroups = [...this.assessmentGroups];
      this.assessmentTypeGroups[this.openedSidePanel].tempModel = { ...this.tempModel };
    }

    // clear out state
    this.tempModel = { };
    this.page = 1;
    // switch to new open panel
    this.openedSidePanel = panelName;
    // reload questions
    this.refreshToOpenedAssessmentType();
    if (this.openedSidePanel && this.assessmentTypeGroups[this.openedSidePanel]) {
      // reload previous state for given type/panel if it exists
      this.assessmentGroups = [...this.assessmentTypeGroups[this.openedSidePanel].assessmentsGroups];
      this.tempModel = { ...this.assessmentTypeGroups[this.openedSidePanel].tempModel };
    }
    // reset progress bar
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
    if (this.assessmentGroups) {
      const allQuestions = this.assessmentGroups
        // flat map assessments across groups
        .map((groups) => groups.assessments)
        .reduce((assessments, memo) => memo.concat(assessments), [])
        // flat map across questions
        .map((assessments) => assessments.measurements)
        .reduce((measurements, memo) => memo.concat(measurements), []);
      const numQuestions = allQuestions.length;
      const answeredQuestions = allQuestions.filter((el) => el.risk > -1).length;
      if (answeredQuestions > 0) {
        const ratio = answeredQuestions / numQuestions;
        this.ratioOfQuestionsAnswered = Math.round(ratio * 100);
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
        Key.Zero, Key.One, Key.Two,
        Key.Three, Key.Four, Key.Five
      ];
      const index = validOptions.indexOf(event.keyCode);
      if (index > -1) {
        console.log('setting all questions to ', index);
        this.updateAllQuestions(index);
      }
      this.insertMode = false;
    } else if (event.keyCode === Key.GraveAccent) {
      this.insertMode = true;
      console.log(this.insertMode);
    }
  }

  /**
   * @description
   * @param {answerIndex}
   * @return {void}
   */
  public updateAllQuestions(answerIndex: number): void {
    if (!this.currentAssessmentGroup) {
      return;
    }

    this.currentAssessmentGroup.assessments.forEach((assessment) => {
      const measurements = assessment.measurements;
      measurements.forEach((measurement: AssessmentQuestion) => {
        const options = measurement.options;
        const index = answerIndex < options.length ? answerIndex : 0;
        const option = options[index];
        this.updateRisks({ selected: { value: option.risk } }, measurement, assessment);
        this.questions.forEach((question) => {
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
    if (this.model) {
      this.currentAssessmentGroup.assessments.forEach((assessment) => {
        const assessmentObject = this.model
          .attributes.assessment_objects.find((el) => assessment.id === el.stix.id);
        if (!assessmentObject) {
          console.warn(`assessmentObject not found! id: ${assessment.id}, moving on...`);
          return;
        }
        assessment.risk = assessmentObject.risk;
        assessment.measurements.forEach((m) => {
          const question = assessmentObject.questions.find((q) => q.name === m.name);
          if (question) {
            m.risk = question.risk;
          }
        });

      });
      this.calculateGroupRisk();
    } else {
      this.calculateGroupRisk();
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
      this.next();
    } else if (step < this.page) {
      this.page = step + 1;
      this.back();
    }
  }

  /**
   * @description update riskss
   * @param option
   * @param measurement
   * @param assessment
   * @returns {void}
   */
  public updateRisks(option: any, measurement: AssessmentQuestion, assessment: any): void {
    const newRisk = option.selected.value;
    // update measurement value in assessments
    const assessmentMeasurementToUpdate = assessment.measurements
      .find((measure) => measure.name === measurement.name);
    this.updateQuestionRisk(assessmentMeasurementToUpdate, newRisk);
    // we need a temp model to hold selected question
    if (!this.model) {
      if (!this.tempModel[assessment.id]) {
        this.tempModel[assessment.id] = { assessment: new Assessment(), measurements: [] };
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
        } as AssessmentObject;
        this.model.attributes.assessment_objects.push(assessment_object);
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
  }

  /**
   * @description clicked back a page
   * @param {UIEvent} event optional
   * @returns {void}
   */
  public back(event?: UIEvent): void {
    if (event) {
      event.preventDefault();
    }

    if (this.page === 1) {
      return;
    }
    this.page = this.page - 1;
    this.buttonLabel = 'Next';
    this.showSummary = false;
    this.currentAssessmentGroup = this.getAssessmentGroup();
    this.setSelectedRiskValue();
    this.updateChart();
  }

  /**
   * @description clicked next page
   * @param {UIEvent} event optional
   * @return {void}
   */
  public next(event?: UIEvent): void {
    if (event) {
      event.preventDefault();
    }

    if (this.buttonLabel === 'Save') {
      // we came from the Save page
      //  save every of the things
      this.saveAssessments();
      return;
    }

    // last page for this assessment type
    if (this.page + 1 > this.assessmentGroups.length) {
      const lastPanel = this.determineLastSidePanel();
      if (this.openedSidePanel !== lastPanel) {
        // last page but not last assessment type
        //  advance the assessment type
        const nextPanel = this.determineNextSidePanel();
        this.onOpenSidePanel(nextPanel);
      } else {
        // this is the last page of the last assessment type
        //  show Save page
        this.page = this.page + 1;
        this.currentAssessmentGroup = null;
        this.showSummary = true;
        this.buttonLabel = 'Save';
      }
    } else {
      // advance to next section within a given assessment type
      this.page = this.page + 1;
      this.currentAssessmentGroup = this.getAssessmentGroup();
      this.setSelectedRiskValue();
      this.updateChart();
    }
  }

  /**
   * @description
   * @param measurement 
   * @param option 
   * @param {Assessment} assessment - optional
   * @return {number}
   */
  public selectedValue(measurement: any, option: any, assessment?: Assessment): number {
    if (!this.model) {
      if (this.tempModel) {
        if (this.tempModel[assessment.id]) {
          const found = this.tempModel[assessment.id].measurements.find((m) => { return m.name === measurement.name; });
          return found ? found.risk : this.defaultValue;
        } else {
          return option.value ? option.value : this.defaultValue;
        }
      } else {
        return option.value ? option.value : this.defaultValue;
      }
    } else {
      let a = this.model.attributes.assessment_objects.find(
        (assessment_objects) => {
          return assessment_objects.stix.id === assessment.id;
        }
      );
      if (!a) {
        return this.defaultValue;
      } else {
        const q = a.questions.find((question) => {
          return question.name === measurement.name;
        });
        return q && q.selected_value ? q.selected_value.risk : this.defaultValue;
      }
    }
  }

  /**
   * @description build page and refresh chart
   * @param data 
   * @return {void}
   */
  private build(data?: JsonApiData<Stix>[]): void {
    if (!data) {
      return;
    }

    this.assessmentGroups = this.createAssessmentGroups(data);
    this.currentAssessmentGroup = this.getAssessmentGroup();
    this.updateChart();
  }

  /**
   * @description
   * @param {void}
   * @return {any}
   */
  private getAssessmentGroup(): any {
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
   * @description
   * @param {JsonApiData<Stix>[]}
   * @return {any[]}
   */
  private createAssessmentGroups(assessedObjects: JsonApiData<Stix>[]): any[] {
    const assessmentGroups = [];
    const self = this;

    if (assessedObjects) {
      // Go through and build each assessment
      // We do this so we can just save all the assessments later.
      this.assessments = assessedObjects
        .map((el) => el.attributes)
        .map((assessedObject) => {
          const assessment = new WizardAssessment();
          if (assessedObject.metaProperties && assessedObject.metaProperties.groupings) {
            assessment.groupings = assessedObject.metaProperties.groupings;
          }
          assessment.id = assessedObject.id;
          assessment.name = assessedObject.name;
          assessment.description = assessedObject.description;
          assessment.measurements = this.buildMeasurements(assessedObject.id);
          assessment.type = assessedObject.type;
          const risk = this.getRisk(assessment.measurements);
          assessment.risk = -1;
          return assessment;
        });
      this.groupings = this.buildGrouping(this.assessments);

      const assessmentObjectsGroups = this.doObjectGroupings(this.assessments);
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
          page: step
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

    if (this.openedSidePanel === this.determineLastSidePanel()) {
      const laststep = this.navigations.length + 1;
      this.navigations.push({ label: 'Summary', page: laststep });
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

  /**
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

  /**
   * @description
   * @return {number}
   */
  private calculateGroupRisk(): number {
    const groupRisk = this.calculateRisk(this.currentAssessmentGroup.assessments);
    const riskArray = [];
    riskArray.push(groupRisk);
    riskArray.push(1 - groupRisk);
    this.currentAssessmentGroup.risk = groupRisk;
    this.currentAssessmentGroup.riskArray = riskArray;
    return groupRisk;
  }

  /**
   * @description update the chart data
   * @return {void}
   */
  private updateChart(): void {
    const chartData = this.doughnutChartData.slice();
    chartData[0].data = this.currentAssessmentGroup
      ? this.currentAssessmentGroup.riskArray : [];
    this.doughnutChartData = chartData;
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
  private generateXUnfetterAssessment(tempModel: TempModel, assessmentMeta: AssessmentMeta): Assessment {
    const assessment = new Assessment();
    assessment.assessmentMeta = assessmentMeta;
    assessment.name = this.meta.title;
    assessment.description = this.meta.description;
    assessment.created = this.publishDate.toISOString();
    const assessmentSet = new Set<AssessmentObject>();

    Object.keys(tempModel)
      .forEach((assessmentId) => {
        const assessmentObj = tempModel[assessmentId];
        const temp = new AssessmentObject();
        const stix = new Stix();
        stix.id = assessmentObj.assessment.id;
        stix.type = assessmentObj.assessment.type;
        stix.description = assessmentObj.assessment.description || '';
        stix.name = assessmentObj.assessment.name;
        temp.stix = stix;
        temp.questions = [];
        if (assessmentObj.measurements !== undefined) {
          temp.questions = assessmentObj.measurements
            .filter((measurement) => {
              return measurement.selected_value && measurement.selected_value.risk >= 0;
            });
        }
        temp.risk = temp.questions
          .map((question) => question.risk)
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
      const assessment = new Assessment();
      assessment.assessmentMeta = this.meta;
      assessment.created = this.publishDate.toISOString();
      assessment.name = this.meta.title;
      assessment.description = this.meta.description;
      assessment.assessment_objects = this.model.attributes
        .assessment_objects
        // grab and only save objects that have an answered question
        .filter((assessment_object) => {
          return assessment_object.questions.findIndex((question) => question.risk >= 0) > -1;
        });
      if (assessment.assessment_objects) {
        assessment.assessment_objects.forEach((assessment_object) => {
          assessment_object.questions = assessment_object.questions
            .filter((question) => question.risk >= 0);
        });
      }
      this.store.dispatch(new SaveAssessment([assessment]));
    } else {
      const assessments = this.sidePanelOrder
        .map((name) => this.assessmentTypeGroups[name])
        .filter((el) => el !== undefined)
        .map((el) => el.tempModel)
        .filter((el) => el !== undefined)
        .map((el) => this.generateXUnfetterAssessment(el, this.meta))
      this.store.dispatch(new SaveAssessment(assessments));
    }
  }

}
