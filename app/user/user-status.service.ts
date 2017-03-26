import { Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';

import 'rxjs/Rx';
import { Observable } from "rxjs";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AdminService } from '../admin/admin.service';

@Injectable()
export class UserStatusService implements CanActivate{

    adminStatusValue: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    adminStatusValueChanged$: Observable<boolean> = this.adminStatusValue.asObservable();

    isLoggedInValue: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isLoggedInValueChanged$: Observable<boolean> = this.isLoggedInValue.asObservable();

    constructor(private _adminService: AdminService, private router: Router) {
        this.router.events.pairwise().subscribe((event) => {
            console.log('changing route');
            this.setAdminStatusFromService();
            this.setLoggedInStatusFromService();
        });

    }

    canActivate() {
        console.log('admin status from user status sevice is can activate', this.adminStatusValue.value);
        return this.adminStatusValue.value;
    }

    setAdminStatusFromService() {
        this._adminService.getAdminStatus()
            .subscribe(
            (adminStatus: boolean) => {
                this.adminStatusValue.next(adminStatus);
                this.canActivate();
            }
            );
    }

    setLoggedInStatusFromService() {
        let loggedInStatus = sessionStorage.getItem('token') ? true : false;
        console.log('logged in status of user ', loggedInStatus)
        this.isLoggedInValue.next(loggedInStatus);
    }
}