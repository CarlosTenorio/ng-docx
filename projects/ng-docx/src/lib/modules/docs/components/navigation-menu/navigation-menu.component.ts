import { Component, Input, EventEmitter, Output, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { FileSystemService } from './../../services/file-system/file-system.service';
import { DocCollectionInterface, DocumentInterface } from '../../models';
import { Observable } from 'rxjs';

@Component({
    selector: 'lib-navigation-menu',
    templateUrl: './navigation-menu.component.html',
    styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit, OnChanges {
    @Input() currentFile: string;
    @Output() markdownChange = new EventEmitter<string>();

    navigationMenu$: Observable<DocumentInterface[]>;
    docs$: Observable<DocCollectionInterface>;
    openedFolders: { [folder: string]: boolean }[] = [];

    constructor(private fileSystem: FileSystemService) {}

    ngOnInit() {
        this.docs$ = this.fileSystem.docs$;
        this.navigationMenu$ = this.fileSystem.navigationMenu$;
        this.fillOpenedFolders();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.currentFile.currentValue) {
            const folder = this.currentFile?.indexOf('/') !== -1 ? this.currentFile?.split('/')[0] : null;
            if (folder) {
                this.openedFolders[folder] = true;
            }
        }
    }

    private fillOpenedFolders() {
        this.docs$.subscribe((docs: DocCollectionInterface) => {
            if (docs) {
                Object.keys(docs).forEach((folderName: string) => {
                    this.openedFolders[folderName] = false;
                });
            }
        });
    }

    getFolderName(folder: { [folderName: string]: DocumentInterface[] }): string {
        return Object.keys(folder)[0];
    }

    getDocsFromFolder(folder: { [folderName: string]: DocumentInterface[] }): DocumentInterface[] {
        return folder[Object.keys(folder)[0]];
    }

    switchOpenFolder(folderName: string) {
        this.openedFolders[folderName] = !this.openedFolders[folderName];
    }

    isItemActived(item: any): boolean {
        return item.title ? this.currentFile === item.title : false;
    }

    isFolderItemActived(folder: string, title: string): boolean {
        return this.currentFile === `${folder}/${title}`;
    }

    loadMarkdown(name: string) {
        this.markdownChange.emit(name);
    }
}
