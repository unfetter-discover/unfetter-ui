import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
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
