import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { User } from "../user/user.model";
import { ErrorService } from "../errors/error.service";

import { ConfigService } from "../config.service";

@Injectable()
export class AdminService {

    private users: User[] = [];

    constructor(private http: Http,
        private errorService: ErrorService,
        private configService: ConfigService
    ) { }

    getAdminStatus() {

        const userId = sessionStorage.getItem('userId')
            ? '?id=' + sessionStorage.getItem('userId')
            : '';

        return this.http.get(this.configService.getServerPath() + '/admin' + userId)
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

        return this.http.get(this.configService.getServerPath() + '/admin/users')
            .map((response: Response) => {

                const users = response.json().obj;

                let transformedUsers: User[] = [];

                for (let user of users) {
                    transformedUsers.push(new User(
                        user.email,
                        user.password,
                        user.firstName,
                        user.lastName,
                        user.admin,
                        user.healths,
                        user._id
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