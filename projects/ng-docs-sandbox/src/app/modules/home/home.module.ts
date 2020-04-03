import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const childRoutes: Route[] = [{ path: '', component: HomeComponent }];

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, RouterModule.forChild(childRoutes)]
})
export class HomeModule {}
