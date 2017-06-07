import { Component, OnInit } from "@angular/core";
import { QuestionOneService } from '../../question-one/question-one.service';
import { Health } from '../../health.model';
import { Subscription } from 'rxjs/Subscription';
import { UserStatusService } from '../../../../user/user-status.service';

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

    private loggedInStatus: boolean;
    _loggedInStatusSubscription: Subscription;

    constructor(private _questionOneService: QuestionOneService,
    private _userStatusService: UserStatusService) {

        this._loggedInStatusSubscription = this._userStatusService.isLoggedInValueChanged$.subscribe(
            isLoggedInValue => this.loggedInStatus = isLoggedInValue
        );
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

    //On each user input send health via socket
    setUserQuestionOneValue(userHealth: number) {
        const health = new Health(userHealth);

        //Send health to server via socket
        this._questionOneService.addQuestionOneUserValue(userHealth);
        this.userQuestionOneValue = userHealth;
    }
}