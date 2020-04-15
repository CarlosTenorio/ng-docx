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

    loadMarkdown(markdownName: string) {
        this.markdownName = markdownName;
        this.markdownBefore = this.markdown;
        this.markdown = `${this.docsDir}${this.markdownName}.md`;
        this.writeQueryParam(this.markdownName);
    }

    writeQueryParam(markdownName: string) {
        window.history.replaceState(null, null, `${window.location.pathname}?title=${markdownName}`);
    }

    notifyMarkdownChanges() {
        if (this.markdownBefore !== this.markdown) {
            this.docsService.notifyMarkdownChanges();
            document.querySelector('.mat-sidenav-content').scrollTop = 0;
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
}
