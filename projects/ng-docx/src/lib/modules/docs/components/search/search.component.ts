import { Component, HostListener, ViewChild, ElementRef, OnInit, EventEmitter, Output } from '@angular/core';
import { DocumentInterface } from '../../models';
import { FileSystemService } from '../../services/file-system/file-system.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'lib-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    @Output() navigateToMarkdown = new EventEmitter<{ title: string; search: string }>();

    panelVisible = false;
    searchValue: string;
    results: any = [];
    indexSearch = [];
    docs$: Observable<DocumentInterface[]>;

    @ViewChild('inputSearch', { static: false }) private inputSearch: ElementRef;

    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        this.closePanel();
    }

    constructor(private fileSystem: FileSystemService) {}

    ngOnInit() {
        this.docs$ = this.fileSystem.docs$;
    }

    buildIndexSearch() {
        if (!this.indexSearch.length) {
            this.docs$.subscribe((docs: DocumentInterface[]) => {
                docs.forEach((doc: DocumentInterface) => {
                    this.indexSearch.push({ title: doc.title, content: doc.content } as DocumentInterface);
                });
            });
        }
    }

    search() {
        if (this.searchValue) {
            this.results = this.searchEngine(this.searchValue, ['content']);
        } else {
            this.cleanResults();
        }
    }

    searchEngine(queryQuery: string, keys: string[]): any[] {
        const results = [];
        this.indexSearch.forEach((item) => {
            keys.forEach((key: string) => {
                const index = item[key].toLocaleLowerCase().indexOf(queryQuery.toLocaleLowerCase());
                if (index >= 0) {
                    results.push(item);
                }
            });
        });
        return results.length ? results : null;
    }

    openPanel() {
        this.buildIndexSearch();
        this.panelVisible = true;
        setTimeout(() => {
            this.inputSearch.nativeElement.focus();
        });
    }

    closePanel() {
        if (this.panelVisible) {
            this.panelVisible = false;
            this.searchValue = null;
            this.cleanResults();
        }
    }

    cleanResults() {
        this.results = [];
    }

    navigateTo(title: string) {
        const search = this.searchValue;
        this.navigateToMarkdown.emit({ title, search });
        this.closePanel();
    }
}
