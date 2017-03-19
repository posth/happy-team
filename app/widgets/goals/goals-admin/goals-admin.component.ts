import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

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

    private goal: Goal;

    constructor(private _goalsService: GoalsService) { }

    onSubmit(form: NgForm) {
        //TODO manage if it is to be edited - see message-input.component for example

        //Create new goal
        const goal = new Goal(form.value.content, false, new Date());

        this._goalsService.addTeamGoal(goal);

        form.resetForm();
    }
}