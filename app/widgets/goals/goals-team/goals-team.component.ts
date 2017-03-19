import { Component } from "@angular/core";

import { Subscription } from 'rxjs/Subscription';

import { Goal } from "../goal.model";
import { GoalsService } from "../goals.service";

@Component({
    selector: 'app-goals-team',
    templateUrl: './goals-team.component.html',
    styleUrls: ['./goals-team.component.css']
})

export class GoalsTeamComponent {

    //Team goals
    private goals: Goal[];

    //Team goals subscription
    private teamGoalsSubscription: Subscription;

    constructor(private _goalsService: GoalsService) {

        this.teamGoalsSubscription = this._goalsService.allTeamGoalsChanged$.subscribe(
            allTeamGoals => this.goals = allTeamGoals
        );

        //On first init of the page you get all the team goals
        this._goalsService.getTeamGoals()
            .subscribe(
            (transformedGoals: Goal[]) => {
                this.goals = transformedGoals;
            }
            )
    }
}