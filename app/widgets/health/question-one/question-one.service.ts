import { Http, Response } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Health } from "../health.model";
import { ErrorService } from "../../../errors/error.service";

import * as io from 'socket.io-client';

//Config
import { ConfigService } from "../../../config.service";

@Injectable()
export class QuestionOneService {

    private healths: Health[];
    userQuestionOneValueIsEdit = new EventEmitter<Health>();

    private socket: any = null;

    latestTeamQuestionOneValue: BehaviorSubject<number> = new BehaviorSubject<number>(undefined);
    latestTeamQuestionOneValueChanged$: Observable<number> = this.latestTeamQuestionOneValue.asObservable();

    constructor(private http: Http,
        private errorService: ErrorService,
        private configService: ConfigService) {
        this.socket = io(this.configService.getServerPath());
        this.socket.on('getlatestTeamQuestionOneValue', function (latestTeamQuestionOneValue) {
            this.latestTeamQuestionOneValue.next(latestTeamQuestionOneValue);
        }.bind(this));
    }

    addQuestionOneUserValue(userHealth: number) {

        const token = sessionStorage.getItem('token')
            ? '?token=' + sessionStorage.getItem('token')
            : '';

        const healthToSend = {
            userHealth: userHealth,
            token: token
        }

        this.socket.emit('questionOneUpdate', healthToSend);
    }

    //Getting all the users past healths
    getQuestionOneValues() {
        return this.http.get(this.configService.getServerPath() + '/health')
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

        const userId = sessionStorage.getItem('userId')
            ? '?id=' + sessionStorage.getItem('userId')
            : '';

        return this.http.get(this.configService.getServerPath() + '/health/latest' + userId)
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

        return this.http.get(this.configService.getServerPath() + '/health/team')
            .map((response: Response) => {
                const mostRecentTeamHealthObject = response.json().obj;
                //returns a number of the team health
                return mostRecentTeamHealthObject;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
}