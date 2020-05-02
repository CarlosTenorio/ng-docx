import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
    NavigationTreeComponent,
    NavigationMenuComponent,
    SearchComponent,
    VersioningComponent,
    EditButtonComponent
} from './components';
import { ClickOutsideDirective } from './directives';
import { NgDocxComponent } from './containers';
import { ConfigInterface } from './models';
import { MarkdownModule } from 'ngx-markdown';
import { FileSystemService } from './services/file-system/file-system.service';

const childRoutes: Route[] = [{ path: '', component: NgDocxComponent }];

@NgModule({
    declarations: [
        NgDocxComponent,
        NavigationTreeComponent,
        NavigationMenuComponent,
        SearchComponent,
        ClickOutsideDirective,
        VersioningComponent,
        EditButtonComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(childRoutes),
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        HttpClientModule,
        MarkdownModule.forRoot({ loader: HttpClient })
    ],
    providers: [FileSystemService]
})
export class NgDocxModule {
    static forRoot(configuration: ConfigInterface): ModuleWithProviders {
        return {
            ngModule: NgDocxModule,
            providers: [{ provide: 'config', useValue: configuration }]
        };
    }
}
