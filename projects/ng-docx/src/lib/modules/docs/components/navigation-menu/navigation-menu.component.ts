import { Component, Input, EventEmitter, Output, OnInit, Inject } from '@angular/core';
import { ConfigInterface } from '../../models';

@Component({
    selector: 'lib-navigation-menu',
    templateUrl: './navigation-menu.component.html',
    styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {
    @Output() markdownChange = new EventEmitter<string>();

    files: string[];

    constructor(@Inject('config') private config: ConfigInterface) {}

    ngOnInit() {
        this.files = this.config.files;
    }

    loadMarkdown(name: string) {
        this.markdownChange.emit(name);
    }
}
