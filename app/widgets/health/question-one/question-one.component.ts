import { Component } from "@angular/core";

import { Subscription } from 'rxjs/Subscription';
import { Observable } from "rxjs/Observable";

import { QuestionOneService } from '../question-one/question-one.service';
import { Health } from '../health.model';

@Component({
    selector: 'app-question-one',
    templateUrl: './question-one.component.html',
    styleUrls: ['./question-one.component.css']
})

export class QuestionOneComponent {

    //User health variables
    private healths: Health[];

    //Team range input disable
    private teamQuestionOneInputDisable: boolean;

    //Question one value to show on template
    private teamQuestionOneValue: number = 0;

    //Team data subscriptions for live data feed
    private teamQuestionOneSubscription: Subscription;

    constructor(private _questionOneService: QuestionOneService) {

        this.teamQuestionOneInputDisable = true;

        //Subscribing to the sevice which is listening to the socket for a change in team health information
        this.teamQuestionOneSubscription = this._questionOneService.latestTeamQuestionOneValueChanged$.subscribe(
            latestTeamQuestionOneValue => this.teamQuestionOneValue = latestTeamQuestionOneValue
        );

        //On first load of this component, you GET the latest team health
        this._questionOneService.getMostRecentTeamQuestionOneValue()
            .subscribe(
            (mostRecentTeamHealthObject: number) => {
                this.teamQuestionOneValue = mostRecentTeamHealthObject
            }
            )

    }

    //Setters and getters for team part
    setTeamQuestionOneInputDisable(teamQuestionOneInputDisable: boolean) {
        this.teamQuestionOneInputDisable = teamQuestionOneInputDisable;
    }

    getTeamQuestionOneInputDisable(): boolean {
        return this.teamQuestionOneInputDisable;
    }

}