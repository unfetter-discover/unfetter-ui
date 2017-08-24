import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef
} from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { Measurements } from './measurements';
import { Constance } from '../../utils/constance';
import { AssessmentsService } from '../assessments.service';

@Component({
  selector: 'assessment',
  templateUrl: './assessment.component.html',
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
    `
  ]
})
export class AssessmentComponent extends Measurements implements OnChanges {
  @Input() public model: any[];
  @Input() public description: string;
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
          let allData = data.datasets[tooltipItem.datasetIndex].data;
          let tooltipLabel = data.labels[tooltipItem.index];
          let tooltipData = allData[tooltipItem.index];
          let total = 0;
          allData.forEach(
              (d) => {
            total += d;
          });
          let tooltipPercentage = Math.round(tooltipData / total * 100);
          return `${tooltipLabel}: ${tooltipPercentage}%`;
        }
      }
    }
  };
  private pageIcon = Constance.REPORTS_ICON;
  private pageTitle = 'Assessments';
  private assessments: any = [];
  private killChains: any = [];
  private assessmentGroups: any;
  private currentAssessmentGroup: any = {};
  private page = 1;
  private defaultMeasurement = 'Nothing';
  private showSummarry = false;
  private buttonLabel = 'Next';
  private assessmentName: String = '';
  private assessmentDescription: String = '';
  private saved: boolean = false;
  private publishDate: Date = new Date();

  constructor(
    private assessmentsService: AssessmentsService,
    private snackBar: MdSnackBar,
    private location: Location,
  ) {
    super();
  }

  public ngOnChanges(changes: SimpleChanges): void {
      console.log('changes');
      let data = changes['model'].currentValue;
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
    let assessmentGroups = [];
    let self = this;
    if (assessedObjects) {
      // Go through and build each item
      let assessments: any = [];
      assessedObjects.forEach(
          (assessedObject) => {
        let assessment: any = {};
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

        let risk = this.getRisk(assessment.measurements);
        assessment.risk = risk;
        assessments.push(assessment);
      });
      // We do this so we can just save all the assessments later.
      this.assessments = assessments;
      this.killChains = this.buildKillChain(assessments);

      let assessmentObjectsGroups = this.groupObjectsByKillPhase(assessments);
      let keys = Object.keys(assessmentObjectsGroups);
      keys = keys.sort();
      keys.forEach(
          (phaseName) => {
        // TODO - Need to remove the 'courseOfAction' name
        let courseOfActionGroup = assessmentObjectsGroups[phaseName];

        // This is the x-unfetter-control-assessments
        let assessmentGroup: any = {};
        assessmentGroup.name = phaseName;
        // TODO: Need to get description somehow from the key phase information
        assessmentGroup.description = this.killChains[phaseName];
        assessmentGroup.assessments = courseOfActionGroup;
        assessmentGroup.risk = 1;
        let riskArray = [1, 0];
        assessmentGroup.riskArray = riskArray;
        let riskArrayLabels = ['Risk Accepted', 'Risk Addressed'];
        assessmentGroup.riskArrayLabels = riskArrayLabels;

        assessmentGroups.push(assessmentGroup);
      });
    }
    return assessmentGroups;
  }

  private buildKillChain(stixObjects): any {
    let killChains = [];
    stixObjects.forEach(
        (stixObject) => {
      let killChainPhases = stixObject.kill_chain_phases;
      if (!killChainPhases) {
        let phaseName = 'unknown';
        if (!killChains[phaseName]) {
          let description = 'unknown description';
          killChains[phaseName] = description;
        }
      } else {
        killChainPhases.forEach(
            (killChainPhase) => {
          let phaseName = killChainPhase.phase_name;
          if (!killChains[phaseName]) {
            let description = killChainPhase.description;
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
    let hash = {};
    stixObjects.forEach(
        (stixObject) => {
      let killChainPhases = stixObject.kill_chain_phases;
      if (!killChainPhases) {
        let phaseName = 'unknown';
        let objectProxies = hash[phaseName];
        if (objectProxies === undefined) {
          objectProxies = [];
          hash[phaseName] = objectProxies;
        }
        let objectProxy = { content: stixObject };
        objectProxies.push(stixObject);
      } else {
        killChainPhases.forEach(
            (killChainPhase) => {
          let phaseName = killChainPhase.phase_name;
          let objectProxies = hash[phaseName];
          if (objectProxies === undefined) {
            objectProxies = [];
            hash[phaseName] = objectProxies;
          }
          let objectProxy = {
            content: stixObject
          };

          objectProxies.push(stixObject);
        });
      }
    });

    return hash;
  }

  private updateRisks(measurement: any, assessment: any): void {
    assessment.risk = measurement.risk;
    let groupRisk = this.calculateRisk(this.currentAssessmentGroup.assessments);
    let riskArray = [];
    riskArray.push(groupRisk);
    riskArray.push(1 - groupRisk);
    this.currentAssessmentGroup.risk = groupRisk;
    this.currentAssessmentGroup.riskArray = riskArray;
    this.updateChart();
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
    this.updateChart();
  }

  private updateChart(): void {
    let chartData = this.doughnutChartData.slice();
    chartData[0].data = this.currentAssessmentGroup.riskArray;
    this.doughnutChartData = chartData;
  }

  private next(): void {
    if (this.buttonLabel === 'Save') {
      this.saveAssessments();
    } else {
      if (this.page + 1 >= this.assessmentGroups.length) {
        this.pageTitle = ' Assessment Summary';
        this.currentAssessmentGroup = null;
        this.showSummarry = true;
        this.buttonLabel = 'Save';
      } else {
        this.page = this.page + 1;
        this.currentAssessmentGroup = this.assessmentGroup;
        this.pageTitle = this.splitTitle();
        this.updateChart();
      }
    }
  }

  private splitTitle(): string {
    let split = this.currentAssessmentGroup.name.split('-');
    for (let i = 0; i < split.length; i++) {
      let s = split[i];
      s = s.charAt(0).toUpperCase() + s.slice(1);
      split[i] = s;
    }
    return split.join(' ');
  }

  private generateXUnfetterAssessment(assessmentsGroups: any) {
    let retVal: any = {};
    retVal.type = 'x-unfetter-assessment';
    retVal.name = this.assessmentName;
    retVal.description = this.assessmentDescription;
    retVal.assessment_objects = [];

    assessmentsGroups.forEach(
      (assessmentsGroup) => {
        if (assessmentsGroup.assessments !== undefined) {
          assessmentsGroup.assessments.forEach(
            (assessment) => {
              let temp: any = {};

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
    let xUnfetterAssessment = this.generateXUnfetterAssessment(this.assessmentGroups);
    this.assessmentsService.url = 'api/x-unfetter-assessments';
    let sub = this.assessmentsService.save(xUnfetterAssessment).subscribe(
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
