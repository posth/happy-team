import { Component } from '@angular/core';

import { Health } from './health.model';

import { QuestionOneService } from './question-one/question-one.service';
import { QuestionTwoService } from './question-two/question-two.service';

@Component({
    selector: 'app-questions-results',
    templateUrl: './questions-results.component.html',
    styleUrls: ['./questions-results.component.css']
})
export class QuestionsResultsComponent {

    private questionOneResults: Health[];
    private questionTwoResults: Health[];

    constructor(private _questionOneService: QuestionOneService,
        private _questionTwoService: QuestionTwoService) {
        this.getLatestQuestionOneResults();
        this.getLatestQuestionTwoResults();
    }

    getLatestQuestionOneResults() {
        //todo GET all team health values - need to create a route + add to front service
    }

    getLatestQuestionTwoResults() {
        //todo GET all team health values - need to create a route + add to front service
    }
    
}