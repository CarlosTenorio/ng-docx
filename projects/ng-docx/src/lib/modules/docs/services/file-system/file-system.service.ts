import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DocumentInterface } from '../../models';
import { Observable, of, BehaviorSubject, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable()
export class FileSystemService {
    private docsSubject: BehaviorSubject<DocumentInterface[]> = new BehaviorSubject([]);
    readonly docs$: Observable<DocumentInterface[]> = this.docsSubject.asObservable();

    constructor(public http: HttpClient) {}

    loadDocs(docsDir: string, docNames: string[]) {
        forkJoin(this.getDocs(docsDir, docNames)).subscribe((docs: DocumentInterface[]) => {
            const existingDocs = docs.filter((doc) => {
                return doc;
            });
            this.docsSubject.next(existingDocs);
        });
    }

    getDocs(docsDir: string, docNames: string[]): Observable<DocumentInterface>[] {
        return docNames.map((docName: string) => {
            return this.http.get(`${docsDir}${docName}.md`, { responseType: 'text' }).pipe(
                map((docContent) => {
                    return {
                        title: docName,
                        content: docContent
                    } as DocumentInterface;
                }),
                catchError(() => {
                    return of(null);
                })
            );
        });
    }
}
