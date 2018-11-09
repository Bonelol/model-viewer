import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelViewItemContainerComponent } from './model-view-item-container.component';

describe('ModelViewItemContainerComponent', () => {
  let component: ModelViewItemContainerComponent;
  let fixture: ComponentFixture<ModelViewItemContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelViewItemContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelViewItemContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
