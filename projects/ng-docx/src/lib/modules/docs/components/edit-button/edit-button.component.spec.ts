import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditButtonComponent } from './edit-button.component';

describe('EditButtonComponent', () => {
    let component: EditButtonComponent;
    let fixture: ComponentFixture<EditButtonComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [EditButtonComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EditButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
