import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataPageComponent } from './data-page/data-page.component';
import { DetailsPanelComponent } from './details-panel/details-panel.component';
import { AnalysisPageComponent } from './analysis-page/analysis-page.component';
import { MonitorPageComponent } from './monitor-page/monitor-page.component';

const routes: Routes = [
  { path: 'data-page', component: DataPageComponent },
  { path: 'details-panel', component: DetailsPanelComponent },
  { path: 'analysis-page', component: AnalysisPageComponent },
  { path: 'monitor-page', component: MonitorPageComponent },
  { path: '', redirectTo: '/data-page', pathMatch: 'full' } // default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
