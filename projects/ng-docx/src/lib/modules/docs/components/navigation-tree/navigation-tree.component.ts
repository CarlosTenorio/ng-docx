import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UtilsService } from '../../services/utils.service';

@Component({
    selector: 'lib-navigation-tree',
    templateUrl: './navigation-tree.component.html',
    styleUrls: ['./navigation-tree.component.scss']
})
export class NavigationTreeComponent implements OnInit {
    @Output() sectionsLoaded = new EventEmitter<boolean>();

    classNavigationMenu = 'navigationMenu';

    constructor(private utils: UtilsService) {}

    ngOnInit() {
        setTimeout(() => {
            this.loadSections();
            this.sectionsLoaded.emit(true);
        });
    }

    loadSections() {
        this.createSectionTitle();
        this.createSectionSubTitles();
    }

    createSectionTitle() {
        const titleH1 = document.getElementsByTagName('h1')[0];
        this.wrapElementWithSection(titleH1, '0');
        this.createTreeItem(titleH1.textContent, 0);
    }

    createSectionSubTitles() {
        const elementsH2 = document.getElementsByTagName('h2');
        const arrElementsH2 = [...(elementsH2 as any)];
        let lastIndex = 0;

        arrElementsH2.forEach((elementH2: HTMLHeadingElement, index: number) => {
            index = lastIndex + 1;
            const arrElementsH3 = this.utils.nextUntil(elementH2, 'h2', 'h3');
            this.loadSectionsH3(arrElementsH3, index);
            this.wrapElementWithSection(elementH2, index.toString());
            this.createTreeItem(elementH2.textContent, index, arrElementsH3);
            lastIndex = index + arrElementsH3.length;
        });
    }

    loadSectionsH3(arrElementsH3: any[], index: number) {
        arrElementsH3.forEach((elementH3: HTMLHeadingElement, subIndex: number) => {
            this.wrapElementWithSection(elementH3, (index + subIndex + 1).toString());
        });
    }

    wrapElementWithSection(element: any, id: string) {
        const parent = element.parentNode;
        const wrapperSection = document.createElement('section');
        wrapperSection.id = id;
        parent.replaceChild(wrapperSection, element);
        wrapperSection.appendChild(element);
    }

    createTreeItem(text: string, index: number, subItems: any[] = []) {
        const navigationMenu = document.getElementsByClassName(this.classNavigationMenu)[0];
        const aItem = document.createElement('a');
        const aText = document.createTextNode(text);
        aItem.appendChild(aText);
        aItem.title = text;
        aItem.id = `navItem${index}`;
        aItem.href = `docs#${index}`;
        navigationMenu.appendChild(aItem);
        subItems.forEach((subItem: Element, subIndex: number) => {
            this.createTreeSubItem(navigationMenu, subItem.textContent, index + subIndex + 1);
        });
    }

    createTreeSubItem(parent: Element, text: string, id: number) {
        const aSubItem = document.createElement('a');
        const aText = document.createTextNode(text);
        aSubItem.appendChild(aText);
        aSubItem.title = text;
        aSubItem.id = `navItem${id}`;
        aSubItem.href = `docs#${id}`;
        aSubItem.classList.add('sub-item-navigation');
        parent.insertAdjacentElement('beforeend', aSubItem);
    }
}
