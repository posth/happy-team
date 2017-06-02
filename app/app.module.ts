import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { ReactiveFormsModule } from '@angular/forms';
import { HealthModule } from './widgets/health/health.module';
import { AuthModule } from './auth/auth.module';
import { HeaderModule } from './header/header.module';
import { AdminModule } from './admin/admin.module';
import { MaterialModule } from '@angular/material';

import { routing } from "./app.routing";

import { AuthService } from "./auth/auth.service";
import { ErrorService } from "./errors/error.service";
import { AdminService } from './admin/admin.service';
import { UserStatusService } from './user/user-status.service';
import { ErrorComponent } from "./errors/error.component";

//Views
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { TeamComponent } from './team/team.component';

//Main component
import { AppComponent } from "./app.component";

@NgModule({
    declarations: [
        AppComponent,
        ErrorComponent,
        UserComponent,
        TeamComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        routing,
        HttpModule,
        ReactiveFormsModule,
        HealthModule,
        AuthModule,
        HeaderModule,
        AdminModule,
        MaterialModule
    ],
    providers: [
        AuthService,
        ErrorService,
        AdminService,
        UserStatusService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }