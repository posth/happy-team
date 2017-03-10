import { Component, OnInit } from "@angular/core";

import { HealthService } from './health.service';
import { Health } from './health.model';

import { AuthService } from '../../auth/auth.service';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'app-health',
    templateUrl: './health.component.html',
    styleUrls: ['./health.component.css']
})

export class HealthComponent implements OnInit {

    //User health variables
    private healths: Health[];

    //Team range input disable
    private teamInputDisable: boolean;
    private teamHealthValue: number = 0;

    //Team data subscriptions for live data feed
    private teamHealthSubscription: Subscription;

    constructor(private _healthService: HealthService,
        private _authService: AuthService) {

        this.teamInputDisable = true;

        this.teamHealthSubscription = this._healthService.latestTeamHealthValueChanged$.subscribe(
            latestTeamHealthValue => this.teamHealthValue = latestTeamHealthValue
        );

        this._healthService.getMostRecentTeamHealth()
            .subscribe(
                (mostRecentTeamHealthObject: number) => {
                    this.teamHealthValue = mostRecentTeamHealthObject
                }
            )

    }

    ngOnInit() {}
 
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