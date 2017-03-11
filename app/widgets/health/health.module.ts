import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { QuestionOneComponent } from './question-one/question-one.component';
import { QuestionOneUserComponent } from './question-one/question-one-user/question-one-user.component';
import { QuestionOneService } from './question-one/question-one.service';

@NgModule({
    declarations: [
        QuestionOneComponent,
        QuestionOneUserComponent
    ],
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [
        QuestionOneComponent,
        QuestionOneUserComponent
    ],
    providers: [
        QuestionOneService
    ]
})

export class HealthModule { }
