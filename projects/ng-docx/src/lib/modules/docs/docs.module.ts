import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgDocxComponent } from './containers/docs/docs.component';
import { Route, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { NavigationTreeComponent } from './components';

const childRoutes: Route[] = [{ path: '', component: NgDocxComponent }];

@NgModule({
    declarations: [NgDocxComponent, NavigationTreeComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(childRoutes),
        MatSidenavModule,
        MatExpansionModule,
        HttpClientModule,
        MarkdownModule.forRoot({ loader: HttpClient })
    ]
})
export class NgDocsModule {}
