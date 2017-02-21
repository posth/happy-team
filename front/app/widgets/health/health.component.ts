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
    private mostRecentTeamHealthObject: Object;

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

        //On init of this component grab the specific logged in user's latest health
        this.getMostRecentUserHealth();

        //On init of this component grab the team's most recent health average
        this.getMostRecentTeamHealth();

    }

    //Getting individual most recent health from MongoDB
    getMostRecentUserHealth() {
        this._healthService.getMostRecentHealth()
            .subscribe(
            (mostRecentHealthObject: Object) => {

                //Grab the most recent health object from the db on initialization of this component    
                this.mostRecentHealthObject = mostRecentHealthObject;

                if (this.mostRecentHealthObject['currentHealth']) {
                    //Grab the health value from the object
                    this.userHealthValue = this.mostRecentHealthObject['currentHealth'];
                }

            }
            );
    }

    //Getting the team health average from MongoDB
    getMostRecentTeamHealth() {
        this._healthService.getMostRecentTeamHealth()
            .subscribe(
            (mostRecentTeamHealthObject: Object) => {
                this.mostRecentTeamHealthObject = mostRecentTeamHealthObject;

                //TODO manage null/undefined/non-existent object
                console.log('front end most recent team health object ->', this.mostRecentTeamHealthObject);


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

        //Grab most recent user input of individual health from MongoDB for the component to have just in case
        this.getMostRecentUserHealth();

        //Regrab the team average after new user input
        this.getMostRecentTeamHealth();
    }

    //Setters and getters for team part
    setTeamInputDisable(teamDisableInput: boolean) {
        this.teamInputDisable = teamDisableInput;
    }

    getTeamInputDisable(): boolean {
        return this.teamInputDisable;
    }

}