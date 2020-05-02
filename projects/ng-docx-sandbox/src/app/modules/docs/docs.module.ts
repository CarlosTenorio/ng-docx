import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgDocxModule, NgDocxComponent } from 'projects/ng-docx/src/public-api';

const files = ['getting started', 'writing the markdown', 'theming', 'versioning', 'edit files', "what's next"];
const versions = ['v0'];
const editAssetsPath = 'https://github.com/CarlosTenorio/ng-docx/edit/master/projects/ng-docx-sandbox/src';

const routes: Routes = [
    {
        path: '',
        children: [{ path: '', component: NgDocxComponent }]
    }
];

@NgModule({
    imports: [
        NgDocxModule.forRoot({
            files,
            versions,
            editAssetsPath
        }),
        RouterModule.forChild(routes)
    ]
})
export class WrapperDocsModule {}
