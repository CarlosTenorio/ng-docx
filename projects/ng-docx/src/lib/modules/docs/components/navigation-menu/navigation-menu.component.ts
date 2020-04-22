import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { FileSystemService } from './../../services/file-system/file-system.service';
import { DocumentInterface } from '../../models';
import { Observable } from 'rxjs';

@Component({
    selector: 'lib-navigation-menu',
    templateUrl: './navigation-menu.component.html',
    styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {
    @Input() currentFile: string;
    @Output() markdownChange = new EventEmitter<string>();

    docs$: Observable<DocumentInterface[]>;

    constructor(private fileSystem: FileSystemService) {}

    ngOnInit() {
        this.docs$ = this.fileSystem.docs$;
    }

    loadMarkdown(name: string) {
        this.markdownChange.emit(name);
    }
}
