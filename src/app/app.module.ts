import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataPageComponent } from './data-page/data-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';  // Ensure FormsModule is imported

@NgModule({
  declarations: [
    AppComponent,
    DataPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    FormsModule  // Ensure FormsModule is imported for ngModel
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
