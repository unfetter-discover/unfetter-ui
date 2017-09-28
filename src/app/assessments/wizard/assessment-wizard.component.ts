import {
  Component,
  ViewChild,
  Input,
  OnInit,
  SimpleChanges,
  ChangeDetectorRef,
  ViewEncapsulation,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { Measurements } from './measurements';
import { Constance } from '../../utils/constance';
import { AssessmentsService } from '../assessments.service';
import { GenericApi } from '../../global/services/genericapi.service';
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'assessment',
  templateUrl: './assessment-wizard.component.html',
  // encapsulation: ViewEncapsulation.None,
  styleUrls: [`./assessment-wizard.component.css`]
})
export class AssessmentComponent extends Measurements implements OnInit, OnDestroy {
  public model: any;
  public assessmentDescription = '';
  public saved = false;
  public publishDate = new Date();
  public buttonLabel = 'Next';
  public navigations = [];
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
  public description = `An Assessment is your evaluation of the implementations of your network.  You will rate your environment
  ' to the best of your ability. On the final page of the survey, you will be asked to enter a name for the report and a description.
  Unfetter Discover will use the survey to help you understand your gaps, how important they are and which should be addressed.
  You may create multiple reports to see how your risk is changed when implementing different security processes.`;
  public pageIcon = Constance.REPORTS_ICON;
  public pageTitle = 'Assessments';
  public showSummarry = false;
  public assessmentName = '';
  public currentAssessmentGroup = {} as any;
  public selectedRisk = '1';
  public defaultValue = -1;
  public page = 1;
  private assessments = [];
  private groupings = [];
  private assessmentGroups: any;
  private defaultMeasurement = 'Nothing';
  private url: string;
  private readonly subscriptions = [];

  constructor(private genericApi: GenericApi, private snackBar: MdSnackBar,
              private location: Location, private route: ActivatedRoute) {
    super();
  }

  /**
   * @description
   *  initializes this component, fetchs data to build page
   */
  public ngOnInit(): void {
    const type = this.route.snapshot.paramMap.get('type');
    const id = this.route.snapshot.paramMap.get('id');
    this.url = this.generateUrl(type) + '?metaproperties=true';
    const logErr = (err) => console.log(err);
    const sub1 = this.genericApi.get(this.url)
      .subscribe((data) => {
        this.build(data);
        if (id) {
          this.url = 'api/x-unfetter-assessments';
          const sub2 = this.genericApi.get(this.url, id)
            .subscribe((res) => {
              this.model = res;
              if (this.model.attributes.created !== undefined) {
                this.publishDate = new Date(this.model.attributes.created);
              }
              this.selectedRiskValue = null;
              this.updateChart();
            }, logErr);
          this.subscriptions.push(sub2);
        }
      }, logErr);

    this.subscriptions.push(sub1);
  }

  /**
   * @description
   *  cleans up this component, unsubscribes to data
   */
  public ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public set selectedRiskValue(measurement: any) {
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
          m.risk = question ? question.risk : 1;
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
  private tempModel = {}
  public updateRisks(option: any, measurement: any, assessment: any): void {
    const newRisk = option.selected.value ;
    // update measurement value in assessments
    const assessmentMeasurementToUpdate = assessment.measurements.find((assMes) => assMes.name === measurement.name);
    // assessmentMeasurementToUpdate.risk = newRisk;
    this.updateQuestionRisk(assessmentMeasurementToUpdate, newRisk);

    if (!this.model) {
      if(!this.tempModel[assessment.id]) {
        this.tempModel[assessment.id] = {assessment: '', measurements: []};
      }
      this.tempModel[assessment.id].assessment= assessment;
      this.tempModel[assessment.id].measurements = this.tempModel[assessment.id].measurements.filter((m) => {
          return m.name !== assessmentMeasurementToUpdate.name;
      });
      this.tempModel[assessment.id].measurements.push(assessmentMeasurementToUpdate);
      // this.tempModel[assessment.id].push(assessmentMeasurementToUpdate);
    }

    // calculate risk of all measurements
    if (newRisk < 0) {
      assessmentMeasurementToUpdate.risk = 1;
    }
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
          }
        };
        this.model.attributes.assessment_objects.push(assessment_object);
     }
      let question = assessment_object.questions.find((q) => q.name === measurement.name);
      if (!question) {
        question = measurement;
        //   name:  measurement.name,
        //   risk: newRisk,
        //   options: measurement.options,
        //   selected_value: { name: measurement.selected_value.name, risk: newRisk }
        // }
        assessment_object.questions.push(question);
      } else {
        this.updateQuestionRisk(question, newRisk);
      }

      assessment_object.risk = assessment.risk;

      // assessment_object.risk = groupRisk;
      // question.risk = option.selected.value.risk;
      // question.selected_value = option.selected.value;
    }
    this.updateChart();
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
    this.showSummarry = false;
    this.currentAssessmentGroup = this.assessmentGroup;
    this.pageTitle = this.splitTitle();
    this.selectedRiskValue = null;
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
      this.saveAssessments();
    } else {
      if (this.page + 1 > this.assessmentGroups.length) {
        this.page = this.page + 1;
        this.pageTitle = ' Assessment Summary';
        this.currentAssessmentGroup = null;
        this.showSummarry = true;
        this.buttonLabel = 'Save';
        if (this.model) {
          this.assessmentName = this.model.attributes.name;
          this.assessmentDescription = this.model.attributes.description;
        }
      } else {
        this.page = this.page + 1;
        this.currentAssessmentGroup = this.assessmentGroup;
        this.pageTitle = this.splitTitle();
        this.selectedRiskValue = null;
        this.updateChart();
      }
    }
  }

  public selectedValue(assessment: any, measurement: any, option: any): number {
    if (!this.model) {
       return option.value ? option.value : this.defaultValue;
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

  private build(data: any): void {
    if (data) {
      this.assessmentGroups = this.createAssessmentGroups(data);
      this.currentAssessmentGroup = this.assessmentGroup;
      this.pageTitle = this.splitTitle();
      this.updateChart();
    }
  }

  private get assessmentGroup(): any {
    let index = 0;
    if (this.page) {
      index = this.page - 1;
    }
    if (index >= this.assessmentGroups.length) {
      index = 0;
    }
    return this.assessmentGroups[index];
  }

  private createAssessmentGroups(assessedObjects: any[]): any[] {
    const assessmentGroups = [];
    const self = this;
    if (assessedObjects) {
      // Go through and build each item
      const assessments: any = [];
      assessedObjects.forEach((assessedObject) => {
        const assessment: any = {};
        assessment.version = '1';
        assessment.modified = new Date();
        assessment.created = new Date();

        assessment.measurements = [];
        assessment.groupings = assessedObject.attributes.groupings;
        assessment.id = assessedObject.id;
        assessment.name = assessedObject.attributes.name;
        assessment.description = assessedObject.attributes.description;
        assessment.measurements = this.buildMeasurements(assessedObject.id);
        assessment.type = assessedObject.type;

        const risk = this.getRisk(assessment.measurements);
        assessment.risk = -1;
        assessments.push(assessment);
      });
      // We do this so we can just save all the assessments later.
      this.assessments = assessments;
      this.groupings = this.buildGrouping(assessments);

      const assessmentObjectsGroups = this.doObjectGroupings(assessments);
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
    const laststep = this.navigations.length + 1;
    this.navigations.push({ label: 'Summary', page: laststep });
    return assessmentGroups;
  }

  private buildGrouping(stixObjects): any {
    const groupings = [];
    stixObjects.forEach((stixObject) => {
      const groupingStages = stixObject.groupings;
      if (!groupingStages) {
        const phaseName = 'unknown';
        if (!groupings[phaseName]) {
          const description = 'unknown description';
          groupings[phaseName] = description;
        }
      } else {
        groupingStages.forEach((groupingStage) => {
          const phaseName = groupingStage.groupingValue;
          if (!groupings[phaseName]) {
            const description = groupingStage.description;
            if (description) {
              groupings[phaseName] = description;
            } else {
              groupings[phaseName] = phaseName;
            }
          }
        });
      }
    });
    return groupings;
  }

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

  private calculateGroupRisk(): number {
    const groupRisk = this.calculateRisk(this.currentAssessmentGroup.assessments);
    const riskArray = [];
    riskArray.push(groupRisk);
    riskArray.push(1 - groupRisk);
    this.currentAssessmentGroup.risk = groupRisk;
    this.currentAssessmentGroup.riskArray = riskArray;
    return groupRisk;
  }

  private updateChart(): void {
    const chartData = this.doughnutChartData.slice();
    chartData[0].data = this.currentAssessmentGroup.riskArray;
    this.doughnutChartData = chartData;
  }

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

  private generateXUnfetterAssessment(assessmentsGroups: any) {
    const retVal: any = {};
    retVal.type = 'x-unfetter-assessment';
    retVal.name = this.assessmentName;
    retVal.description = this.assessmentDescription;
    retVal.created = this.publishDate.toISOString();
    // retVal.assessment_objects = [];
    const assessmentSet = new Set();

    Object.keys(this.tempModel).forEach(

      (assessmentId) => {
        const assessmentObj = this.tempModel[assessmentId];
        const temp: any = {};
        temp.stix = {};
        temp.stix.id = assessmentObj.assessment.id;
        temp.stix.type = assessmentObj.assessment.type;
        temp.stix.description = assessmentObj.assessment.description || '';
        temp.stix.name = assessmentObj.assessment.name;

        temp.questions = [];
        if (assessmentObj.measurements !== undefined) {
          assessmentObj.measurements.forEach((measurement) => {
            if (measurement.selected_value.risk < 0) {
              return;
            }
            temp.questions.push(measurement);
          });
        }
        temp.risk = temp.questions
        .map((question) => question.risk)
        .reduce((prev, cur) => (prev += cur), 0) / temp.questions.length;

        assessmentSet.add(JSON.stringify(temp));

      }
    )

    // assessmentsGroups.forEach((assessmentsGroup) => {
    //   if (assessmentsGroup.assessments !== undefined) {
    //     assessmentsGroup.assessments.forEach((assessment) => {
    //       if (assessment.risk < 0) {
    //         return;
    //       }
    //       const temp: any = {};
    //       temp.stix = {};
    //       temp.stix.id = assessment.id;
    //       temp.stix.type = assessment.type;
    //       temp.stix.description = assessment.description || '';
    //       temp.stix.name = assessment.name;

    //       temp.questions = [];
    //       if (assessment.measurements !== undefined) {
    //         assessment.measurements.forEach((measurement) => {
    //           if (measurement.selected_value.risk < 0) {
    //             return;
    //           }
    //           temp.questions.push(measurement);
    //         });
    //       } else {
    //         return { error: 'No measurements/questions on assessment' };
    //       }

    //       temp.risk = temp.questions
    //           .map((question) => question.risk)
    //           .reduce((prev, cur) => (prev += cur), 0) / temp.questions.length;

    //       assessmentSet.add(JSON.stringify(temp));

    //     });
    //   } else {
    //     return { error: 'No assessments in group' };
    //   }
    // });

    retVal['assessment_objects'] = Array.from(assessmentSet)
      .map((dat) => JSON.parse(dat));
    return retVal;
  }

  private saveAssessments(): void {
    this.url = 'api/x-unfetter-assessments';
    if (this.model) {
      const retVal: any = {};
      retVal.created = this.publishDate.toISOString();
      retVal.type = 'x-unfetter-assessment';
      retVal.name = this.assessmentName;
      retVal.description = this.assessmentDescription;
      retVal.assessment_objects = this.model.attributes.assessment_objects.filter(
        (assessment_object) => {
          let filter = false;
          assessment_object.questions.forEach((question) => {
             if ( question.risk >= 0 ) {
               filter = true;
             }
          });
          return filter;
        }
      );
      if (retVal.assessment_objects) {
        retVal.assessment_objects.forEach((assessment_object) => {
            assessment_object.questions = assessment_object.questions.filter((question) => {
            return question.risk >= 0
          });
        });
      }

      this.url = this.url + '/' + this.model.id;
      const sub = this.genericApi.patch(this.url, { 'data': { 'attributes': retVal } }).subscribe(
        (res) => {
          this.saved = true;
          this.location.back();
        },
        (err) => {
          console.log(err);
        },
        () => {
          sub.unsubscribe();
        }
      );
    } else {
      const xUnfetterAssessment = this.generateXUnfetterAssessment(
        this.assessmentGroups
      );
      const sub = this.genericApi.post(this.url, { 'data': { 'attributes': xUnfetterAssessment } }).subscribe(
        (res) => {
          this.saved = true;
          this.location.back();
        },
        (err) => {
          console.log(err);
        },
        () => {
          sub.unsubscribe();
        }
      );
    }
  }

  /**
   * @description
   *  take a stix object type and determine url to fetch data
   * @param {string} type
   *  string in the form of a url path
   */
  private generateUrl(type = ''): string {
    let url = '';
    switch (type) {
      case 'indicator': {
        url = Constance.INDICATOR_URL;
        break;
      }
      case 'mitigation': {
        url = Constance.COURSE_OF_ACTION_URL;
        break;
      }
      case 'course-of-action': {
        url = Constance.COURSE_OF_ACTION_URL;
        break;
      }
      default: {
        url = 'api/x-unfetter-sensors';
      }
    }
    return url;
  }

}
