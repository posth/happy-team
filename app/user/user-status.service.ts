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
            this.setAdminStatusFromService();
            this.setLoggedInStatusFromService();
        });

    }

    canActivate() {
        if(this.isLoggedInValue.value === false) {
            this.router.navigateByUrl('/signin');
            return this.isLoggedInValue.value;
        } else {
            return this.isLoggedInValue.value;
        }
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
        this.isLoggedInValue.next(loggedInStatus);
    }
}