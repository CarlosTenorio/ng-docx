import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'ng-docs',
    templateUrl: './docs.component.html',
    styleUrls: ['./docs.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NgDocsComponent implements OnInit {
    markdown = `assets/docs/frontend.md`;
    classNavigationMenu = 'navigationMenu';

    constructor() {}

    ngOnInit() {
        setTimeout(() => {
            this.loadSections();
        });
    }

    loadMarkdown(context: string) {
        this.markdown = `assets/docs/${context}.md`;
    }

    loadSections() {
        const elementsH2 = document.getElementsByTagName('h2');
        const arrElementsH2 = [...(elementsH2 as any)];

        arrElementsH2.forEach((elementH2: HTMLHeadingElement, index: number) => {
            const elementsH3 = elementH2.getElementsByTagName('h3');
            const arrElementsH3 = [...(elementsH3 as any)];
            this.wrapElement(elementH2, index);
            this.createNavigationMap(elementH2.textContent, index, arrElementsH3);
        });
    }

    wrapElement(element: any, id: number) {
        const parent = element.parentNode;
        const wrapperSection = document.createElement('section');
        wrapperSection.id = id.toString();
        parent.replaceChild(wrapperSection, element);
        wrapperSection.appendChild(element);
    }

    createNavigationMap(text: string, id: number, subItems: any[]) {
        console.log(subItems);
        const navigationMenu = document.getElementsByClassName(this.classNavigationMenu)[0];
        const aItem = document.createElement('a');
        const aText = document.createTextNode(text);
        aItem.appendChild(aText);
        aItem.title = text;
        aItem.href = `docs#${id}`;
        navigationMenu.appendChild(aItem);
    }
}
