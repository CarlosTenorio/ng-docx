import { Component, Input } from '@angular/core';

@Component({
    selector: 'edit-button',
    templateUrl: './edit-button.component.html',
    styleUrls: ['./edit-button.component.scss']
})
export class EditButtonComponent {
    @Input() path: string;

    constructor() {}

    goToEdit() {
        window.open(this.path, '_blank');
    }
}
