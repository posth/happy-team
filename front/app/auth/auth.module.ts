import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "../auth/signup/signup.component";
import { LogoutComponent } from "./logout/logout.component";
// import { authRouting } from "./auth.routing";

@NgModule({
    declarations: [
        SigninComponent,
        SignupComponent,
        LogoutComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        LogoutComponent,
        SigninComponent
    ]
})
export class AuthModule {}