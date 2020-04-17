import { Component, HostListener, ViewChild, ElementRef, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { SearchItem, ConfigInterface } from '../../models';
import { forkJoin, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
    docsDir = 'assets/docs/';

    @ViewChild('inputSearch', { static: false }) private inputSearch: ElementRef;

    @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
        this.closePanel();
    }

    constructor(@Inject('config') private config: ConfigInterface, private http: HttpClient) {}

    ngOnInit() {
        this.buildIndexSearch();
    }

    buildIndexSearch() {
        forkJoin(this.getFiles()).subscribe((texts: string[]) => {
            texts.forEach((content: string, index: number) => {
                this.indexSearch.push({ title: this.config.files[index], text: content } as SearchItem);
            });
        });
    }

    getFiles(): Observable<string>[] {
        return this.config.files.map((file: string) => {
            return this.http.get(`${this.docsDir}${file}.md`, { responseType: 'text' });
        });
    }

    search() {
        if (this.searchValue) {
            this.results = this.searchEngine(this.searchValue, ['text']);
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
