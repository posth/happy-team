import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from "./widgets/messages/message.module";
import { HealthModule } from './widgets/health/health.module';
import { AuthModule } from './auth/auth.module';
import { HeaderModule } from './header/header.module';
import { AdminModule } from './admin/admin.module';
import { MaterialModule } from '@angular/material';

import { routing } from "./app.routing";

import { AuthService } from "./auth/auth.service";
import { ErrorService } from "./errors/error.service";
import { AdminService } from './admin/admin.service';
import { HeaderService } from './header/header.service';

import { AuthenticationComponent } from "./auth/authentication.component";
import { ErrorComponent } from "./errors/error.component";
import { UserComponent } from './user/user.component';
import { TeamComponent } from './team/team.component';

//Main component
import { AppComponent } from "./app.component";

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        ErrorComponent,
        UserComponent,
        TeamComponent
    ],
    imports: [
        BrowserModule,
        routing,
        HttpModule,
        MessageModule,
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
        HeaderService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }