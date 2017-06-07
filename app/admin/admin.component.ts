import { Component, OnInit } from '@angular/core';
import { User } from '../user/user.model';
import { AdminService } from './admin.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls:  ['./admin.component.css']
})
export class AdminComponent implements OnInit {

    users: User[];

    constructor(private _adminService: AdminService) { }

    ngOnInit() { 
        this._adminService.getUsersList()
            .subscribe(
                (users: User[]) => {
                    this.users = users;
                }
            );
    }
}