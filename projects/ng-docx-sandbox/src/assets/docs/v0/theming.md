# Theming

NG-DOCX works through **angular material**.

By default, the module uses the material theme that you have configured in your application. If you want to add a custom theme, continue reading the next section.

## Inlude the palette

In your style file you must include the following lines.

```css
@import "node_modules/ng-docx/assets/styles/theming.scss";
@include ng-docx($palette-primary);
```

## Full code example

If you are not familiar with how angular material works we give you a complete example of how to customize your colors.

```css
@import "node_modules/@angular/material/theming";
@import "node_modules/ng-docx/assets/styles/theming.scss";
@include mat-core();

$palette-primary: (
    50: #e0f0f7,
    100: #b3daeb,
    200: #80c1dd,
    300: #4da8cf,
    400: #2695c5,
    500: #0082bb,
    600: #007ab5,
    700: #006fac,
    800: #0065a4,
    900: #005296,
    A100: #c1dfff,
    A200: #8ec4ff,
    A400: #5baaff,
    A700: #419dff,
    contrast: (
        50: $black-87-opacity,
        100: $black-87-opacity,
        200: $black-87-opacity,
        300: $black-87-opacity,
        400: $black-87-opacity,
        500: white,
        600: white,
        700: white,
        800: white,
        900: white,
        A100: $black-87-opacity,
        A200: $black-87-opacity,
        A400: $black-87-opacity,
        A700: white,
    ),
);

$app-primary: mat-palette($palette-primary);
$app-accent: mat-palette($mat-pink, A200, A100, A400);

$app-theme: mat-light-theme($app-primary, $app-accent);

@include angular-material-theme($app-theme);
// Here we include the mix for ng-docx
@include ng-docx($palette-primary);
```