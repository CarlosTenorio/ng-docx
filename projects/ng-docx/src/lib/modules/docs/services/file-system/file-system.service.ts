import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from './../utils/utils.service';
import { DocumentInterface, DocCollectionInterface, FolderInterface } from '../../models';
import { Observable, of, BehaviorSubject, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Injectable()
export class FileSystemService {
    private docsSubject: BehaviorSubject<DocCollectionInterface> = new BehaviorSubject(null);
    private navigationMenuSubject: BehaviorSubject<DocumentInterface[]> = new BehaviorSubject(null);
    readonly docs$: Observable<DocCollectionInterface> = this.docsSubject.asObservable();
    readonly navigationMenu$: Observable<DocumentInterface[]> = this.navigationMenuSubject.asObservable();

    constructor(public http: HttpClient, private utils: UtilsService) {}

    loadDocs(docsDir: string, docNames: (string | FolderInterface)[]) {
        forkJoin(this.getDocs(docsDir, docNames)).subscribe((docs: DocumentInterface[]) => {
            this.navigationMenuSubject.next(this.createNavigationMenu(docs));
            this.docsSubject.next(this.utils.groupBy(docs, 'folder') as DocCollectionInterface);
        });
    }

    getDocs(docsDir: string, docNames: (string | FolderInterface)[]): Observable<DocumentInterface>[] {
        const docs$: Observable<DocumentInterface>[] = [];
        docNames.map(async (docName: string | FolderInterface) => {
            if (typeof docName === 'string') {
                docs$.push(this.readFile(docsDir, docName));
            } else {
                Object.keys(docName as FolderInterface).forEach(async (folderName: string) => {
                    docName[folderName].map((title: string) => {
                        docs$.push(this.readFile(`${docsDir}${folderName}/`, title, folderName));
                    });
                });
            }
        });
        return docs$;
    }

    readFile(docsDir: string, docName: string, folderName: string = null): Observable<DocumentInterface> {
        return this.http.get(`${docsDir}${docName}.md`, { responseType: 'text' }).pipe(
            map((docContent: string) => {
                return {
                    title: docName,
                    content: docContent,
                    folder: folderName
                } as DocumentInterface;
            }),
            catchError(() => {
                return of(null);
            })
        );
    }

    createNavigationMenu(docs: DocumentInterface[]): DocumentInterface[] {
        const navigationMenu = [];
        const folderAlreadyPushed: string[] = [];
        const groupedDocs = this.utils.groupBy(docs, 'folder');
        docs.forEach((doc: DocumentInterface) => {
            if (doc) {
                if (doc.folder && !folderAlreadyPushed.some((folder) => folder === doc?.folder)) {
                    const folder: FolderInterface = {};
                    folder[doc.folder] = groupedDocs[doc.folder];
                    navigationMenu.push(folder);
                    folderAlreadyPushed.push(doc.folder);
                } else if (!doc.folder) {
                    navigationMenu.push(doc);
                }
            }
        });
        return navigationMenu;
    }
}
