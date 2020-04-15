import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavigationTreeComponent, NavigationMenuComponent, SearchComponent } from './components';
import { ClickOutsideDirective } from './directives';
import { NgDocxComponent } from './containers';
import { ConfigInterface } from './models';
import { MarkdownModule } from 'ngx-markdown';

const childRoutes: Route[] = [{ path: '', component: NgDocxComponent }];

@NgModule({
    declarations: [
        NgDocxComponent,
        NavigationTreeComponent,
        NavigationMenuComponent,
        SearchComponent,
        ClickOutsideDirective
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(childRoutes),
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
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
