import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { User } from "../auth/user.model";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class AdminService {
    constructor(private http: Http, private errorService: ErrorService) { }

    //TO DO - get admin status of current user on login and display admin button in header component

}