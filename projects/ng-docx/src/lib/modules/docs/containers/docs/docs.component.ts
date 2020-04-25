import { Component, ViewEncapsulation, Inject, OnInit } from '@angular/core';
import { DocsService } from './../../services/docs/docs.service';
import { FileSystemService } from './../../services/file-system/file-system.service';
import { ConfigInterface, DocumentInterface } from '../../models';
import { Observable } from 'rxjs';

const DOCS_FOLDER = 'assets/docs/';

@Component({
    selector: 'ng-docx',
    templateUrl: './docs.component.html',
    styleUrls: ['./docs.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NgDocxComponent implements OnInit {
    currentVersion: string = null;
    markdownBefore: string = null;
    markdown: string;
    markdownName: string;
    searchValue: string = null;
    sidenavOpened = true;
    docsDir: string = DOCS_FOLDER;
    docs$: Observable<DocumentInterface[]>;
    section: number = null;

    constructor(
        @Inject('config') public config: ConfigInterface,
        private docsService: DocsService,
        private fileSystem: FileSystemService
    ) {}

    ngOnInit() {
        this.docs$ = this.fileSystem.docs$;
        this.docs$.subscribe((docs: DocumentInterface[]) => {
            if (docs.length) {
                const title = this.getQueryParamTitle();
                this.section = this.getHashURL();
                this.markdownName = docs.some((doc) => doc.title === title) ? title : docs[0].title;
                this.loadMarkdown(this.markdownName);
            }
        });
        if (this.config.versions) {
            this.currentVersion = this.config.versions[this.config.versions.length - 1];
            this.docsDir = `${DOCS_FOLDER}${this.currentVersion}/`;
        }
        this.fileSystem.loadDocs(this.docsDir, this.config.files);
    }

    getHashURL(): number {
        return parseInt(window.location.hash.replace('#', ''), 10);
    }

    getQueryParamTitle(): string {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('title');
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
            this.unHighlightSearch();
            this.highlightSearch(this.searchValue);
            this.searchValue = null;
        }
    }

    writeQueryParam(markdownName: string) {
        const hash = this.section ? window.location.hash : '';
        window.history.replaceState(null, null, `${window.location.pathname}?title=${markdownName}${hash}`);
    }

    notifyMarkdownChanges() {
        if (this.markdownBefore !== this.markdown) {
            this.docsService.notifyMarkdownChanges();
            document.querySelector('.mat-sidenav-content').scrollTop = 0;
        }
        if (this.searchValue) {
            this.highlightSearch(this.searchValue);
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
    }

    navigateToPosition(position: number) {
        const matSidenavContent = document.querySelector('.mat-sidenav-content');
        const toolbar = document.getElementsByTagName('mat-toolbar')[0];
        const someSpace = 10;

        if (matSidenavContent) {
            matSidenavContent.scrollTop =
                matSidenavContent.scrollTop + position - toolbar.getBoundingClientRect().height - someSpace;
        }
    }

    onScroll() {
        this.highlightHeader();
    }

    highlightHeader() {
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

    hightlightItem(index: number) {
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

    switchSidenav() {
        this.sidenavOpened = !this.sidenavOpened;
    }

    unHighlightSearch() {
        const className = 'highlight-search';
        const highlightElements = document.getElementsByClassName(className);
        const arrhighlightElements = [...(highlightElements as any)];
        arrhighlightElements.forEach((element) => {
            element.classList.remove(className);
        });
    }

    highlightSearch(text: string) {
        const inputText = document.getElementsByTagName('markdown')[0];
        const innerHTML = inputText.innerHTML;
        const index = innerHTML.toLocaleLowerCase().indexOf(text.toLocaleLowerCase());
        if (index >= 0) {
            this.paintSearchAndScrollTo(text, inputText, innerHTML, index);
        }
    }

    paintSearchAndScrollTo(text: string, inputText: Element, innerHTML: string, index: number) {
        innerHTML =
            innerHTML.substring(0, index) +
            "<span class='highlight-search'>" +
            innerHTML.substring(index, index + text.length) +
            '</span>' +
            innerHTML.substring(index + text.length);
        inputText.innerHTML = innerHTML;
        const highlightElement = document.getElementsByClassName('highlight-search')[0];
        this.navigateToPosition(highlightElement.getBoundingClientRect().top);
    }

    versionChange(newVersion: string) {
        this.currentVersion = newVersion;
        this.docsDir = `${DOCS_FOLDER}${this.currentVersion}/`;
        this.fileSystem.loadDocs(this.docsDir, this.config.files);
    }
}
