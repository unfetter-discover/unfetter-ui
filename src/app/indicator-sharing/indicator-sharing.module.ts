import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule, MatChipsModule, MatTooltipModule, MatCardModule,
    MatTabsModule, MatInputModule, MatIconModule, MatButtonModule } from '@angular/material';

// Modules
import { routing } from './indicator-sharing-routing.module';
import { GlobalModule } from '../global/global.module';

// Components
import { IndicatorSharingLayoutComponent } from './indicator-sharing-layout/indicator-sharing-layout.component';
import { IndicatorSharingListComponent } from './indicator-sharing-list/indicator-sharing-list.component';
import { IndicatorCardComponent } from './indicator-card/indicator-card.component';
import { AddIndicatorComponent } from './add-indicator/add-indicator.component.ts';

// Services
import { IndicatorSharingService } from './indicator-sharing.service';

const matModules = [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatTabsModule,
    MatTooltipModule,
];

@NgModule({
    imports: [
        CommonModule,
        routing,
        GlobalModule,
        FormsModule,
        ...matModules,
    ],
    exports: [],
    declarations: [
        IndicatorSharingLayoutComponent,
        IndicatorSharingListComponent,
        IndicatorCardComponent,
        AddIndicatorComponent
    ],
    providers: [
        IndicatorSharingService
    ],
    entryComponents: [
        AddIndicatorComponent
    ]
})
export class IndicatorSharingModule { }
