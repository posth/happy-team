import { Http, Response } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Health } from "../health.model";
import { ErrorService } from "../../../errors/error.service";

import * as io from 'socket.io-client';

@Injectable()
export class QuestionTwoService {

    private healths: Health[];
    userQuestionTwoValueIsEdit = new EventEmitter<Health>();

    private url: string = 'http://localhost:3000';
    private socket: any = null;

    // private latestTeamQuestionTwoValue: number;
    latestTeamQuestionTwoValue: BehaviorSubject<number> = new BehaviorSubject<number>(undefined);
    latestTeamQuestionTwoValueChanged$: Observable<number> = this.latestTeamQuestionTwoValue.asObservable();

    constructor(private http: Http, private errorService: ErrorService) {
        this.socket = io(this.url);
        this.socket.on('getlatestTeamQuestionTwoValue', function (latestTeamQuestionTwoValue) {
            this.latestTeamQuestionTwoValue.next(latestTeamQuestionTwoValue);
        }.bind(this));
    }

    addQuestionTwoUserValue(userHealth: number) {

        const token = sessionStorage.getItem('token')
            ? '?token=' + sessionStorage.getItem('token')
            : '';

        const healthToSend = {
            userHealth: userHealth,
            token: token
        }

        this.socket.emit('questionTwoUpdate', healthToSend);
    }

    //Getting all the users past healths
    getQuestionTwoValues() {
        return this.http.get('http://localhost:3000/questiontwo')
            .map((response: Response) => {
                const healths = response.json().obj;
                let transformedHealths: Health[] = [];
                for (let health of healths) {
                    transformedHealths.push(new Health(
                        health.userQuestionTwoValue,
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
    getUserMostRecentQuestionTwoValue() {

        const userId = sessionStorage.getItem('userId')
            ? '?id=' + sessionStorage.getItem('userId')
            : '';

        return this.http.get('http://localhost:3000/questiontwo/latest' + userId)
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
    getMostRecentTeamQuestionTwoValue() {

        return this.http.get('http://localhost:3000/questiontwo/team')
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