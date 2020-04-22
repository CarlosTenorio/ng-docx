import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgDocxModule, NgDocxComponent } from 'projects/ng-docx/src/public-api';

const fileNames = ['getting started', 'writing the markdown', 'theming', "what's next"];
const versionNames = ['v0', 'v1'];

const routes: Routes = [
    {
        path: '',
        children: [{ path: '', component: NgDocxComponent }]
    }
];

@NgModule({
    imports: [
        NgDocxModule.forRoot({
            files: fileNames,
            versions: versionNames
        }),
        RouterModule.forChild(routes)
    ]
})
export class WrapperDocsModule {}
