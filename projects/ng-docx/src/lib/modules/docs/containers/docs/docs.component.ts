import { Component, ViewEncapsulation } from '@angular/core';
import { DocsService } from './../../services/docs/docs.service';

@Component({
    selector: 'ng-docx',
    templateUrl: './docs.component.html',
    styleUrls: ['./docs.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NgDocxComponent {
    markdownBefore: string = null;
    markdown = `assets/docs/getting-started.md`;

    constructor(private docsService: DocsService) {}

    loadMarkdown(markdownName: string) {
        this.markdownBefore = this.markdown;
        this.markdown = `assets/docs/${markdownName}.md`;
    }

    notifyMarkdownChanges() {
        if (this.markdownBefore && this.markdownBefore !== this.markdown) {
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
}
