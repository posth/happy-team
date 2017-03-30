import { Component, OnInit } from "@angular/core";
import { Subscription } from 'rxjs/Subscription';

import { QuestionTwoService } from '../question-two.service';
import { Health } from '../../health.model';
import { UserStatusService } from '../../../../user/user-status.service';

@Component({
    selector: 'app-question-two-user',
    templateUrl: './question-two-user.component.html',
    styleUrls: ['./question-two-user.component.css']
})

export class QuestionTwoUserComponent implements OnInit {

    //User health variables
    private healths: Health[];
    private userQuestionTwoValue: number;

    private mostRecentHealthObject: Object;

    private loggedInStatus: boolean;
    _loggedInStatusSubscription: Subscription;

    constructor(private _QuestionTwoService: QuestionTwoService,
        private _userStatusService: UserStatusService) {
        this._loggedInStatusSubscription = this._userStatusService.isLoggedInValueChanged$.subscribe(
            isLoggedInValue => this.loggedInStatus = isLoggedInValue
        );
    }

    ngOnInit() {
        this._QuestionTwoService.getQuestionTwoValues()
            .subscribe(
            (healths: Health[]) => {
                this.healths = healths;
            }
            );

        // //On init of this component grab the specific logged in user's latest health
        this.getMostRecentUserHealth();
    }

    //Getting individual most recent health from MongoDB
    getMostRecentUserHealth() {
        this._QuestionTwoService.getUserMostRecentQuestionTwoValue()
            .subscribe(
            (mostRecentHealth: number) => {

                //Grab the most recent health object from the db on initialization of this component    
                this.userQuestionTwoValue = mostRecentHealth;

            }
            );
    }

    //On each user input send health via socket
    setUserQuestionTwoValue(userHealth: number) {
        const health = new Health(userHealth);

        //Send health to server via socket
        this._QuestionTwoService.addQuestionTwoUserValue(userHealth);
    }
}