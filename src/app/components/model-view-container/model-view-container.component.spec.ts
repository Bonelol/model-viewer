import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelViewContainerComponent } from './model-view-container.component';

describe('ModelViewContainerComponent', () => {
  let component: ModelViewContainerComponent;
  let fixture: ComponentFixture<ModelViewContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelViewContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
