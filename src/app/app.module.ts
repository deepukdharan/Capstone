import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatSliderModule, MatCheckboxModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTaskComponent} from './add-task/add-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { ViewTaskDetailsComponent } from './view-task-details/view-task-details.component';
import {DatePipe} from '@angular/common';
import { FilterPipe} from './filterpipe';
import { Routes } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    ViewTaskComponent,
    ViewTaskDetailsComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
