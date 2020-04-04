import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';

@Component({
    selector: 'lib-navigation-tree',
    templateUrl: './navigation-tree.component.html',
    styleUrls: ['./navigation-tree.component.scss']
})
export class NavigationTreeComponent implements OnInit {
    classNavigationMenu = 'navigationMenu';

    constructor(private utils: UtilsService) {}

    ngOnInit() {
        setTimeout(() => {
            this.loadSections();
        });
    }

    loadSections() {
        const elementsH2 = document.getElementsByTagName('h2');
        const arrElementsH2 = [...(elementsH2 as any)];

        arrElementsH2.forEach((elementH2: HTMLHeadingElement, index: number) => {
            const arrElementsH3 = this.utils.nextUntil(elementH2, 'h2', 'h3');
            this.loadSubSections(arrElementsH3, index);
            this.wrapElement(elementH2, index.toString());
            this.createTreeItem(elementH2.textContent, index, arrElementsH3);
        });
    }

    loadSubSections(arrElementsH3: any[], index: number) {
        arrElementsH3.forEach((elementH3: HTMLHeadingElement, subIndex: number) => {
            this.wrapElement(elementH3, `${index}.${subIndex}`);
        });
    }

    wrapElement(element: any, id: string) {
        const parent = element.parentNode;
        const wrapperSection = document.createElement('section');
        wrapperSection.id = id;
        parent.replaceChild(wrapperSection, element);
        wrapperSection.appendChild(element);
    }

    createTreeItem(text: string, id: number, subItems: any[]) {
        const navigationMenu = document.getElementsByClassName(this.classNavigationMenu)[0];
        const aItem = document.createElement('a');
        const aText = document.createTextNode(text);
        aItem.appendChild(aText);
        aItem.title = text;
        aItem.id = `navItem${id}`;
        aItem.href = `docs#${id}`;
        navigationMenu.appendChild(aItem);
        subItems.forEach((subItem: Element, subIndex: number) => {
            this.createTreeSubItem(aItem, subItem.textContent, subIndex);
        });
    }

    createTreeSubItem(parent: HTMLAnchorElement, text: string, id: number) {
        const aItem = document.createElement('a');
        const aText = document.createTextNode(text);
        aItem.appendChild(aText);
        aItem.title = text;
        aItem.id = `navSubItem${id}`;
        aItem.href = `docs#${id}`;
        parent.appendChild(aItem);
    }
}
