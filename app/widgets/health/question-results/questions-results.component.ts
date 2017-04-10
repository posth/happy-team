import { Component, OnInit } from '@angular/core';
// import { Subscription } from 'rxjs/Subscription';

import { TeamHealth } from '../teamHealth.model';

import { QuestionResultsService } from './questions-results.service';

// import * as d3 from 'd3-selection';
// import * as d3Scale from "d3-scale";
// import * as d3Shape from "d3-shape";
// import * as d3Array from "d3-array";
// import * as d3Axis from "d3-axis";
// import * as d3 from 'd3';

@Component({
    selector: 'app-questions-results',
    templateUrl: './questions-results.component.html',
    styleUrls: ['./questions-results.component.css']
})
export class QuestionsResultsComponent implements OnInit {

    private questionOneResults: TeamHealth[];

    private questionTwoResults: TeamHealth[];

    private questionThreeResults: TeamHealth[];

    constructor(private _questionResultsService: QuestionResultsService) {
        this.getLatestQuestionOneResults();
        this.getLatestQuestionTwoResults();
        this.getLatestQuestionThreeResults();
    }

    ngOnInit() { }

    getLatestQuestionOneResults() {
        this._questionResultsService.getAllQuestionOneValues()
            .subscribe(
            (allQuestionOneValues: TeamHealth[]) => {
                this.questionOneResults = allQuestionOneValues
                // console.log('question one reuslts parent ', this.questionOneResults)
            })
    }

    getLatestQuestionTwoResults() {
        //todo GET all team health values - need to create a route + add to front service
        this._questionResultsService.getAllQuestionTwoValues()
            .subscribe(
            (allQuestionTwoValues: TeamHealth[]) => {
                this.questionTwoResults = allQuestionTwoValues
                // console.log('question two reuslts parent ', this.questionOneResults)
            })
    }

    getLatestQuestionThreeResults() {
        //todo GET all team health values - need to create a route + add to front service
        this._questionResultsService.getAllQuestionThreeValues()
            .subscribe(
            (allQuestionThreeValues: TeamHealth[]) => {
                this.questionThreeResults = allQuestionThreeValues
                // console.log('question two reuslts parent ', this.questionOneResults)
            })
    }

}