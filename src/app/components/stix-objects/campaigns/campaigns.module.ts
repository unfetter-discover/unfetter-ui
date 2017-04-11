import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './campaigns.routes';
import { CampaignsComponent } from './campaigns.component';

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    CampaignsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class CampaignsModule {
  public static routes = routes;
}
