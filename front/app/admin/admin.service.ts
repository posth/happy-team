import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { User } from "../auth/user.model";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class AdminService {
    constructor(private http: Http, private errorService: ErrorService) { }

    getAdminStatus() {

        const userId = localStorage.getItem('userId')
            ? '?id=' + localStorage.getItem('userId')
            : '';

        return this.http.get('http://localhost:3000/admin' + userId)
            .map((response: Response) => {
                const adminStatus = response.json().obj;

                return adminStatus;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
}