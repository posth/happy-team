import { Component, Input, OnInit } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import * as d3 from 'd3';

//Temporary model to use 
import { TeamHealth } from '../../teamHealth.model';

@Component({
    selector: 'app-line-chart',
    template: `<svg></svg>`,
    styles: [`svg {    width: 100%; height: 30rem;}`]
})

export class LineChartComponent implements OnInit {

    private _arrayToDisplay = new BehaviorSubject<TeamHealth[]>([]);

    @Input()
    set arrayToDisplay(arrayToDisplay) {
        this._arrayToDisplay.next(arrayToDisplay);
    };

    get arrayToDisplay() {
        return this._arrayToDisplay.getValue();
    }

    private currentArrayToDisplay: TeamHealth[];

    private margin = { top: 20, right: 20, bottom: 30, left: 50 };
    private svg: any;
    private width: number;
    private height: number;
    private xAxis: any;
    private yAxis: any;
    private lineChartOne: d3Shape.Line<[number, number]>;

    constructor() { }

    ngOnInit() {
        this._arrayToDisplay
            .subscribe(
                x => {
                    this.currentArrayToDisplay = this.arrayToDisplay
                    if(this.currentArrayToDisplay) {
                        console.log('child component array -> ', this.currentArrayToDisplay)
                        this.drawChart()
                    }

                }
            )
    }

    drawChart() {
        //Setting the width of the chart here to set the length on the x and y axis
        this.width = 1000 - this.margin.left - this.margin.right;
        this.height = 400 - this.margin.top - this.margin.bottom;

        //Attaching the svg DOM element to d3
        this.svg = d3.select("svg")
            .append("g")
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

        //Length of the axis
        this.xAxis = d3Scale.scaleTime().range([0, this.width]);
        this.yAxis = d3Scale.scaleLinear().range([this.height, 0]);

        //Mapping team healths object to the axis of the graph
        this.xAxis.domain(d3Array.extent(this.currentArrayToDisplay, (teamHealth) => new Date(teamHealth.teamHealthDate)));
        this.yAxis.domain(d3Array.extent(this.currentArrayToDisplay, (teamHealth) => teamHealth.teamHealth));

        //Creating the x-axis (time)
        this.svg.append("g")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3Axis.axisBottom(this.xAxis));

        //Creating the y-axis (health values)
        this.svg.append("g")
            .call(d3Axis.axisLeft(this.yAxis))
            .append("text");

        //Creating the line itself using the values from the array received from the service
        this.lineChartOne = d3Shape.line()
            .x((teamHealth: any) => this.xAxis(new Date(teamHealth.teamHealthDate)))
            .y((teamHealth: any) => this.yAxis(teamHealth.teamHealth));

        //Adding the line to the chart
        this.svg.append("path")
            .datum(this.currentArrayToDisplay)
            .style("fill", "none")
            .style("stroke", "steelblue")
            .style("stroke-width", "3px")
            .attr("d", this.lineChartOne);
    }

}