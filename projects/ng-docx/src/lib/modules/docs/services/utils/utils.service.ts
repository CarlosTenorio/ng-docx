import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {
    constructor() {}

    nextUntil(elem: Element, selector: string, filter: string = null): Element[] {
        const siblings: Element[] = [];
        elem = elem.nextElementSibling;
        while (elem) {
            if (elem.matches(selector)) {
                break;
            }
            if (filter && !elem.matches(filter)) {
                elem = elem.nextElementSibling;
                continue;
            }
            siblings.push(elem);
            elem = elem.nextElementSibling;
        }
        return siblings;
    }

    groupBy(collection: any, key: string) {
        return collection.reduce((rv, x) => {
            if (x) {
                (rv[x[key]] = rv[x[key]] || []).push(x);
            }
            return rv;
        }, {});
    }
}
