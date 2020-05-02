import { TestBed } from '@angular/core/testing';

import { NgDocxService } from './ng-docx.service';

describe('NgDocxService', () => {
    let service: NgDocxService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(NgDocxService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
