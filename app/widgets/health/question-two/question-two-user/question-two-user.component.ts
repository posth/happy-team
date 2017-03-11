import { Component, OnInit } from "@angular/core";

import { QuestionTwoService } from '../question-two.service';
import { Health } from '../../health.model';

import { AuthService } from '../../../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

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

    constructor(private _QuestionTwoService: QuestionTwoService,
        private _authService: AuthService) {
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
            (mostRecentHealthObject: Object) => {

                //Grab the most recent health object from the db on initialization of this component    
                this.mostRecentHealthObject = mostRecentHealthObject;

                if (this.mostRecentHealthObject) {
                    //Grab the health value from the object
                    this.userQuestionTwoValue = this.mostRecentHealthObject['currentHealth'];
                }

            }
            );
    }

    isLoggedIn() {
        return this._authService.isLoggedIn();
    }

    //On each user input send health via socket
    setUserQuestionTwoValue(userHealth: number) {
        const health = new Health(userHealth);

        //Send health to server via socket
        this._QuestionTwoService.addQuestionTwoUserValue(userHealth);
    }
}