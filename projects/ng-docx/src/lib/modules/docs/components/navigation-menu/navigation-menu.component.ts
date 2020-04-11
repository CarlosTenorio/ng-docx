import { Component, Input, EventEmitter, Output, OnInit, Inject } from '@angular/core';
import { ConfigInterface } from '../../models';

@Component({
    selector: 'lib-navigation-menu',
    templateUrl: './navigation-menu.component.html',
    styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {
    @Input() currentFile: string;
    @Output() markdownChange = new EventEmitter<string>();

    files: string[];

    constructor(@Inject('config') private config: ConfigInterface) {}

    ngOnInit() {
        this.files = this.config.files;
        if (!this.currentFile) {
            this.currentFile = this.files[0];
        }
    }

    loadMarkdown(name: string) {
        this.markdownChange.emit(name);
    }
}
