import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { LineChartComponent } from './question-results/line-chart/line-chart.component';

import { QuestionsResultsComponent } from './question-results/questions-results.component';
import { QuestionResultsService } from './question-results//questions-results.service';

import { QuestionOneComponent } from './question-one/question-one.component';
import { QuestionOneUserComponent } from './question-one/question-one-user/question-one-user.component';
import { QuestionOneService } from './question-one/question-one.service';

import { QuestionTwoComponent } from './question-two/question-two.component';
import { QuestionTwoUserComponent } from './question-two/question-two-user/question-two-user.component';
import { QuestionTwoService } from './question-two/question-two.service';

@NgModule({
    declarations: [
        QuestionsResultsComponent,
        QuestionOneComponent,
        QuestionOneUserComponent,
        QuestionTwoComponent,
        QuestionTwoUserComponent,
        LineChartComponent
    ], 
    imports: [
        CommonModule,
        MaterialModule,
        BrowserAnimationsModule,
        NoopAnimationsModule
    ],
    exports: [
        QuestionsResultsComponent,
        QuestionOneComponent,
        QuestionOneUserComponent,
        QuestionTwoComponent,
        QuestionTwoUserComponent,
        LineChartComponent
    ],
    providers: [
        QuestionOneService,
        QuestionTwoService,
        QuestionResultsService
    ]
})

export class HealthModule { }
