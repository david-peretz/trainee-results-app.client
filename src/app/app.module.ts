import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataPageComponent } from './data-page/data-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';  // Ensure FormsModule is imported
import { MonitorPageComponent } from './monitor-page/monitor-page.component';
import { AnalysisPageComponent } from './analysis-page/analysis-page.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { BaseChartDirective  } from 'ng2-charts';
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    DataPageComponent,
    MonitorPageComponent,
    AnalysisPageComponent
  ],
  imports: [
    BaseChartDirective,
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatSelectModule,
    MatOptionModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    FormsModule  // Ensure FormsModule is imported for ngModel
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
