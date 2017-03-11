import { Component, OnInit } from "@angular/core";

import { QuestionTwoService } from '../question-two/question-two.service';
import { Health } from '../health.model';

import { AuthService } from '../../../auth/auth.service';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'app-question-two',
    templateUrl: './question-two.component.html',
    styleUrls: ['./question-two.component.css']
})

export class QuestionTwoComponent implements OnInit {

    //User health variables
    private healths: Health[];

    //Team range input disable
    private teamQuestionTwoInputDisable: boolean;

    //Question one value to show on template
    private teamQuestionTwoValue: number = 0;

    //Team data subscriptions for live data feed
    private teamQuestionTwoSubscription: Subscription;

    constructor(private _QuestionTwoService: QuestionTwoService,
        private _authService: AuthService) {

        this.teamQuestionTwoInputDisable = true;

        //Subscribing to the sevice which is listening to the socket for a change in team health information
        this.teamQuestionTwoSubscription = this._QuestionTwoService.latestTeamQuestionTwoValueChanged$.subscribe(
            latestTeamQuestionTwoValue => this.teamQuestionTwoValue = latestTeamQuestionTwoValue
        );

        // //On first load of this component, you GET the latest team health
        this._QuestionTwoService.getMostRecentTeamQuestionTwoValue()
            .subscribe(
                (mostRecentTeamHealthObject: number) => {
                    this.teamQuestionTwoValue = mostRecentTeamHealthObject
                }
            )

    }

    ngOnInit() {}
 
    isLoggedIn() {
        return this._authService.isLoggedIn();
    }

    //Setters and getters for team part
    setTeamQuestionTwoInputDisable(teamQuestionTwoInputDisable: boolean) {
        this.teamQuestionTwoInputDisable = teamQuestionTwoInputDisable;
    }

    getTeamQuestionTwoInputDisable(): boolean {
        return this.teamQuestionTwoInputDisable;
    }

}