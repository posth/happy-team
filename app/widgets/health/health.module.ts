import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { HealthComponent } from './health.component';
import { HealthUserComponent } from './health-user/health-user.component';

import { HealthService } from './health.service';

@NgModule({
    declarations: [
        HealthComponent,
        HealthUserComponent
    ],
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [
        HealthComponent,
        HealthUserComponent
    ],
    providers: [
        HealthService
    ]
})

export class HealthModule { }
