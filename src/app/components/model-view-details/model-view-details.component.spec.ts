import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelViewDetailsComponent } from './model-view-details.component';

describe('ModelViewDetailsComponent', () => {
    let component: ModelViewDetailsComponent;
    let fixture: ComponentFixture<ModelViewDetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModelViewDetailsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModelViewDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
