import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgDocxModule, NgDocxComponent } from 'projects/ng-docx/src/public-api';

const fileNames = ['getting started', "what's next"];

const routes: Routes = [
    {
        path: '',
        children: [{ path: '', component: NgDocxComponent }]
    }
];

@NgModule({
    imports: [
        NgDocxModule.forRoot({
            files: fileNames
        }),
        RouterModule.forChild(routes)
    ]
})
export class WrapperDocsModule {}
