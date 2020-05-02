import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Internal service.
 */
@Injectable({
    providedIn: 'root'
})
export class DocsService {
    private markdownChangeSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
    readonly markdownChange$: Observable<boolean> = this.markdownChangeSubject.asObservable();

    constructor() {}

    notifyMarkdownChanges() {
        this.markdownChangeSubject.next(true);
    }
}
