import { Component, OnInit } from "@angular/core";
import { Subscription } from 'rxjs/Subscription';

import { QuestionThreeService } from '../question-three.service';
import { Health } from '../../health.model';
import { UserStatusService } from '../../../../user/user-status.service';

@Component({
    selector: 'app-question-three-user',
    templateUrl: './question-three-user.component.html',
    styleUrls: ['./question-three-user.component.css']
})

export class QuestionThreeUserComponent implements OnInit {

    //User health variables
    private healths: Health[];
    private userQuestionThreeValue: number;

    private mostRecentHealthObject: Object;

    private loggedInStatus: boolean;
    _loggedInStatusSubscription: Subscription;

    constructor(private _questionThreeService: QuestionThreeService,
        private _userStatusService: UserStatusService) {
        this._loggedInStatusSubscription = this._userStatusService.isLoggedInValueChanged$.subscribe(
            isLoggedInValue => this.loggedInStatus = isLoggedInValue
        );
    }

    ngOnInit() {
        this._questionThreeService.getQuestionThreeValues()
            .subscribe(
            (healths: Health[]) => {
                this.healths = healths;
            }
            );

        // //On init of this component grab the specific logged in user's latest health
        this.getMostRecentUserHealth();
    }

    getMostRecentUserHealth() {
        this._questionThreeService.getUserMostRecentQuestionThreeValue()
            .subscribe(
            (mostRecentHealth: number) => {

                //Grab the most recent health object from the db on initialization of this component    
                this.userQuestionThreeValue = mostRecentHealth;

            }
            );
    }

    //On each user input send health via socket
    setUserQuestionThreeValue(userHealth: number) {
        const health = new Health(userHealth);

        //Send health to server via socket
        this._questionThreeService.addQuestionThreeUserValue(userHealth);

        this.userQuestionThreeValue = userHealth;
    }
}