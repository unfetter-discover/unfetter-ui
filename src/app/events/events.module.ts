import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { GlobalModule } from '../global/global.module';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events/events.component';
import { EventsContentComponent } from './events-content/events-content.component';
import { EventsEffects } from './store/events.effects';
import { EventsLayoutComponent } from './events-layout/events-layout.component';
import { EventsService } from './events.service';
import { eventsReducer } from './store/events.reducers';
import { FiltersComponent } from './filters/filters.component';
import { RelatedComponent } from './related/related.component';

@NgModule({
  imports: [
    CommonModule,
    EventsRoutingModule,
    GlobalModule,
    StoreModule.forFeature('sightings', eventsReducer),
    EffectsModule.forFeature([EventsEffects]),
  ],
  declarations: [EventsLayoutComponent, EventsComponent, EventsContentComponent, RelatedComponent, FiltersComponent],
  providers: [EventsService],
})
export class EventsModule { }
