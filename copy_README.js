const copy = require('copy');
const fs = require('fs');
const distDir = 'dist/ng-docx';

console.log('Copy README file to dist...');
copy('README.md', distDir, {}, (_) => {});

console.log('Copy README file to sandbox...');
copy('README.md', 'projects/ng-docx-sandbox/src/assets/docs', {}, (_) => {
    fs.renameSync(
        'projects/ng-docx-sandbox/src/assets/docs/README.md',
        'projects/ng-docx-sandbox/src/assets/docs/getting started.md'
    );
});
