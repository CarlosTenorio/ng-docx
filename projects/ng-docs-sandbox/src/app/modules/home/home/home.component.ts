import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    imageCookie = 'https://serviceware-se.com/fileadmin/medialis/Resources/img/logos/serviceware-signet-orange.svg';

    constructor() {}

    ngOnInit(): void {}
}
