import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Public service to manage the library
 */
@Injectable({
    providedIn: 'root'
})
export class NgDocxService {
    private editEnableSubject: BehaviorSubject<boolean> = new BehaviorSubject(true);
    /**
     * Observable to know if you can edit the documents.
     */
    readonly editEnable$: Observable<boolean> = this.editEnableSubject.asObservable();

    constructor() {}

    /**
     * Set the edit button visibility.
     * @param enable boolean True if the edit button should be visible.
     */
    setEdit(enable: boolean) {
        this.editEnableSubject.next(enable);
    }
}
