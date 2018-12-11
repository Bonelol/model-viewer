import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelViewSwitchComponent } from './model-view-switch.component';

describe('ModelViewSwitchComponent', () => {
    let component: ModelViewSwitchComponent;
    let fixture: ComponentFixture<ModelViewSwitchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModelViewSwitchComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModelViewSwitchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
