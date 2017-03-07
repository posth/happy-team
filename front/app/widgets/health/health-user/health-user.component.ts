import { Component, OnInit } from "@angular/core";

import { HealthService } from '../health.service';
import { Health } from '../health.model';

import { AuthService } from '../../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

import * as io from 'socket.io-client';

@Component({
    selector: 'app-health-user',
    templateUrl: './health-user.component.html',
    styleUrls: ['./health-user.component.css']
})

export class HealthUserComponent implements OnInit {

    //User health variables
    private healths: Health[];
    private userHealthValue: number;
    private mostRecentHealthObject: Object;

    private url: string = 'http://localhost:3000';
    socket: any = null;

    constructor(private _healthService: HealthService,
        private _authService: AuthService) {
        this.socket = io(this.url);
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
    }

    //Getting individual most recent health from MongoDB
    getMostRecentUserHealth() {
        this._healthService.getMostRecentHealth()
            .subscribe(
            (mostRecentHealthObject: Object) => {

                //Grab the most recent health object from the db on initialization of this component    
                this.mostRecentHealthObject = mostRecentHealthObject;

                if (this.mostRecentHealthObject) {
                    //Grab the health value from the object
                    this.userHealthValue = this.mostRecentHealthObject['currentHealth'];
                }

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

        // this.socket.emit('healthUpdate');
    }
}