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

    //Team range input disable
    private teamInputDisable: boolean;
    private teamHealthValue: number;
    _teamHealthValueSubscription: Subscription;

    constructor(private _healthService: HealthService,
        private _authService: AuthService) {

        this.teamInputDisable = true;

        //Subscribing to the health service for the team health value when it changes
        this._teamHealthValueSubscription = this._healthService.teamHealthValueChanged$.subscribe(
            teamHealthValue => this.teamHealthValue = teamHealthValue
        );
    }

    ngOnInit() {
        this._healthService.getHealth()
            .subscribe(
            (healths: Health[]) => {
                this.healths = healths;
            }
            );

        //Is there health for this user available already?
        console.log(this.healths);

        //If there is no user health it sets the value by default at 50
        if (!this.healths) {
            this.userHealthValue = 50;
        }

    }

    isLoggedIn() {
        return this._authService.isLoggedIn();
    }

    setUserHealth(userHealth: number) {
        const health = new Health(userHealth);
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