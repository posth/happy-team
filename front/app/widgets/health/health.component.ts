import { Component, OnInit } from "@angular/core";

import { HealthService } from './health.service';
import { Health } from './health.model';

import { AuthService } from '../../auth/auth.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-health',
    templateUrl: './health.component.html',
    providers: [HealthService]
})

export class HealthComponent implements OnInit {

    //User health variables
    private healths: Health[];
    private userHealthValue: number;
    private mostRecentHealthObject: Object;

    //Team range input disable
    private teamInputDisable: boolean;
    private teamHealthValue: number;

    constructor(private _healthService: HealthService,
        private _authService: AuthService) {

        this.teamInputDisable = true;
    }

    ngOnInit() {
        // this._healthService.getHealth()
        //     .subscribe(
        //     (healths: Health[]) => {
        //         this.healths = healths;
        //     }
        //     );

        this._healthService.getMostRecentHealth()
            .subscribe(
            (mostRecentHealthObject: Object) => {
                this.mostRecentHealthObject = mostRecentHealthObject;
            }
            );
    }

    isLoggedIn() {
        return this._authService.isLoggedIn();
    }

    setUserHealth(userHealth: number) {
        const health = new Health(userHealth);

        //Adding the health through the service to connect it to Mongo
        this._healthService.addHealth(health)
            .subscribe(
            data => console.log(data)
            );
    }

    //Setters and getters for team part
    setTeamInputDisable(teamDisableInput: boolean) {
        this.teamInputDisable = teamDisableInput;
    }

    getTeamInputDisable(): boolean {
        return this.teamInputDisable;
    }

}