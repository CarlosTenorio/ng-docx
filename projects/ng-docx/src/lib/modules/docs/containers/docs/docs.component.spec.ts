import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgDocxComponent } from './docs.component';

describe('NgDocxComponent', () => {
    let component: NgDocxComponent;
    let fixture: ComponentFixture<NgDocxComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NgDocxComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NgDocxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
