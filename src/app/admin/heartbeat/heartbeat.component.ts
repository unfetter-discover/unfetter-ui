
import { pluck } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';

import { AdminService } from '../admin.service';
import { Heartbeat, HeartbeatStatus } from '../../global/models/heartbeat';
import { Constance } from '../../utils/constance';

@Component({
  selector: 'heartbeat',
  templateUrl: './heartbeat.component.html',
  styleUrls: ['./heartbeat.component.scss']
})
export class HeartbeatComponent implements OnInit {

  public heartbeats: Heartbeat[];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    const heartbeat$ = this.adminService.getHeartbeat().pipe(
      pluck('attributes'),
      pluck('statuses'))
      .subscribe(
        (heartbeats: Heartbeat[]) => {
          this.heartbeats = heartbeats;
        },
        (err) => {
          console.log(err);
        },
        () => {
          if (heartbeat$) {
            heartbeat$.unsubscribe();
          }
        }
      );
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
