import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HealthComponent } from './health.component';

@NgModule({
    declarations: [
        HealthComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        HealthComponent
    ],
    providers: []
})

export class HealthModule { }
