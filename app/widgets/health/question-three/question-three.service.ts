import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Health } from "../health.model";
import { ErrorService } from "../../../errors/error.service";

import * as io from 'socket.io-client';

//Config
import { ConfigService } from "../../../config.service";

@Injectable()
export class QuestionThreeService {

    private healths: Health[];
    private socket: any = null;

    latestTeamQuestionThreeValue: BehaviorSubject<number> = new BehaviorSubject<number>(undefined);
    latestTeamQuestionThreeValueChanged$: Observable<number> = this.latestTeamQuestionThreeValue.asObservable();

    constructor(private http: Http,
        private errorService: ErrorService,
        private configService: ConfigService) {
        this.socket = io(this.configService.getServerPath());
        this.socket.on('getlatestTeamQuestionThreeValue', function (latestTeamQuestionThreeValue) {
            this.latestTeamQuestionThreeValue.next(latestTeamQuestionThreeValue);
        }.bind(this));
    }

    addQuestionThreeUserValue(userHealth: number) {

        const token = sessionStorage.getItem('token')
            ? '?token=' + sessionStorage.getItem('token')
            : '';

        const healthToSend = {
            userHealth: userHealth,
            token: token
        }

        this.socket.emit('questionThreeUpdate', healthToSend);
    }

    getQuestionThreeValues() {
        return this.http.get(this.configService.getServerPath() + '/questionthree')
            .map((response: Response) => {
                const healths = response.json().obj;
                let transformedHealths: Health[] = [];
                for (let health of healths) {
                    transformedHealths.push(new Health(
                        health.userQuestionThreeValue,
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

    getUserMostRecentQuestionThreeValue() {

        const userId = sessionStorage.getItem('userId')
            ? '?id=' + sessionStorage.getItem('userId')
            : '';

        return this.http.get(this.configService.getServerPath() + '/questionthree/latest' + userId)
            .map((response: Response) => {
                const mostRecentHealthObject = response.json().obj;
                return mostRecentHealthObject;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getMostRecentTeamQuestionThreeValue() {

        return this.http.get(this.configService.getServerPath() + '/questionthree/team')
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