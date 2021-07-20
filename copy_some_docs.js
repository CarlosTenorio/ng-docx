const copy = require('copy');
const fs = require('fs');
const distDir = 'dist/ng-docx';
const lastVersion = 'v2';

console.log('Copy README file to dist...');
copy('README.md', distDir, {}, (_) => {});

console.log('Copy README file to sandbox...and rename it');
copy('README.md', `projects/ng-docx-sandbox/src/assets/docs/${lastVersion}`, {}, (_) => {
    fs.renameSync(
        `projects/ng-docx-sandbox/src/assets/docs/${lastVersion}/README.md`,
        `projects/ng-docx-sandbox/src/assets/docs/${lastVersion}/getting started.md`
    );

    copyChangelog();
});

function copyChangelog() {
    console.log('Copy CHANGELOG file to sandbox...');
    process.chdir('projects/ng-docx/');
    copy('CHANGELOG.md', `../ng-docx-sandbox/src/assets/docs/${lastVersion}`, {}, (_) => {});
}
