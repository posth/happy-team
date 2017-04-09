import { Component } from "@angular/core";

import { QuestionThreeService } from '../question-three/question-three.service';
import { Health } from "../health.model";

import { Subscription } from 'rxjs/Subscription';
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'app-question-three',
    templateUrl: './question-three.component.html',
    styleUrls: ['./question-three.component.css']
})

export class QuestionThreeComponent {

    //Team range input disable
    private teamQuestionThreeInputDisable: boolean;

    //Question one value to show on template
    private teamQuestionThreeValue: number = 0;

    //Team data subscriptions for live data feed
    private teamQuestionThreeSubscription: Subscription;

    constructor(private _questionThreeService: QuestionThreeService) {
        this.teamQuestionThreeInputDisable = true;

        //Subscribing to the sevice which is listening to the socket for a change in team health information
        this.teamQuestionThreeSubscription = this._questionThreeService.latestTeamQuestionThreeValueChanged$.subscribe(
            latestTeamQuestionThreeValue => this.teamQuestionThreeValue = latestTeamQuestionThreeValue
        );

        // //On first load of this component, you GET the latest team health
        this._questionThreeService.getMostRecentTeamQuestionThreeValue()
            .subscribe(
            (mostRecentTeamHealthObject: number) => {
                this.teamQuestionThreeValue = mostRecentTeamHealthObject
                }
            )
    }

    //Setters and getters for team part
    setTeamQuestionThreeInputDisable(teamQuestionThreeInputDisable: boolean) {
        this.teamQuestionThreeInputDisable = teamQuestionThreeInputDisable;
    }

    getTeamQuestionThreeInputDisable(): boolean {
        return this.teamQuestionThreeInputDisable;
    }

}
