// Vendor
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule, MatChipsModule, MatTooltipModule, MatCardModule,
    MatTabsModule, MatInputModule, MatIconModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule, MatListModule, MatStepperModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';

// Modules
import { routing } from './indicator-sharing-routing.module';
import { GlobalModule } from '../global/global.module';

// Services
import { IndicatorSharingService } from './indicator-sharing.service';

// Other
import { indicatorSharingReducer } from './store/indicator-sharing.reducers';

// Components
import { IndicatorSharingLayoutComponent } from './indicator-sharing-layout/indicator-sharing-layout.component';
import { IndicatorSharingListComponent } from './indicator-sharing-list/indicator-sharing-list.component';
import { IndicatorCardComponent } from './indicator-card/indicator-card.component';
import { AddIndicatorComponent } from './add-indicator/add-indicator.component.ts';
import { IndicatorSharingSearchComponent } from './indicator-sharing-search/indicator-sharing-search.component';

const matModules = [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatTabsModule,
    MatTooltipModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatRadioModule, 
    MatListModule,
    MatStepperModule
];

@NgModule({
    imports: [
        CommonModule,
        routing,
        GlobalModule,
        FormsModule,
        ReactiveFormsModule,
        ...matModules,
        StoreModule.forFeature('indicatorSharing', indicatorSharingReducer)
    ],
    exports: [],
    declarations: [
        IndicatorSharingLayoutComponent,
        IndicatorSharingListComponent,
        IndicatorCardComponent,
        AddIndicatorComponent,
        IndicatorSharingSearchComponent
    ],
    providers: [
        IndicatorSharingService
    ],
    entryComponents: [
        AddIndicatorComponent
    ]
})
export class IndicatorSharingModule { }
