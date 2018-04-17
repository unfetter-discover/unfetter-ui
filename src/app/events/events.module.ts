import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ChartsModule } from 'ng2-charts';
import { GlobalModule } from '../global/global.module';
import { EventsContentComponent } from './events-content/events-content.component';
import { EventsLayoutComponent } from './events-layout/events-layout.component';
import { EventsRoutingModule } from './events-routing.module';
import { EventsService } from './events.service';
import { EventsComponent } from './events/events.component';
import { FiltersComponent } from './filters/filters.component';
import { RelatedComponent } from './related/related.component';
import { EventsEffects } from './store/events.effects';
import { eventsReducer } from './store/events.reducers';
import { IPGeoService } from './ipgeo.service';
import { MatSortModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    EventsRoutingModule,
    GlobalModule,
    StoreModule.forFeature('sightingsGroup', eventsReducer),
    EffectsModule.forFeature([EventsEffects]),
    ChartsModule,
    MatSortModule,
  ],
  declarations: [EventsLayoutComponent, EventsComponent, EventsContentComponent, RelatedComponent, FiltersComponent],
  providers: [EventsService, IPGeoService, DatePipe],
})
export class EventsModule { }
