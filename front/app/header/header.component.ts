import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from "../auth/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(private router: Router, private _authService: AuthService) { }

    ngOnInit() { }

    isAdmin(): boolean {
        return true;
    }

    goAdmin(): void {
        this.router.navigate(['/', 'admin']);
    }

    goTeam(): void {
        this.router.navigate(['/', 'team']);
    }

    isLoggedIn(): boolean {
        return this._authService.isLoggedIn();
    }
}