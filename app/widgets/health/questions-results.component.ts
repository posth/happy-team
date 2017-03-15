import { Component, OnInit } from '@angular/core';
// import { Subscription } from 'rxjs/Subscription';

import { TeamHealth } from './teamHealth.model';

import { QuestionResultsService } from './questions-results.service';

// import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import * as d3 from 'd3';

@Component({
    selector: 'app-questions-results',
    templateUrl: './questions-results.component.html',
    styleUrls: ['./questions-results.component.css']
})
export class QuestionsResultsComponent implements OnInit {

    private questionOneResults: TeamHealth[];
    private questionTwoResults: TeamHealth[];

    //Chart one SVG 
    private marginChart = { top: 20, right: 20, bottom: 30, left: 50 };
    private svgChartOne: any;
    private widthChartOne: number;
    private heightChartOne: number;
    private xChartOne: any;
    private yChartOne: any;
    private lineChartOne: d3Shape.Line<[number, number]>;

    constructor(private _questionResultsService: QuestionResultsService) {
        this.getLatestQuestionOneResults();
        // this.getLatestQuestionTwoResults();
    }

    ngOnInit() { }

    drawQuestionOneChart() {
        //Setting the width of the chart here to set the length on the x and y axis
        this.widthChartOne = 1000 - this.marginChart.left - this.marginChart.right;
        this.heightChartOne = 400 - this.marginChart.top - this.marginChart.bottom;

        //Attaching the svg DOM element to d3
        this.svgChartOne = d3.select("#chartOne")
            .append("g")
            .attr('transform', 'translate(' + this.marginChart.left + ',' + this.marginChart.top + ')');

        //Length of the axis
        this.xChartOne = d3Scale.scaleTime().range([0, this.widthChartOne]);
        this.yChartOne = d3Scale.scaleLinear().range([this.heightChartOne, 0]);

        //Mapping team healths object to the axis of the graph
        this.xChartOne.domain(d3Array.extent(this.questionOneResults, (teamHealth) => new Date(teamHealth.teamHealthDate)));
        this.yChartOne.domain(d3Array.extent(this.questionOneResults, (teamHealth) => teamHealth.teamHealth));

        //Creating the x-axis (time)
        this.svgChartOne.append("g")
            .attr("transform", "translate(0," + this.heightChartOne + ")")
            .call(d3Axis.axisBottom(this.xChartOne));

        //Creating the y-axis (health values)
        this.svgChartOne.append("g")
            .call(d3Axis.axisLeft(this.yChartOne))
            .append("text");

        //Creating the line itself using the values from the array received from the service
        this.lineChartOne = d3Shape.line()
            .x((teamHealth: any) => this.xChartOne(new Date(teamHealth.teamHealthDate)))
            .y((teamHealth: any) => this.yChartOne(teamHealth.teamHealth));

        //Adding the line to the chart
        this.svgChartOne.append("path")
            .datum(this.questionOneResults)
            .style("fill", "none")
            .style("stroke", "steelblue")
            .style("stroke-width", "3px")
            .attr("d", this.lineChartOne);
    }

    getLatestQuestionOneResults() {
        this._questionResultsService.getAllQuestionOneValues()
            .subscribe(
            (allQuestionOneValues: TeamHealth[]) => {
                this.questionOneResults = allQuestionOneValues
                this.drawQuestionOneChart()
            })
    }

    getLatestQuestionTwoResults() {
        //todo GET all team health values - need to create a route + add to front service
        this._questionResultsService.getAllQuestionTwoValues()
            .subscribe(
            (allQuestionTwoValues: TeamHealth[]) => {
                this.questionTwoResults = allQuestionTwoValues
            })
    }

}