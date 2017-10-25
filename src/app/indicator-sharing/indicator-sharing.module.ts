import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule, MatChipsModule, MatTooltipModule, MatCardModule,
    MatTabsModule, MatInputModule, MatIconModule } from '@angular/material';

// Modules
import { routing } from './indicator-sharing-routing.module';
import { GlobalModule } from '../global/global.module';

// Components
import { IndicatorSharingLayoutComponent } from './indicator-sharing-layout/indicator-sharing-layout.component';
import { IndicatorSharingListComponent } from './indicator-sharing-list/indicator-sharing-list.component';
import { IndicatorCardComponent } from './indicator-card/indicator-card.component';

// Services
import { IndicatorSharingService } from './indicator-sharing.service';

@NgModule({
    imports: [
        CommonModule,
        routing,
        GlobalModule,
        FormsModule,
        MatSelectModule,
        MatChipsModule,
        MatTooltipModule,
        MatCardModule,
        MatTabsModule,
        MatInputModule,
        MatIconModule
    ],
    exports: [],
    declarations: [
        IndicatorSharingLayoutComponent,
        IndicatorSharingListComponent,
        IndicatorCardComponent
    ],
    providers: [
        IndicatorSharingService
    ],
})
export class IndicatorSharingModule { }
