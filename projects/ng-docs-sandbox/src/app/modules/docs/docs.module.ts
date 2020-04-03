import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgDocsModule, NgDocsComponent } from 'projects/ng-docs/src/public-api';

const routes: Routes = [
    {
        path: '',
        children: [{ path: '', component: NgDocsComponent }]
    }
];

@NgModule({
    imports: [NgDocsModule, RouterModule.forChild(routes)]
})
export class WrapperDocsModule {}
