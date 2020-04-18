import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './components/footer/footer.component';

const childRoutes: Route[] = [{ path: '', component: HomeComponent }];

@NgModule({
    declarations: [HomeComponent, FooterComponent],
    imports: [CommonModule, RouterModule.forChild(childRoutes)]
})
export class HomeModule {}
