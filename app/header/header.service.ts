import { Injectable } from '@angular/core';

import 'rxjs/Rx';
import { Observable } from "rxjs";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AdminService } from '../admin/admin.service';

@Injectable()
export class HeaderService {

    // adminStatusValue: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    // adminStatusValueChanged$: Observable<boolean> = this.adminStatusValue.asObservable();

    constructor(private _adminService: AdminService) {

        // this.setAdminStatusFromService();

    }

    // setAdminStatusFromService() {
    //     this._adminService.getAdminStatus()
    //         .subscribe(
    //         (adminStatus: boolean) => {
    //             this.adminStatusValue.next(adminStatus);
    //         }
    //         );
    // }
}