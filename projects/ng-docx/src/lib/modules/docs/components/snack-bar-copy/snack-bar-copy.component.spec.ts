import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SnackBarCopyComponent } from './snack-bar-copy.component';

describe('SnackBarCopyComponent', () => {
    let component: SnackBarCopyComponent;
    let fixture: ComponentFixture<SnackBarCopyComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SnackBarCopyComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SnackBarCopyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
