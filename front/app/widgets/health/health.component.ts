import { Component, OnInit, OnDestroy } from "@angular/core";

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

export class HealthComponent implements OnInit, OnDestroy {

    //User health variables
    private healths: Health[];

    //Team range input disable
    private teamInputDisable: boolean;
    private teamHealthValue: number;

    //Team data subscriptions for live data feed
    private teamHealthSubscription: Subscription;
    private timerSubscription: Subscription;

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
        this._healthService.getMostRecentTeamHealth()
            .subscribe(
                (teamHealthValue: number) => {
                    this.teamHealthValue = teamHealthValue;
                    this.refreshTeamHealth();
                }
            );
    }

    //Unsubscribe on component destruction to prevent memory leak   
    ngOnDestroy() {
        if(this.teamHealthSubscription) {
            this.teamHealthSubscription.unsubscribe();
        }
        if(this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }
    }

    refreshTeamHealth(): void {
        this.teamHealthSubscription = this._healthService.getMostRecentTeamHealth().subscribe(teamHealthValue => {
            this.teamHealthValue = teamHealthValue;
            this.subscribeToRecentTeamHealth();
        })
    }

    subscribeToRecentTeamHealth(): void {
        this.timerSubscription = Observable.timer(1000).first().subscribe(() => this.refreshTeamHealth());
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