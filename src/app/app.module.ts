import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule, ApplicationRef } from '@angular/core';
import { RouterModule, PreloadAllModules, Router } from '@angular/router';
import { MaterialModule, MdDialogModule, MdSlideToggleModule, MdSliderModule, MdCardModule } from '@angular/material';
import { AutoCompleteModule, CarouselModule, ProgressBarModule } from 'primeng/primeng';
import { ComponentModule } from './components/component.module';
import { StixModule } from './settings/stix.module';
// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HomeComponent } from './home';
import { IntrusionSetDashboardComponent } from './intrusion-set-dashboard/intrusion-set-dashboard.component';
import { PartnersComponent } from './partners/partners.component';
import { NoContentComponent } from './no-content';
import '../styles/styles.scss';
// import '../styles/app.scss';
import '../styles/headings.css';
import { ConceptMapComponent } from './intrusion-set-dashboard/concept-map.component';
import { CollapsibleTreeComponent } from './intrusion-set-dashboard/collapsible-tree.component';
import { AccordionModule } from 'primeng/components/accordion/accordion';
import { AssessmentsModule } from './assessments/assessments.module';
import { ThreatDashboardModule } from './threat-dashboard/threat-dashboard.module';

import { GlobalModule } from './global/global.module';

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    ConceptMapComponent,
    HomeComponent,
    IntrusionSetDashboardComponent,
    CollapsibleTreeComponent,
    PartnersComponent,
    NoContentComponent,
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    AutoCompleteModule,
    CarouselModule,
    MdSliderModule,
    AccordionModule,
    ProgressBarModule,
    ComponentModule,
    GlobalModule,
    StixModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
    // RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
    AssessmentsModule,
    ThreatDashboardModule,
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
  ]
})
export class AppModule {

  constructor(private router: Router) {
    // console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }

}
