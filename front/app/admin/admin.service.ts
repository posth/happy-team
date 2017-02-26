import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { User } from "../user/user.model";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class AdminService {

    private users: User[] = [];

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

    //Get all users in Mongo
    getUsersList() {

        return this.http.get('http://localhost:3000/admin/users')
            .map((response: Response) => {

                const users = response.json().obj;

                let transformedUsers: User[] = [];

                for(let user of users) {
                    console.log('service', user);
                    transformedUsers.push(new User(
                        user.email,
                        '',
                        user.firstName,
                        user.lastName,
                        user.admin,
                        user.healths,
                        user.messages
                    ))
                }

                return transformedUsers;
            })

            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            })

    }
}