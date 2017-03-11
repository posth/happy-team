import { Component, OnInit } from "@angular/core";

import { QuestionOneService } from '../question-one/question-one.service';
import { Health } from '../health.model';

import { AuthService } from '../../../auth/auth.service';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'app-question-one',
    templateUrl: './question-one.component.html',
    styleUrls: ['./question-one.component.css']
})

export class QuestionOneComponent implements OnInit {

    //User health variables
    private healths: Health[];

    //Team range input disable
    private teamQuestionOneInputDisable: boolean;

    //Question one value to show on template
    private teamQuestionOneValue: number = 0;

    //Team data subscriptions for live data feed
    private teamQuestionOneSubscription: Subscription;

    constructor(private _questionOneService: QuestionOneService,
        private _authService: AuthService) {

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

    ngOnInit() {}
 
    isLoggedIn() {
        return this._authService.isLoggedIn();
    }

    //Setters and getters for team part
    setTeamQuestionOneInputDisable(teamQuestionOneInputDisable: boolean) {
        this.teamQuestionOneInputDisable = teamQuestionOneInputDisable;
    }

    getTeamQuestionOneInputDisable(): boolean {
        return this.teamQuestionOneInputDisable;
    }

}