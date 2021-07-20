import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgDocxModule, NgDocxComponent } from 'projects/ng-docx/src/public-api';

const files = [
    'getting started',
    'writing the markdown',
    'theming',
    'versioning',
    'edit files',
    { 'menu sections': ['introduction', 'example'] },
    "what's next",
    'CHANGELOG'
];
const versions = ['v0', 'v1', 'v2'];
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
