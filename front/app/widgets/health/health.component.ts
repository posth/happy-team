import { Component, OnInit } from "@angular/core";

import { HealthService } from './health.service';
import { Health } from './health.model';

import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-health',
    templateUrl: './health.component.html',
    providers: [HealthService]
})

export class HealthComponent implements OnInit {

    private healths: Health[];

    constructor(private _healthService: HealthService,
                private _authService: AuthService) { }

    ngOnInit() {
        this._healthService.getHealth()
            .subscribe(
                (healths: Health[]) => {
                    this.healths = healths;
                }
            );
    }

    isLoggedIn() {
        return this._authService.isLoggedIn();
    }

    setUserHealth(userHealth: number) {
        const health = new Health(userHealth);
        this._healthService.addHealth(health)
        .subscribe(
            data => console.log(data)
        );
    }
    
}