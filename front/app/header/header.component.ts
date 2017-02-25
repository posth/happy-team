import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "../auth/auth.service";
import { AdminService } from '../admin/admin.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    private adminStatus: boolean;

    constructor(private router: Router,
        private _authService: AuthService,
        private _adminService: AdminService) { }

    ngOnInit() { 
        this._adminService.getAdminStatus()
            .subscribe(
                (adminStatus: boolean) => {
                    this.adminStatus = adminStatus;
                    console.log('admin status is ', this.adminStatus);
                }
            );
    }

    goAdmin(): void {
        this.router.navigate(['/', 'admin']);
    }

    goTeam(): void {
        this.router.navigate(['/', 'team']);
    }

    goUser(): void {
        this.router.navigate(['/', 'user']);
    }

    isLoggedIn(): boolean {
        return this._authService.isLoggedIn();
    }
}