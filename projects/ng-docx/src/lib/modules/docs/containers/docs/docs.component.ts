import { Component, ViewEncapsulation, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DocsService } from './../../services/docs/docs.service';
import { FileSystemService } from './../../services/file-system/file-system.service';
import { NgDocxService } from './../../services/ng-docx/ng-docx.service';
import { UtilsService } from './../../services/utils/utils.service';
import { SnackBarCopyComponent } from '../../components';
import { ConfigInterface, DocCollectionInterface } from '../../models';
import { Observable } from 'rxjs';
import Mark from 'mark.js';

const DOCS_FOLDER = 'assets/docs/';

@Component({
    selector: 'ng-docx',
    templateUrl: './docs.component.html',
    styleUrls: ['./docs.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NgDocxComponent implements OnInit {
    currentVersion: string = null;
    docs$: Observable<DocCollectionInterface>;
    docsDir: string = DOCS_FOLDER;
    markdownBefore: string = null;
    markdown: string;
    markdownName: string;
    searchValue: string = null;
    section: number = null;
    sidenavOpened = true;

    constructor(
        @Inject('config') public config: ConfigInterface,
        public ngDocxService: NgDocxService,
        private docsService: DocsService,
        private utils: UtilsService,
        private fileSystem: FileSystemService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.docs$ = this.fileSystem.docs$;
        this.docs$.subscribe((docs: DocCollectionInterface) => {
            if (docs) {
                const markdownName = this.getQueryParamTitle();
                const folder = markdownName.indexOf('/') !== -1 ? markdownName.split('/')[0] : null;
                const title = folder ? markdownName.split('/')[1] : markdownName;
                this.section = this.utils.getHashURL();
                this.markdownName = this.docExists(docs, folder, title) ? markdownName : this.getFirstTitle(docs);
                this.loadMarkdown(this.markdownName);
            }
        });
        this.checkVersioning();
        this.fileSystem.loadDocs(this.docsDir, this.config.files);
    }

    private docExists(docs: DocCollectionInterface, folder: string, title: string): boolean {
        return docs[folder] ? docs[folder].some((doc) => doc.title === title) : false;
    }

    private getFirstTitle(docs: DocCollectionInterface): string {
        return docs[Object.keys(docs)[0]][0].title;
    }

    private getQueryParamTitle(): string {
        const urlParams = new URLSearchParams(window.location.search);
        return decodeURIComponent(urlParams.get('title'));
    }

    private checkVersioning() {
        if (this.config.versions) {
            this.currentVersion = this.config.versions[this.config.versions.length - 1];
            this.docsDir = `${DOCS_FOLDER}${this.currentVersion}/`;
        }
    }

    markdownChangeFromMenu(markdownName: string) {
        this.section = null;
        this.loadMarkdown(markdownName);
    }

    loadMarkdown(markdownName: string, searchValue: string = null) {
        this.markdownName = markdownName;
        this.markdownBefore = this.markdown;
        this.markdown = `${this.docsDir}${this.markdownName}.md`;
        this.writeQueryParam(this.markdownName);
        this.searchValue = searchValue;
        if (this.searchValue && this.markdownBefore === this.markdown) {
            this.unmarkSearch();
            this.markSearchAndNavigate(this.searchValue);
            this.searchValue = null;
        }
    }

    private writeQueryParam(markdownName: string) {
        const hash = this.section ? window.location.hash : '';
        window.history.replaceState(
            null,
            null,
            `${window.location.pathname}?title=${encodeURIComponent(markdownName)}${hash}`
        );
    }

    notifyMarkdownChanges() {
        if (this.markdownBefore !== this.markdown) {
            this.docsService.notifyMarkdownChanges();
            document.querySelector('.mat-sidenav-content').scrollTop = 0;
        }
        if (this.searchValue) {
            this.markSearchAndNavigate(this.searchValue);
            this.searchValue = null;
        }
    }

    sectionsLoaded() {
        this.highlightHeader();
        if (this.section && !Number.isNaN(this.section)) {
            setTimeout(() => {
                const positionSection = document.getElementById(this.section.toString())?.getBoundingClientRect().top;
                this.navigateToPosition(positionSection);
            });
        }
        this.addSectionLinks();
    }

    private navigateToPosition(position: number) {
        const matSidenavContent = document.querySelector('.mat-sidenav-content');
        const toolbar = document.getElementsByTagName('mat-toolbar')[0];
        const someSpace = 10;

        if (matSidenavContent) {
            matSidenavContent.scrollTop =
                matSidenavContent.scrollTop +
                position -
                (toolbar ? toolbar.getBoundingClientRect().height : 0) -
                someSpace;
        }
    }

    onScroll() {
        this.highlightHeader();
    }

    private highlightHeader() {
        const sections = document.getElementsByTagName('section');
        const arrSections = [...(sections as any)];

        arrSections.some((section: HTMLHeadingElement, index: number) => {
            const positionSection = section.getBoundingClientRect();
            if (positionSection.top >= 0 && positionSection.bottom <= window.innerHeight) {
                this.hightlightItem(index);
                return true;
            }
        });
    }

    private hightlightItem(index: number) {
        const className = 'navigation-item-selected';
        const currentSelected = document.getElementsByClassName(`navigation-item-selected`)[0];
        const item = document.getElementById(`navItem${index}`);
        if (currentSelected !== item) {
            if (currentSelected) {
                currentSelected.classList.remove(className);
            }
            if (item) {
                item.classList.add(className);
            }
        }
    }

    private addSectionLinks() {
        const sections = document.getElementsByTagName('section');
        const arrSections = [...(sections as any)];

        arrSections.some((section: HTMLHeadingElement, index: number) => {
            this.addSectionLink(section, index);
        });
    }

    private addSectionLink(section: HTMLHeadingElement, index: number) {
        const newSectionLink = document.createElement('i');
        newSectionLink.setAttribute('index', index.toString());
        newSectionLink.className = 'material-icons ng-docx-section-link';
        newSectionLink.innerText = 'link';
        newSectionLink.addEventListener('click', (event: MouseEvent) => {
            const currentURL = this.utils.getURLWithoutHash();
            this.utils.copyOnClipboard(`${currentURL}#${(event.target as HTMLHeadingElement).getAttribute('index')}`);
            this.openSnackBarCopied();
        });
        section.childNodes[0].appendChild(newSectionLink);
    }

    private openSnackBarCopied() {
        this.snackBar.openFromComponent(SnackBarCopyComponent, {
            duration: 1000
        });
    }

    switchSidenav() {
        this.sidenavOpened = !this.sidenavOpened;
    }

    private unmarkSearch() {
        const context = document.querySelector('markdown');
        const instance = new Mark(context);
        instance.unmark();
    }

    private markSearchAndNavigate(text: string) {
        const context = document.querySelector('markdown');
        const instance = new Mark(context);
        instance.mark(text);
        const markElement = document.querySelector('mark');
        if (markElement) {
            this.navigateToPosition(markElement.getBoundingClientRect().top);
        }
    }

    versionChange(newVersion: string) {
        this.currentVersion = newVersion;
        this.docsDir = `${DOCS_FOLDER}${this.currentVersion}/`;
        this.fileSystem.loadDocs(this.docsDir, this.config.files);
    }
}
