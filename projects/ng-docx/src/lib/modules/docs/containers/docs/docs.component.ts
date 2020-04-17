import { Component, ViewEncapsulation, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocsService } from './../../services/docs/docs.service';
import { ConfigInterface } from '../../models';

@Component({
    selector: 'ng-docx',
    templateUrl: './docs.component.html',
    styleUrls: ['./docs.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NgDocxComponent implements OnInit {
    markdownBefore: string = null;
    markdown: string;
    markdownName: string;
    searchValue: string = null;
    sidenavOpened = true;
    docsDir = 'assets/docs/';

    constructor(
        @Inject('config') private config: ConfigInterface,
        private docsService: DocsService,
        private router: Router
    ) {}

    ngOnInit() {
        const title = this.getQueryParamTitle();
        this.markdown = `${this.docsDir}${title ? title : this.config.files[0]}.md`;
    }

    getQueryParamTitle(): string {
        return this.router.routerState.snapshot.root.queryParams.title;
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
        window.history.replaceState(null, null, `${window.location.pathname}?title=${markdownName}`);
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
        const toolbar = document.getElementsByTagName('mat-toolbar')[0];
        const someSpace = 20;
        document.querySelector('.mat-sidenav-content').scrollTop =
            document.querySelector('.mat-sidenav-content').scrollTop +
            highlightElement.getBoundingClientRect().top -
            toolbar.getBoundingClientRect().height -
            someSpace;
    }
}
