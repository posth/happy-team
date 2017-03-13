import { Component } from '@angular/core';
// import { Subscription } from 'rxjs/Subscription';

import { TeamHealth } from './teamHealth.model';

import { QuestionResultsService } from './questions-results.service';

@Component({
    selector: 'app-questions-results',
    templateUrl: './questions-results.component.html',
    styleUrls: ['./questions-results.component.css']
})
export class QuestionsResultsComponent {

    private questionOneResults: TeamHealth[];
    private questionTwoResults: TeamHealth[];

    constructor(private _questionResultsService: QuestionResultsService) {
        this.getLatestQuestionOneResults();
        this.getLatestQuestionTwoResults();
    }

    getLatestQuestionOneResults() {
        this._questionResultsService.getAllQuestionOneValues()
            .subscribe(
            (allQuestionOneValues: TeamHealth[]) => {
                this.questionOneResults = allQuestionOneValues
            })
    }

    getLatestQuestionTwoResults() {
        //todo GET all team health values - need to create a route + add to front service
        this._questionResultsService.getAllQuestionTwoValues()
            .subscribe(
            (allQuestionTwoValues: TeamHealth[]) => {
                this.questionTwoResults = allQuestionTwoValues
                console.log(this.questionTwoResults)
            })
    }

}