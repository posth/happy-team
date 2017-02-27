import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from '../auth/auth.module';
import { MaterialModule } from '@angular/material';

import { AdminComponent } from './admin.component';
import { AdminUserDescriptionComponent } from './admin-user-description/admin-user-description.component';

@NgModule({
    declarations: [
        AdminComponent,
        AdminUserDescriptionComponent
    ],
    imports: [
        CommonModule,
        AuthModule,
        MaterialModule
    ],
    exports: [
        AdminComponent
    ]
})
export class AdminModule {}