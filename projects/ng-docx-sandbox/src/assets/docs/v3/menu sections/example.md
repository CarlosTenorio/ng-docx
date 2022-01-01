# Example

Example of the library documentation itself.

```typescript
const files = [
    'getting started',
    'writing the markdown',
    'theming',
    'versioning',
    'edit files',
    { 'menu sections': ['introduction', 'example'] },
    "what's next"
];
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
```