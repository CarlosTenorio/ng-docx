# Edit files

In order to enable the document editing button you must **provide** the **repository URL** **where** the **assets are found.** 

**I.E.** the URL provided for this documentation is:

**https://github.com/CarlosTenorio/ng-docx/edit/master/projects/ng-docx-sandbox/src**

```typescript
@NgModule({
    imports: [
        NgDocxModule.forRoot({
            .
            .
            .
            editAssetsPath: 'yourRepoURL'
        }),
        RouterModule.forChild(routes)
    ]
})
```

## Roles and permissions to edit
The permissions to see the edit button must be controlled outside the library.

**Ng-Docx provides** you with **a service to indicate if the button should be visible or hide it**. The service can only enable editing if the *editAssetsPath* property has previously been specified
```typescript
import { NgDocxService } from 'ng-docx';
.
.
.
constructor(private ngDocxService: NgDocxService) {
    this.ngDocxService.setEdit(false);
}
```