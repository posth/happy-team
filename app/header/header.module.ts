import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { HeaderService } from './header.service';

import { MaterialModule } from '@angular/material';

import { routing } from "../app.routing";

@NgModule({
    declarations: [
        HeaderComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        routing
    ],
    exports: [
        HeaderComponent
    ],
    providers: [
        HeaderService
    ]
})
export class HeaderModule {}