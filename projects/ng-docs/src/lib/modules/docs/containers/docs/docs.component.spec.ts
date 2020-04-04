import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgDocsComponent } from './docs.component';

describe('NgDocsComponent', () => {
    let component: NgDocsComponent;
    let fixture: ComponentFixture<NgDocsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NgDocsComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NgDocsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
