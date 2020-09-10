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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown/';
import { FileSystemService } from './services/file-system/file-system.service';
import { NavigationTreeComponent } from './components/navigation-tree/navigation-tree.component';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';
import { SearchComponent } from './components/search/search.component';
import { VersioningComponent } from './components/versioning/versioning.component';
import { EditButtonComponent } from './components/edit-button/edit-button.component';
import { SnackBarCopyComponent } from './components/snack-bar-copy/snack-bar-copy.component';
import { NgDocxComponent } from './containers/docs/docs.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { ConfigInterface } from './models/configInterface';

const childRoutes: Route[] = [{ path: '', component: NgDocxComponent }];

@NgModule({
    declarations: [
        NgDocxComponent,
        NavigationTreeComponent,
        NavigationMenuComponent,
        SearchComponent,
        ClickOutsideDirective,
        VersioningComponent,
        EditButtonComponent,
        SnackBarCopyComponent
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
        MatSnackBarModule,
        FormsModule,
        HttpClientModule,
        MarkdownModule.forRoot({ loader: HttpClient })
    ],
    providers: [FileSystemService],
    entryComponents: [SnackBarCopyComponent]
})
export class NgDocxModule {
    static forRoot(configuration: ConfigInterface): ModuleWithProviders<Route> {
        return {
            ngModule: NgDocxModule,
            providers: [{ provide: 'config', useValue: configuration }]
        };
    }
}
