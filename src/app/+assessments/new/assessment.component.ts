import {
  Component,
  ViewChild,
  Input,
  OnInit,
  SimpleChanges,
  ChangeDetectorRef,
  ViewEncapsulation,
  ElementRef
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
  templateUrl: './assessment.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [
    ` .btn-wrapper  {
        padding-top: 1%;
       }
      .btn-wrapper a {
        margin-right: 5px;
      }
      .margin-top-3percent {
            margin-top: 3%
      }
      . margin-top-10 {
         margin-top: 10px;
      }
        .stepper-vertical {
              margin-left: 0px;
          padding-left: 0px;
        }
  .stepper-vertical li {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    position: relative;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
}

.stepper-vertical li {
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column
}

.stepper-vertical li:not(:last-child):after {
    content: " ";
    position: absolute;
    width: 1px;
    height: -webkit-calc(100% - 40px);
    height: calc(100% - 40px);
    left: 35px;
    top: 55px;
    background-color: rgba(0,0,0,.1)
}

.stepper-vertical li a {
    -webkit-align-self: flex-start;
    -ms-flex-item-align: start;
    align-self: flex-start;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    position: relative
}

.stepper-vertical {
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between
}

.stepper-vertical, .stepper-vertical li {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    position: relative;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal
}

.stepper-vertical li.completed a .label {
    font-weight: 500;
    color: rgba(0,0,0,.87);
    font-family: Roboto,sans-serif;
}

.stepper li.active a .label, .stepper li.completed a .label {
    font-weight: 600;
    color: rgba(0,0,0,.87);
}

.stepper li a {
   padding: 10px;
    font-size: 14px;
    text-align: center;
    color: #0275d8;
    text-decoration: none;
    cursor: pointer;
}

.stepper li.active a .circle,.stepper li.completed a .circle {
    background-color: #4285F4!important
}

.stepper-vertical li a .circle {
    -webkit-box-ordinal-group: 2;
    -webkit-order: 1;
    -ms-flex-order: 1;
    order: 1;
}

.stepper li a .circle {
    display: inline-block;
    color: #fff;
    border-radius: 50%;
    background: rgba(0,0,0,.38);
    width: 24px;
    height: 24px;
    line-height: 24px;
    margin-right: 8px;
    text-align: center;
}

.stepper li a .label {
    display: inline-block;
    color: rgba(0,0,0,.38);
}

.stepper-vertical li.completed a .label {
    font-weight: 500;
}

.stepper-vertical li a .label {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-flow: column nowrap;
    -ms-flex-flow: column nowrap;
    flex-flow: column nowrap;
    -webkit-box-ordinal-group: 3;
    -webkit-order: 2;
    -ms-flex-order: 2;
    order: 2;
}

.stepper-vertical li .step-content {
    display: block;
    margin-top: 0;
    margin-left: 50px;
    padding: 0px;
    box-sizing: inherit;
}

.danger-color, .stepper li.warning a .circle {
    background-color: #f44!important;
}


    `
  ]
})
export class AssessmentComponent extends Measurements implements OnInit {
  public model: any;
  public assessmentDescription: string = '';
  public saved: boolean = false;
  public publishDate: Date = new Date();
  public buttonLabel = 'Next';
  public navigations = [];
  public item: MenuItem[];
  public doughnutChartLabels: string[] = ['Risk Accepted', 'Risk Addressed'];
  public doughnutChartData: any[] = [
    {
      data: [],
      backgroundColor: [
        Constance.COLORS.red,
        Constance.COLORS.green,
      ],
      hoverBackgroundColor: [
        Constance.COLORS.darkRed,
        Constance.COLORS.darkGreen,
      ]
    }
  ];
  public doughnutChartType: string = 'doughnut';
  public doughnutChartColors: Object[] = [{}];
  public chartOptions: Object = {
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
          allData.forEach(
              (d) => {
            total += d;
          });
          const tooltipPercentage = Math.round(tooltipData / total * 100);
          return `${tooltipLabel}: ${tooltipPercentage}%`;
        }
      }
    }
  };
  public description =  'An Assessment is your evaluation of the implementations of your network.  You will rate your environment ' +
            ' to the best of your ability.' +
            'On the final page of the survey, you will be asked to enter a name for the report and a description.  Unfetter Discover will ' +
            'use the survey to help you understand your gaps, how important they are and which should be addressed.  You may create ' +
            'multiple reports to see how your risk is changed when implementing different security processes.';
  public pageIcon = Constance.REPORTS_ICON;
  public pageTitle = 'Assessments';
  public showSummarry = false;
  public assessmentName: String = '';
  public currentAssessmentGroup: any = {};
  public selectedRisk = '1';
  public page = 1;
  private assessments: any = [];
  private killChains: any = [];
  private assessmentGroups: any;
  private defaultMeasurement = 'Nothing';
  private url: string;

  constructor(
    private genericApi: GenericApi,
    private snackBar: MdSnackBar,
    private location: Location,
    private route: ActivatedRoute,
  ) {
    super();
  }

  public ngOnInit() {
    const type = this.route.snapshot.paramMap.get('type');
    const id = this.route.snapshot.paramMap.get('id');
    switch (type) {
        case 'indicator' : {
          this.url = Constance.INDICATOR_URL;
          break;
        }
        case 'mitigation' : {
          this.url = Constance.COURSE_OF_ACTION_URL;
           break;
        }
        default: {
         this.url = 'api/x-unfetter-sensors';
        }
    }
    this.genericApi.get(this.url).subscribe(
      (data) => {
        this.build(data);
        if (id) {
          this.url = 'api/x-unfetter-assessments';
          this.genericApi.get(this.url, id).subscribe(
            (data) => {
              this.model = data;
              // console.log('this.model')
              // console.dir(this.model)
              this.selectedRiskValue = null;
              // this.calculateGroupRisk();
              this.updateChart();

            }
          );
        }
      }
    );
  }

  public set selectedRiskValue(measurement: any) {
      if (this.model) {
        // console.log('this.currentAssessmentGroup.assessments')
        // console.dir(this.currentAssessmentGroup.assessments)
        this.currentAssessmentGroup.assessments.forEach(
          (assessment) => {
            const assessment_object = this.model.attributes.assessment_objects.find(
                (assessment_object) => {
                  return assessment.id === assessment_object.stix.id;
                }
            );
            assessment.risk  = assessment_object.risk;
            // console.log('assessment_object from model')
            // console.dir(assessment_object)
            assessment.measurements.forEach(
              (m) => {
                const question = assessment_object.questions.find((q) => q.name === m.name);
                // console.log('update risk currentAssessmentGroup.assessment')
                // console.dir(question)
                m.risk = assessment_object.risk; // question.selected_value.risk
              }

            );
          }
        );
        this.calculateGroupRisk();
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
      assessedObjects.forEach(
          (assessedObject) => {
              const assessment: any = {};
              assessment.version = '1';
              assessment.modified = new Date();
              assessment.created = new Date();

              assessment.measurements = [];
              assessment.kill_chain_phases =
                assessedObject.attributes.kill_chain_phases;
              assessment.id = assessedObject.id;
              assessment.name = assessedObject.attributes.name;
              assessment.description = assessedObject.attributes.description;
              assessment.measurements = this.buildMeasurements(assessedObject.id);
              assessment.type = assessedObject.type;

              const risk = this.getRisk(assessment.measurements);
              assessment.risk = risk;
              assessments.push(assessment);
      });
      // We do this so we can just save all the assessments later.
      this.assessments = assessments;
      this.killChains = this.buildKillChain(assessments);

      const assessmentObjectsGroups = this.groupObjectsByKillPhase(assessments);
      let keys = Object.keys(assessmentObjectsGroups);
      keys = keys.sort();
      keys.forEach(
          (phaseName, index) => {
        // TODO - Need to remove the 'courseOfAction' name
        const courseOfActionGroup = assessmentObjectsGroups[phaseName];

        // This is the x-unfetter-control-assessments
        const assessmentGroup: any = {};
        assessmentGroup.name = phaseName;
        const step = (index+1);
        this.navigations.push({label: this.splitTitle(phaseName), page: step})
         this.item = this.navigations;
        // TODO: Need to get description somehow from the key phase information
        assessmentGroup.description = this.killChains[phaseName];
        assessmentGroup.assessments = courseOfActionGroup;
        assessmentGroup.risk = 1;
        const riskArray = [1, 0];
        assessmentGroup.riskArray = riskArray;
        const riskArrayLabels = ['Risk Accepted', 'Risk Addressed'];
        assessmentGroup.riskArrayLabels = riskArrayLabels;

        assessmentGroups.push(assessmentGroup);
      });
    }
    const laststep = (this.navigations.length + 1);
    this.navigations.push({label: 'Summary', page: laststep });
    return assessmentGroups;
  }

  private buildKillChain(stixObjects): any {
    const killChains = [];
    stixObjects.forEach(
        (stixObject) => {
      const killChainPhases = stixObject.kill_chain_phases;
      if (!killChainPhases) {
        const phaseName = 'unknown';
        if (!killChains[phaseName]) {
          const description = 'unknown description';
          killChains[phaseName] = description;
        }
      } else {
        killChainPhases.forEach(
            (killChainPhase) => {
          const phaseName = killChainPhase.phase_name;
          if (!killChains[phaseName]) {
            const description = killChainPhase.description;
            if (description) {
              killChains[phaseName] = description;
            } else {
              killChains[phaseName] = phaseName;
            }
          }
        });
      }
    });
    return killChains;
  }

  private groupObjectsByKillPhase(stixObjects): any {
    const hash = {};
    stixObjects.forEach(
        (stixObject) => {
      const killChainPhases = stixObject.kill_chain_phases;
      if (!killChainPhases) {
        const phaseName = 'unknown';
        let objectProxies = hash[phaseName];
        if (objectProxies === undefined) {
          objectProxies = [];
          hash[phaseName] = objectProxies;
        }
        const objectProxy = { content: stixObject };
        objectProxies.push(stixObject);
      } else {
        killChainPhases.forEach(
            (killChainPhase) => {
          const phaseName = killChainPhase.phase_name;
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

  private updateRisks(option: any, measurement: any, assessment: any): void {
    // console.dir(option)
    // console.log('option.selected.value.risk ' + option.selected.value)
    assessment.risk = option.selected.value;
    const groupRisk = this.calculateGroupRisk();
    // console.log('groupRisk ' + groupRisk)
    if (this.model) {
        const assessment_object = this.model.attributes.assessment_objects.find(
          (assessment_object) => { return assessment.id === assessment_object.stix.id; }
        );

        assessment_object.risk = groupRisk;
        const question = assessment_object.questions.find((q) => { return q.name === measurement.name});
        // console.dir(question)
        question.risk = option.selected.value.risk;
        question.selected_value = option.selected.value
        // console.dir(question)
    }
    this.updateChart();
  }

  private navigationClicked(e:any, step: number): void {
      e.preventDefault();
      e.stopP
      if (step > this.page) {
        this.page = step - 1;
        this.next();
      } else if (step < this.page) {
        this.page = step + 1;
        this.back();
      }
  }

  private back(): void {
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

  private updateChart(): void {
    const chartData = this.doughnutChartData.slice();
    chartData[0].data = this.currentAssessmentGroup.riskArray;
    this.doughnutChartData = chartData;
  }

  private next(): void {
    if (this.buttonLabel === 'Save') {
      this.saveAssessments();
    } else {
      if ((this.page + 1) > this.assessmentGroups.length) {
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

  private splitTitle(title?: string): string {
    const split = title? title.split('-') : this.currentAssessmentGroup.name.split('-');
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
    retVal.assessment_objects = [];

    assessmentsGroups.forEach(
      (assessmentsGroup) => {
        if (assessmentsGroup.assessments !== undefined) {
          assessmentsGroup.assessments.forEach(
            (assessment) => {
              const temp: any = {};

              temp.stix = {};
              temp.stix.id = assessment.id;
              temp.stix.type = assessment.type;
              temp.stix.description = assessment.description || '';
              temp.stix.name = assessment.name;

              temp.questions = [];
              if (assessment.measurements !== undefined) {
                assessment.measurements.forEach(
                  (measurement) => {
                    temp.questions.push(measurement);
                  });
              } else {
                return { error: 'No measurements/questions on assessment' };
              }

              temp.risk = temp.questions
                .map((question) => question.risk)
                .reduce((prev, cur) => prev += cur, 0)
                / temp.questions.length;

              retVal['assessment_objects'].push(temp);
          });
        } else {
          return {error: 'No assessments in group'};
        }

    });

    return retVal;
  }

  private saveAssessments(): void {
    this.url = 'api/x-unfetter-assessments';
    if (this.model) {
      const retVal: any = {};
      retVal.type = 'x-unfetter-assessment';
      retVal.name = this.assessmentName;
      retVal.description = this.assessmentDescription;
      retVal.assessment_objects = this.model.attributes.assessment_objects;
      this.url = this.url + '/' + this.model.id;
      const sub = this.genericApi.patch( this.url, retVal).subscribe(
          (res) => {
            this.saved = true;
            this.location.back();
          }, (err) => {
            console.log(err);
          }, () => {
            sub.unsubscribe();
          }
      );
    } else {
        const xUnfetterAssessment = this.generateXUnfetterAssessment(this.assessmentGroups);
        const sub = this.genericApi.post( this.url, xUnfetterAssessment).subscribe(
            (res) => {
              this.saved = true;
              this.location.back();
            }, (err) => {
              console.log(err);
            }, () => {
              sub.unsubscribe();
            }
          );
        }
    }

}
