
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { CheckboxModule } from 'primeng/primeng';
import { Observable } from 'rxjs/Observable';
import { MdDialog, MdDialogRef, MdSnackBar } from '@angular/material';
import { BaseComponentService } from '../components/base-service.component';
import { Constance } from '../utils/constance';
import { IntrusionSetComponent } from '../intrusion-set/intrusion-set.component';
import { StixService } from '../settings/stix.service';
import { BaseStixService } from '../settings/base-stix.service';
import { IntrusionSet } from '../models';
import * as Ps from 'perfect-scrollbar';

@Component({
  selector: 'intrusion-set-dashboard',
  templateUrl: 'intrusion-set-dashboard.component.html',
})

export class IntrusionSetDashboardComponent implements OnInit {
  private selectedIntrusionSet = [];
  private duration = 3000;
  private intrusionSet: IntrusionSet;
  private results: any[];
  private intrusionSets: any[] = [];
  private intrusionSetsDashboard = {};
  private graphMetaData = {ditems: [], killChainPhase: [], themes: []};
  private treeData: any;

  constructor(
    protected service: StixService,
    protected baseService: BaseComponentService,
    protected snackBar: MdSnackBar) {
  }

  public ngOnInit() {
    this.service.url = Constance.INTRUSION_SET_URL;
    let filter = 'sort=' + encodeURIComponent(JSON.stringify({ name: '1' }));
    this.service.load(filter).subscribe(
      (data) => {
        this.intrusionSets = data;
      }, (error) => {
        // handle errors here
        console.log('error ' + error);
      }
    );
  }

  private calPercentage(part: number, whole: number): number {
    return Math.round((part / whole) * 100);
  }
  private select(intrusionSet: IntrusionSet, isAutoComplete?: boolean): void {
      let found = this.selectedIntrusionSet.find(
        (i) => {
          return intrusionSet.id === i.id;
        }
      );
      if (found) {
        if (!isAutoComplete) {
          this.selectedIntrusionSet = this.selectedIntrusionSet.filter(
            (i) => {
                return intrusionSet.id !== i.id;
            }
          );
        }
      } else {
        this.selectedIntrusionSet.push(intrusionSet);
      }
  }

  private searchIntrusionSets(): void {
    let ids = [];
    this.selectedIntrusionSet.forEach(
      (intrusionSet) => {
          ids.push(intrusionSet.id);
      }
    );
    let url = 'api/dashboards/intrusionSetView?intrusionSetIds=' + ids.join();
    this.service.getByUrl(url).subscribe(
      (data: any) => {
        this.color(data);
        this.intrusionSetsDashboard = data;
        // this.buildMetaData();
        this.treeData = null;
        this.buildTreeData();
        setTimeout(() => {
          // let container = document.getElementsByClassName('carousel-content-wrapper');
          // for (let element in container) {
          //    Ps.initialize(element as any);
          // }
        }, 5000);
    });
  }

  private buildTreeData(): void {
      let root = {name: '', type: 'root', children: []};
      this.intrusionSetsDashboard['intrusionSets'].forEach(
        (intrusionSet) => {
          let child = {name: intrusionSet.name , type: intrusionSet.type, color: intrusionSet.color, description: intrusionSet.description};
          this.intrusionSetsDashboard['killChainPhases'].forEach(
              (killChainPhase) => {
                let killChainPhaseChild = null;
                killChainPhase.attack_patterns.forEach(
                  (attack_pattern) => {
                    attack_pattern.intrusion_sets.forEach(
                      (intrusion_set) => {
                        if (intrusionSet.name === intrusion_set.name) {
                            killChainPhaseChild = killChainPhaseChild ? killChainPhaseChild : {name: killChainPhase.name , type: 'kill_chain_phase', color: intrusionSet.color, children: []};
                            let attackPatternChild  = {type: 'attack-pattern', name: attack_pattern.name, color: intrusionSet.color, description: attack_pattern.description};
                            killChainPhaseChild.children.push(attackPatternChild);
                            this.intrusionSetsDashboard['coursesOfAction'].forEach(
                              (coursesOfAction) => {
                                  let found = coursesOfAction.attack_patterns.find(
                                    (attack) => {
                                      return attack._id === attack_pattern._id;
                                    }
                                  );
                                  if (found) {
                                    let coursesOfActionChild  = { type: 'course-of-action', name: coursesOfAction.name, description: coursesOfAction.description, color: intrusionSet.color};
                                    if (!attackPatternChild['children']) {
                                      attackPatternChild['children'] = [];
                                    }
                                    attackPatternChild['children'].push(coursesOfActionChild);
                                  }
                              }
                            );
                        }
                    });
                });
                if (killChainPhaseChild ) {
                  child['children'] = child['children'] ? child['children'] : [];
                  child['children'].push(killChainPhaseChild);
                }

          });
          root.children.push(child);
        });
      this.treeData = root;
  }

  private getCsc(data: any): any {
    let cscObject = {};
    let children = data.children ? data.children : data._children;
    if (children) {
        children.forEach((child) => {

          let c = child._children ? child._children : child.children;
          c.forEach(
            (attack_pattern) => {
              let courseOfActionChildren = attack_pattern._children ? attack_pattern._children : attack_pattern.children;
              if (courseOfActionChildren) {
                  courseOfActionChildren.forEach(
                    (courseOfAction) => {
                      if (!cscObject[courseOfAction.name]) {
                        cscObject[courseOfAction.name] = {attackPatterns: [], name: courseOfAction.name, description: courseOfAction.description};
                      }
                      cscObject[courseOfAction.name].attackPatterns.push(attack_pattern.name);
                    }
                );
              }
            }
          );
        });
    }
    let cscList = [];
    Object.keys(cscObject).forEach(
      (key) => {
          cscList.push(cscObject[key]);
      }
    );

    return cscList;
  }

  private buildMetaData(): void {
    this.graphMetaData.ditems = [];
    this.graphMetaData.killChainPhase = [];
    let ditems = [];
    let group = 1;
    let count = 0;
    let c = 0;
    this.selectedIntrusionSet.forEach(
      (intrusionSet) => {
        let links = [];
        this.intrusionSetsDashboard['killChainPhases'].forEach (
          (killChainPhase) => {
            if ( (c % 2) === 0 && c > 0 ) {
              group = group + 1;
            }
            this.graphMetaData.killChainPhase.push({name: killChainPhase.name, group: '{group}'});
            c++;
            killChainPhase.attack_patterns.forEach (
              (attack_pattern) => {
                attack_pattern.intrusion_sets.forEach(
                  (i) => {
                    if (intrusionSet.attributes.name === i.name) {
                      let found = links.find((name) => {
                          return  name === killChainPhase.name;
                      });
                      if (!found) {
                        links.push(killChainPhase.name);
                      }
                    }
                  }
                );
              }
            );
          }
        );

        let item = {
                type: 'ditem',
                name: intrusionSet.attributes.name,
                description: intrusionSet.attributes.description,
                ditem: count,
                date: intrusionSet.attributes.created,
                slug: 'ditem-' + intrusionSet.id + '-' + intrusionSet.attributes.name,
                links: '{links}'
        };
        count++;
        this.graphMetaData.ditems.push(item);
      }
    );
  }

  private search(event) {
        this.results = [];
        this.intrusionSets.filter(
          (intrusionSet) => {
              return intrusionSet.attributes.name.toLowerCase().indexOf(event.query.toLowerCase()) >= 0;
          }
        ).forEach(
          (intrusionSet) => {
              this.results.push({ id: intrusionSet.id, name: intrusionSet.attributes.name });
          }
        );
  }

  private remove(event: any, intrusionSet: any): void {
       event.preventDefault();
       this.selectedIntrusionSet = this.selectedIntrusionSet.filter(
         (i) => {
           return i.id !== intrusionSet.id;
         }
       );
       intrusionSet.checked = false;
  }

  private removeAll(event): void {
    event.preventDefault();
    this.selectedIntrusionSet.forEach(
      (intrusionSet) => {
        this.remove(event, intrusionSet);
      }
    );
  }

  private onSelect(event): void {
      let intrusionSet = this.intrusionSets.find(
        (i) => {
          return i.id === event.id;
        }
      );
      intrusionSet.checked = true;
      this.select(intrusionSet, true);
  }

  private hexToRgb(hex): any {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  }

  private color(data: string): void {
    data['killChainPhases'].forEach(
      (killChainPhase) => {
        killChainPhase.attack_patterns.forEach(
          (attack_pattern) => {
              let found = data['intrusionSets'].find(
                (intrusionSet) => {
                  let f = intrusionSet.attack_patterns.find(
                    (pattern) => {
                      let back = '#FFFFFF';
                      let fore = '#000000';
                      if (pattern._id === attack_pattern._id) {
                        let rgb: any = {};
                        if (attack_pattern.intrusion_sets.length > 0 ) {
                            back = attack_pattern.intrusion_sets[0].color;
                            rgb = this.hexToRgb(attack_pattern.intrusion_sets[0].color);
                        } else {
                            rgb = this.hexToRgb('#FFFFFF');
                        }
                        // let rgb = attack_pattern.intrusion_sets.lenght > 0 ? this.hexToRgb(attack_pattern.intrusion_sets[0].color) : this.hexToRgb('#FFFFFF')
                        // [255, 0, 0];
                       // randomly update
                        // rgb[0] = Math.round(Math.random() * 255);
                        // rgb[1] = Math.round(Math.random() * 255);
                        // rgb[2] = Math.round(Math.random() * 255);

                        // http://www.w3.org/TR/AERT#color-contrast
                        let o = Math.round(((parseInt(rgb.r, 10) * 299) +
                                            (parseInt(rgb.g, 10) * 587) +
                                            (parseInt(rgb.b, 10) * 114)) / 1000);
                        fore = (o > 125) ? 'black' : 'white';
                        // let back = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
                        attack_pattern.back = back; // '#'+ Math.floor(Math.random()*16777215).toString(16);
                        attack_pattern.fore = fore;
                      } else {
                        attack_pattern.back = back;
                        attack_pattern.fore = fore;
                      }
                      return pattern._id === attack_pattern._id;
                    }
                  );
                  return f ? true : false;
                }
              );
          }
        );
      }
    );
  }
}
