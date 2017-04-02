import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from '../auth/auth.module';
import { MaterialModule } from '@angular/material';
import { HealthModule} from '../widgets/health/health.module';
import { GoalsModule } from '../widgets/goals/goals.module';
import { HeaderModule } from '../header/header.module';

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
        MaterialModule,
        HealthModule,
        GoalsModule,
        HeaderModule
    ],
    exports: [
        AdminComponent
    ]
})
export class AdminModule {}