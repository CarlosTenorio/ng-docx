# Versioning

Versioning **is optional**.

If you want **to enable**, just **put an array** with the **version names**.


```typescript
@NgModule({
    imports: [
        NgDocxModule.forRoot({ 
            files: ['getting started', 'writing the markdown'],
            versions: ['v0', 'v1']
        }),
        RouterModule.forChild(routes)
    ]  
})
```

## Update your folder structure

Now you must include the **files inside folders with the same name as the versions**, for example:


![Folder Structure](assets/images/versioning_folder.PNG)

## Logic

The version array should be **sort from the oldest version to the newest one**.

The library will automatically **take the last element** of the collection **as** the **default version** to load.

