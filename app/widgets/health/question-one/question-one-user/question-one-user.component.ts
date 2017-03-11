import { Component, OnInit } from "@angular/core";

import { QuestionOneService } from '../../question-one/question-one.service';
import { Health } from '../../health.model';

import { AuthService } from '../../../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-question-one-user',
    templateUrl: './question-one-user.component.html',
    styleUrls: ['./question-one-user.component.css']
})

export class QuestionOneUserComponent implements OnInit {

    //User health variables
    private healths: Health[];
    private userQuestionOneValue: number;

    private mostRecentHealthObject: Object;

    constructor(private _questionOneService: QuestionOneService,
        private _authService: AuthService) {
    }

    ngOnInit() {
        this._questionOneService.getQuestionOneValues()
            .subscribe(
            (healths: Health[]) => {
                this.healths = healths;
            }
            );

        //On init of this component grab the specific logged in user's latest health
        this.getMostRecentUserHealth();
    }

    //Getting individual most recent health from MongoDB
    getMostRecentUserHealth() {
        this._questionOneService.getUserMostRecentQuestionOneValue()
            .subscribe(
            (mostRecentHealthObject: Object) => {

                //Grab the most recent health object from the db on initialization of this component    
                this.mostRecentHealthObject = mostRecentHealthObject;

                if (this.mostRecentHealthObject) {
                    //Grab the health value from the object
                    this.userQuestionOneValue = this.mostRecentHealthObject['currentHealth'];
                }

            }
            );
    }

    isLoggedIn() {
        return this._authService.isLoggedIn();
    }

    //On each user input send health via socket
    setUserQuestionOneValue(userHealth: number) {
        const health = new Health(userHealth);

        //Send health to server via socket
        this._questionOneService.addQuestionOneUserValue(userHealth);
    }
}