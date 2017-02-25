import { Component, OnInit } from "@angular/core";

import { HealthService } from './health.service';
import { Health } from './health.model';

import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-health',
    templateUrl: './health.component.html'
})

export class HealthComponent implements OnInit {

    //User health variables
    private healths: Health[];

    //Team range input disable
    private teamInputDisable: boolean;
    private teamHealthValue: number;
    private mostRecentTeamHealthObject: number;

    constructor(private _healthService: HealthService,
        private _authService: AuthService) {

        this.teamInputDisable = true;
    }

    ngOnInit() {
        this._healthService.getHealth()
            .subscribe(
            (healths: Health[]) => {
                this.healths = healths;
            }
            );

        //On init of this component grab the team's most recent health average
        this.getMostRecentTeamHealth();

    }

    //Getting the team health average from MongoDB
    getMostRecentTeamHealth() {
        this._healthService.getMostRecentTeamHealth()
            .subscribe(
            (mostRecentTeamHealthObject: number) => {
                this.mostRecentTeamHealthObject = mostRecentTeamHealthObject;

                //TODO manage null/undefined/non-existent object
                console.log('Moyenne de la dernière health de chaque user : ', this.mostRecentTeamHealthObject);
                this.teamHealthValue = this.mostRecentTeamHealthObject;

            }
            );
    }

    isLoggedIn() {
        return this._authService.isLoggedIn();
    }

    //Setters and getters for team part
    setTeamInputDisable(teamDisableInput: boolean) {
        this.teamInputDisable = teamDisableInput;
    }

    getTeamInputDisable(): boolean {
        return this.teamInputDisable;
    }

}