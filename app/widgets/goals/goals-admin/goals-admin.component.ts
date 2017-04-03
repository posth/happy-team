import { Component } from "@angular/core";
import { NgForm, NgModel } from "@angular/forms";
// import { Subscription } from 'rxjs/Subscription';

//Service
import { GoalsService } from "../goals.service";

//Model
import { Goal } from "../goal.model";

@Component({
    selector: 'app-goals-admin',
    templateUrl: './goals-admin.component.html',
    styleUrls: ['./goals-admin.component.css']
})

export class GoalsAdminComponent {
    //Team goals
    private goals: Goal[];

    constructor(private _goalsService: GoalsService) {
        this.getTeamGoals();
    }

    onSubmit(form: NgForm) {
        //TODO manage if it is to be edited - see message-input.component for example

        //Create new goal
        const goal = new Goal(form.value.content, false, new Date());

        this._goalsService.addTeamGoal(goal);

        form.resetForm();
        this.getTeamGoals();
    }

    getTeamGoals() {
        //On first init of the page you get all the team goals
        this._goalsService.getTeamGoals()
            .subscribe(
            (transformedGoals: Goal[]) => {
                this.goals = transformedGoals;
            }
            )
    }

    deleteGoal(currentGoal: Goal) {
        this._goalsService.deleteTeamGoal(currentGoal);
        this.getTeamGoals();
    }

    completeGoal(currentGoal: Goal) {

        this._goalsService.completeTeamGoal(currentGoal);
        this.getTeamGoals();
    }

}