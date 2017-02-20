import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from "rxjs";
import 'rxjs/Rx';

import { Health } from "./health.model";
import { ErrorService } from "../../errors/error.service";

@Injectable()
export class HealthService {

    //Team variables
    teamHealthValue: BehaviorSubject<number> = new BehaviorSubject<number>(null);
    teamHealthValueChanged$: Observable<number> = this.teamHealthValue.asObservable();

    private healths: Health[];
    userHealthValueIsEdit = new EventEmitter<Health>();

    constructor(private http: Http, private errorService: ErrorService) { 
        //Getting the past team health on service instantiation 
        this.getTeamHealth();
    }

    //Adding individual health of the user
    addHealth(health: Health) {
        // Convert the message into a JSON object.
        const body = JSON.stringify(health);
        // Ensure we're sending JSON as that's what the backend is expecting - pass it as a third parameter in the http post service request
        const headers = new Headers({'Content-Type': 'application/json'});
        // Sending the token along with the request in a query string in the URL, if it exists
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        /**
         * This sets up the Observable and doesn't send the request.
         * Someone needs to subscribe to this observable for it to send.
         * It returns from the server a response as a json object, only gives you 
         * the data which is attached to the response and converts it to JSON
         */
        return this.http.post('http://localhost:3000/health' + token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const health = new Health(
                    result.obj.currentHealth,
                    result.obj._id,
                    result.obj.user._id
                );
                this.healths.push(health);
                return health;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    //Getting individual health of the user
    getHealth() {
        return this.http.get('http://localhost:3000/health')
            .map((response: Response) => {
                const healths = response.json().obj;
                let transformedHealths: Health[] = [];
                for (let health of healths) {
                    transformedHealths.push(new Health(
                        health.value,
                        health._id,
                        health.user_id
                    ));
                }
                this.healths = transformedHealths;
                return transformedHealths;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    //Getting team health calculation
    getTeamHealth(): void {
        this.teamHealthValue.next(100);
    }
}