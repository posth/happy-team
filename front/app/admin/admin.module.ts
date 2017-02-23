import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from '../auth/auth.module';

import { AdminComponent } from './admin.compontent';

@NgModule({
    declarations: [
        AdminComponent
    ],
    imports: [
        CommonModule,
        AuthModule
    ],
    exports: [
        AdminComponent
    ]
})
export class AdminModule {}