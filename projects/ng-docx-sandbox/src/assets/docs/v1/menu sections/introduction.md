# Menu sections - Introduction

If your documentation starts to get bulky, you probably want to **group the files into sections**.

Ng-docx provides the ability to automatically create these sections effortlessly. You only have to indicate it in the module configuration.

The **sections are compatible with** having **versioned** in the documentation.

## How do I start?

**Go to** your **documentation module** and in your file array **create a section and** indicate **what files it has**.

*docs.module.ts*
```typescript
const files = [
    'getting started',
    { 'menu sections': ['introduction', 'example'] },
    'theming'
];

@NgModule({
    imports: [
        NgDocxModule.forRoot({
            files
        })
    ]
})
```

**My folder** looks like:


![Sections Example](assets/images/sections_example.PNG)

You can create **as many sections as you want**.