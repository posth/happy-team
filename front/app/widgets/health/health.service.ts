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
        const body = JSON.stringify(health);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post('http://localhost:3000/health' + token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const health = new Health(
                    result.obj.value
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
                        health.value
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