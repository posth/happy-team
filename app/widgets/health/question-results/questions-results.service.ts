import { Http, Response, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';

import { ErrorService } from '../../../errors/error.service';

import { TeamHealth } from '../teamHealth.model';

//Config
import { ConfigService } from "../../../config.service";

@Injectable()
export class QuestionResultsService {

    constructor(private _http: Http,
        private _errorService: ErrorService,
        private configService: ConfigService) { }

    getAllQuestionOneValues() {

        // TODO - an object with a start and end date to receive as a parameter 
        // to this function to precise a range of results based on dates -> To send as part of the POST
        // const dates = JSON.stringify(dateRange);

        //setting Headers
        const headers = new Headers({ 'Content-Type': 'application/json' });

        return this._http.post(this.configService.getServerPath() + '/health/teamhealths', { headers: headers })
            .map((response: Response) => {
                const questionOneTeamValuesResult = response.json();

                let questionOneTeamValuesHealths: TeamHealth[] = [];

                for (let questionOneValue of questionOneTeamValuesResult.obj) {
                    questionOneTeamValuesHealths.push(new TeamHealth(
                        questionOneValue.teamHealth,
                        questionOneValue.currentTime
                    ));
                }

                return questionOneTeamValuesHealths;
            })
            .catch((error: Response) => {
                this._errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getAllQuestionTwoValues() {

        // TODO - an object with a start and end date to receive as a parameter 
        // to this function to precise a range of results based on dates -> To send as part of the POST
        // const dates = JSON.stringify(dateRange);

        //setting Headers
        const headers = new Headers({ 'Content-Type': 'application/json' });

        return this._http.post(this.configService.getServerPath() + '/questiontwo/questiontwoteamvalues', { headers: headers })
            .map((response: Response) => {
                const questionTwoTeamValuesResult = response.json();

                let questionTwoTeamValuesHealths: TeamHealth[] = [];

                for (let questionTwoValue of questionTwoTeamValuesResult.obj) {
                    questionTwoTeamValuesHealths.push(new TeamHealth(
                        questionTwoValue.teamQuestionTwoValue,
                        questionTwoValue.currentTime
                    ));
                }

                return questionTwoTeamValuesHealths;
            })
            .catch((error: Response) => {
                this._errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    getAllQuestionThreeValues() {

        // TODO - an object with a start and end date to receive as a parameter 
        // to this function to precise a range of results based on dates -> To send as part of the POST
        // const dates = JSON.stringify(dateRange);

        //setting Headers
        const headers = new Headers({ 'Content-Type': 'application/json' });

        return this._http.post(this.configService.getServerPath() + '/questionthree/questionthreeteamvalues', { headers: headers })
            .map((response: Response) => {
                const questionThreeTeamValuesResult = response.json();

                let questionThreeTeamValuesHealths: TeamHealth[] = [];

                for (let questionThreeValue of questionThreeTeamValuesResult.obj) {
                    questionThreeTeamValuesHealths.push(new TeamHealth(
                        questionThreeValue.teamQuestionThreeValue,
                        questionThreeValue.currentTime
                    ));
                }

                return questionThreeTeamValuesHealths;
            })
            .catch((error: Response) => {
                this._errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

}