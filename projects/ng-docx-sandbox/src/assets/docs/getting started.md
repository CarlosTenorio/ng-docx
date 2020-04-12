<p align="center">
    <img  alt="Ng-Docx Logo"src="https://raw.githubusercontent.com/CarlosTenorio/ng-docx/master/projects/ng-docx-sandbox/src/assets/images/NG_DOCX_icon.png"  width="12%">
</p>

[![npm version](https://img.shields.io/npm/v/ng-docx?style=flat)](https://www.npmjs.com/package/ng-docx)
[![npm download](https://img.shields.io/npm/dm/ng-docx)](https://www.npmjs.com/package/ng-docx)
[![license](https://img.shields.io/npm/l/ng-docx)](https://www.npmjs.com/package/ng-docx)


# Getting Started

Welcome to NG-DOCX!

## What is Ng-docx?

Ng-docx is a library that automatically generates a documentation page to easily and beautifully view your markdowns

## PeerDependencies
Before install the library, install the necessary dependencies to function properly

- [@angular/material](https://www.npmjs.com/package/@angular/material)

## Installation

```
npm install ng-docx
```

### Add styles
Import on your **global styles**:

- The styles **from** the **library**:

    *styles.scss*
    ```css
    @import "~ng-docx/assets/styles/ng-docx.scss";
    ```

### Add scripts
*angular.json*
```json
"scripts": [
    "node_modules/ng-docx/assets/js/ng-docx.js"
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
    const fileNames = ['getting started', 'theming'];

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
import { NgDocxModule, NgDocxComponent } from 'ng-docx';

const fileNames = ['getting started', 'theming'];

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
    - theming.md

