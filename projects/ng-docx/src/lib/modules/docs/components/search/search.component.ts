import { Component, HostListener, ViewChild, ElementRef, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { SearchItem, ConfigInterface } from '../../models';
import { forkJoin, Observable } from 'rxjs';
import * as Fuse from 'fuse.js/dist/fuse';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'lib-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    @Output() navigateToMarkdown = new EventEmitter<string>();

    panelVisible = false;
    searchValue: string;
    results: Fuse.FuseResult<any>[] = [];
    indexSearch = [];
    docsDir = 'assets/docs/';
    options = {
        keys: ['text', 'title'],
        findAllMatches: false,
        threshold: 0.2,
        distance: 0
    };
    fuse: Fuse<any, Fuse.IFuseOptions<any>>;

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
                this.options.distance = this.options.distance + content.length;
                this.indexSearch.push({ title: this.config.files[index], text: content } as SearchItem);
            });
            this.fuse = new Fuse(this.indexSearch, this.options);
        });
    }

    getFiles(): Observable<string>[] {
        return this.config.files.map((file: string) => {
            return this.http.get(`${this.docsDir}${file}.md`, { responseType: 'text' });
        });
    }

    search() {
        if (this.searchValue) {
            this.results = this.fuse.search(this.searchValue);
        } else {
            this.cleanResults();
        }
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
        this.navigateToMarkdown.emit(title);
        this.closePanel();
    }
}
