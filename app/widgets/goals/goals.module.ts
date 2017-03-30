import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "@angular/material";

import { GoalsTeamComponent } from "./goals-team/goals-team.component";
import { GoalsAdminComponent } from "./goals-admin/goals-admin.component";

import { GoalsService } from "./goals.service";

@NgModule({
    declarations: [
        GoalsTeamComponent,
        GoalsAdminComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule
    ],
    exports: [
        GoalsTeamComponent,
        GoalsAdminComponent
    ],
    providers: [
        GoalsService
    ]
})

export class GoalsModule { }