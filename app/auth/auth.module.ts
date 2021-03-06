import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { HeaderModule } from '../header/header.module';

import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "../auth/signup/signup.component";

@NgModule({
    declarations: [
        SigninComponent,
        SignupComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        HeaderModule
    ],
    exports: [
        SigninComponent,
        SignupComponent
    ]
})
export class AuthModule { }