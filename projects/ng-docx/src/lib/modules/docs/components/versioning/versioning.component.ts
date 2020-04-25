import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'lib-versioning',
    templateUrl: './versioning.component.html',
    styleUrls: ['./versioning.component.scss']
})
export class VersioningComponent {
    @Input() versions: string[];
    @Input() currentVersion: string;

    @Output() versionChange = new EventEmitter<string>();

    constructor() {}

    selectionChange() {
        this.versionChange.emit(this.currentVersion);
    }
}
