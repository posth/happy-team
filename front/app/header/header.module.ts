import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './logout/logout.component';
import { HeaderComponent } from './header.component';

@NgModule({
    declarations: [
        LogoutComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        HeaderComponent
    ]
})
export class HeaderModule {}