import { Http, Response, Headers } from "@angular/http";
import { Injectable } from "@angular/core";

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import * as io from "socket.io-client";

//Services
import { ErrorService } from "../../errors/error.service";

//Models
import { Goal } from "./goal.model";

@Injectable()
export class GoalsService {

    //TODO need to stop creating individual variables per component - need a config service!
    private url: string = "http://localhost:3000";
    private socket: any = null;

    // team goals which will be populated from the db 
    private goals: Goal[];

    allTeamGoals: BehaviorSubject<Goal[]> = new BehaviorSubject<Goal[]>(undefined);
    allTeamGoalsChanged$: Observable<Goal[]> = this.allTeamGoals.asObservable();

    constructor(private _http: Http, private _errorService: ErrorService) {
        this.socket = io(this.url);
        this.socket.on('getTeamGoals', function (allTeamGoals) {
            console.log('all team goals are -> ', allTeamGoals);
            this.allTeamGoals.next(allTeamGoals);
        }.bind(this));
    }

    addTeamGoal(goal: Goal) {
        this.socket.emit('addTeamGoal', goal);
    }

    deleteTeamGoal(goal: Goal) {
        this.socket.emit('deleteTeamGoal', goal);
    }

    getTeamGoals() {
        return this._http.get('http://localhost:3000/goals')
            .map((response: Response) => {

                //TODO currently it is empty but to check if empty with lodash else map it
                const goals = response.json().obj;
                let transformedGoals: Goal[] = [];

                console.log('---team goals are -> ', goals);

                for (let goal of goals) {
                    transformedGoals.push(new Goal(
                        goal.content,
                        goal.completed,
                        goal.date,
                        goal._id
                    ));
                }

                this.goals = transformedGoals;
                return transformedGoals;
            })
            .catch((error: Response) => {
                this._errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
}