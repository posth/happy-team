import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Health } from "../health.model";
import { ErrorService } from "../../../errors/error.service";

import * as io from 'socket.io-client';

@Injectable()
export class QuestionOneService {

    private healths: Health[];
    userQuestionOneValueIsEdit = new EventEmitter<Health>();

    private url: string = 'http://localhost:3000';
    private socket: any = null;

    // private latestTeamQuestionOneValue: number;
    latestTeamQuestionOneValue: BehaviorSubject<number> = new BehaviorSubject<number>(undefined);
    latestTeamQuestionOneValueChanged$: Observable<number> = this.latestTeamQuestionOneValue.asObservable();

    constructor(private http: Http, private errorService: ErrorService) {
        this.socket = io(this.url);
        this.socket.on('getlatestTeamQuestionOneValue', function (latestTeamQuestionOneValue) {
            this.latestTeamQuestionOneValue.next(latestTeamQuestionOneValue);
            console.log('question one service latest value from socket ------>', this.latestTeamQuestionOneValue.value);
        }.bind(this));
    }

    addQuestionOneUserValue(userHealth: number) {

        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        const healthToSend = {
            userHealth: userHealth,
            token: token
        }

        this.socket.emit('questionOneUpdate', healthToSend);
    }

    //Getting all the users past healths
    getQuestionOneValues() {
        return this.http.get('http://localhost:3000/health')
            .map((response: Response) => {
                const healths = response.json().obj;
                let transformedHealths: Health[] = [];
                for (let health of healths) {
                    transformedHealths.push(new Health(
                        health.currentHealth,
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

    //Getting the users most recent health
    getUserMostRecentQuestionOneValue() {

        const userId = localStorage.getItem('userId')
            ? '?id=' + localStorage.getItem('userId')
            : '';

        return this.http.get('http://localhost:3000/health/latest' + userId)
            .map((response: Response) => {
                const mostRecentHealthObject = response.json().obj;
                return mostRecentHealthObject;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    //Getting the team most recent health
    getMostRecentTeamQuestionOneValue() {

        return this.http.get('http://localhost:3000/health/team')
            .map((response: Response) => {
                const mostRecentTeamHealthObject = response.json().obj;
                //returns a number of the team health
                console.log('-------- getting most recent health on init', mostRecentTeamHealthObject);
                return mostRecentTeamHealthObject;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
}