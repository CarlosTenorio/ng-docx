import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgDocsModule, NgDocxComponent } from 'projects/ng-docx/src/public-api';

const routes: Routes = [
    {
        path: '',
        children: [{ path: '', component: NgDocxComponent }]
    }
];

@NgModule({
    imports: [NgDocsModule, RouterModule.forChild(routes)]
})
export class WrapperDocsModule {}
