import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavigationTreeComponent, NavigationMenuComponent } from './components';
import { NgDocxComponent } from './containers';
import { ConfigInterface } from './models';
import { MarkdownModule } from 'ngx-markdown';

const childRoutes: Route[] = [{ path: '', component: NgDocxComponent }];

@NgModule({
    declarations: [NgDocxComponent, NavigationTreeComponent, NavigationMenuComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(childRoutes),
        MatSidenavModule,
        MatExpansionModule,
        HttpClientModule,
        MarkdownModule.forRoot({ loader: HttpClient })
    ]
})
export class NgDocxModule {
    static forRoot(configuration: ConfigInterface): ModuleWithProviders {
        return {
            ngModule: NgDocxModule,
            providers: [{ provide: 'config', useValue: configuration }]
        };
    }
}
