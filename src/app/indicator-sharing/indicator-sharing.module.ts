// Vendor
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
        MatSelectModule,
        MatChipsModule,
        MatTooltipModule,
        MatCardModule,
        MatTabsModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatListModule,
        MatStepperModule,
        MatDialogModule,
        MatSidenavModule,
        MatMenuModule,
    } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ClipboardModule } from 'ngx-clipboard';

// Modules
import { routing } from './indicator-sharing-routing.module';
import { GlobalModule } from '../global/global.module';

// Services
import { IndicatorSharingService } from './indicator-sharing.service';

// Other
import { indicatorSharingReducer } from './store/indicator-sharing.reducers';
import { IndicatorSharingEffects } from './store/indicator-sharing.effects';

// Components
import { IndicatorSharingLayoutComponent } from './indicator-sharing-layout/indicator-sharing-layout.component';
import { IndicatorSharingListComponent } from './indicator-sharing-list/indicator-sharing-list.component';
import { IndicatorCardComponent } from './indicator-card/indicator-card.component';
import { AddIndicatorComponent } from './add-indicator/add-indicator.component';
import { IndicatorDetailsComponent } from './indicator-details/indicator-details.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { IndicatorSharingSortComponent } from './indicator-sharing-sort/indicator-sharing-sort.component';
import { IndicatorSharingFiltersComponent } from './indicator-sharing-filters/indicator-sharing-filters.component';
import { AddAttackPatternComponent } from './add-attack-pattern/add-attack-pattern.component';
import { IndicatorHeatMapFilterComponent } from './indicator-heat-map/indicator-heatmap-filter.component';
import { SummaryStatisticsComponent } from './summary-statistics/summary-statistics.component';

const matModules = [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule, 
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatNativeDateModule,
    MatRadioModule, 
    MatSelectModule,
    MatStepperModule,
    MatTabsModule,
    MatTooltipModule,
    MatSidenavModule,
    MatMenuModule
];

@NgModule({
    imports: [
        CommonModule,
        routing,
        GlobalModule,
        FormsModule,
        ReactiveFormsModule,
        ...matModules,
        ClipboardModule,
        StoreModule.forFeature('indicatorSharing', indicatorSharingReducer),
        EffectsModule.forFeature([
            IndicatorSharingEffects
        ])
    ],
    exports: [],
    declarations: [
        IndicatorSharingLayoutComponent,
        IndicatorSharingListComponent,
        IndicatorCardComponent,
        AddIndicatorComponent,
        IndicatorDetailsComponent,
        SearchBarComponent,
        IndicatorSharingSortComponent,
        IndicatorSharingFiltersComponent,
        AddAttackPatternComponent,
        IndicatorHeatMapFilterComponent,
        SummaryStatisticsComponent,
    ],
    providers: [
        IndicatorSharingService
    ],
    entryComponents: [
        AddIndicatorComponent,
        IndicatorHeatMapFilterComponent,
    ]
})
export class IndicatorSharingModule { }
