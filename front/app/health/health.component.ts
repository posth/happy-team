import { Component, OnInit } from "@angular/core";

import { HealthService } from './health.service';
import { Health } from './health.model';

@Component({
    selector: 'app-health',
    templateUrl: './health.component.html',
    providers: [HealthService]
})

export class HealthComponent implements OnInit {

    private healths: Health[];

    constructor(private _healthService: HealthService) { }

    ngOnInit() {
        this._healthService.getHealth()
            .subscribe(
                (healths: Health[]) => {
                    this.healths = healths;
                }
            );

        console.log(this.healths);
    }
    
}