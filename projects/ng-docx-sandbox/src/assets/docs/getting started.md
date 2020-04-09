# Getting Started

Welcome to NG-DOCX! 

## What is Ng-docx?

Ng-docx is a library that automatically generates a documentation page to easily and beautifully view your markdowns

## Dependencies
Before install the library, install the necessary dependencies to function properly

- [@angular/material](https://www.npmjs.com/package/@angular/material)
- [ngx-markdown](https://www.npmjs.com/package/ngx-markdown)

## Installation

```
npm install ng-docx
```

### Add styles
Import on your **global styles**:

- The styles **from** the **library**:

    *styles.scss*
    ```css
    @import "node_modules/ng-docx/src/lib/assets/styles/ng-docx.scss";
    ```

- Don't forget import the styles **from** the libraries that are **dependencies**:
  
    *angular.json*
    ```json
    "styles": [
        "node_modules/@angular/material/prebuilt-themes/deeppurple-amber.css",
        "node_modules/prismjs/themes/prism-okaidia.css",
        "node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css"
    ]
    ```

### Add scripts

Don't forget import the **scripts from** the libraries that are **dependencies**:

*angular.json*
```json
"scripts": [
    "node_modules/marked/lib/marked.js",
    "node_modules/prismjs/prism.js",
    "node_modules/prismjs/components/prism-typescript.min.js",
    "node_modules/prismjs/plugins/line-numbers/prism-line-numbers.js"
]
```

## Import the library

### Steps
To make your documentation page you must wrap the NgDocxModule, for this follow these steps:

1. **Create a Module** on your app, i.e, DocsModule (docs.module.ts)
   
2. **Import** the **NgDocxModule** and the **NgDocxComponent**

    *docs.module.ts*
    ```typescript
    import { NgDocxModule, NgDocxComponent } from 'ngx-docx';
    ```
3. Add the names of the files you want to add to the documentation.

    *docs.module.ts*
    ```typescript
    const fileNames = ['getting started', 'what\'s next'];

    @NgModule({
        imports: [
            NgDocxModule.forRoot({
                files: fileNames
            })
        ]
    })
    ```
4. Add the route to NgDocxComponent on your module.

    *docs.module.ts*
    ```typescript
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
    ```

### Final code on your wrap module

```typescript
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
```

## What type of extensions are supported?

- Markdown (.md)

## Where are my docs located?

The files must be placed in the **assets folder** **inside a subfolder** called **docs**, for example:

- assets
  - docs
    - getting started.md
    - what's next.md

