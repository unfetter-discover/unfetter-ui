
import { pluck } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { AdminService } from '../admin.service';
import { Heartbeat, HeartbeatStatus } from '../../global/models/heartbeat';
import { Constance } from '../../utils/constance';
import { Subscription } from 'rxjs';

@Component({
  selector: 'heartbeat',
  templateUrl: './heartbeat.component.html',
  styleUrls: ['./heartbeat.component.scss']
})
export class HeartbeatComponent implements OnInit, OnDestroy {

  public heartbeats: Heartbeat[];

  private subscriptions: Subscription[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    const heartbeat$ = this.adminService.getHeartbeat()
      .pipe(
        pluck('attributes'),
        pluck('statuses')
      )
      .subscribe(
        (heartbeats: Heartbeat[]) => this.heartbeats = heartbeats,
        (err) => console.log(err)
      );
    this.subscriptions.push(heartbeat$);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub$ => sub$.unsubscribe());
  }

  public getStatusColor(status: HeartbeatStatus) {
    switch (status) {
      case HeartbeatStatus.RUNNING:
        return Constance.COLORS.green;
      case HeartbeatStatus.DOWN:
        return Constance.COLORS.red;
      default:
        return Constance.COLORS.yellow;
    }
  }
}
