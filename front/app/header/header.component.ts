import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { Subscription } from 'rxjs/Subscription';

import { AuthService } from "../auth/auth.service";
import { AdminService } from '../admin/admin.service';
import { HeaderService } from '../header/header.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    private adminStatus: boolean;
    _adminStatusSubscription: Subscription;

    constructor(private router: Router,
        private _authService: AuthService,
        private _adminService: AdminService,
        private _headerService: HeaderService) {
        this._adminStatusSubscription = this._headerService.adminStatusValueChanged$.subscribe(
            adminStatusValue => this.adminStatus = adminStatusValue
        );
    }

    ngOnInit() { }

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