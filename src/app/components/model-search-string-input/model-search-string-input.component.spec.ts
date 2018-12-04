import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelSearchStringInputComponent } from './model-search-string-input.component';

describe('ModelSearchStringInputComponent', () => {
  let component: ModelSearchStringInputComponent;
  let fixture: ComponentFixture<ModelSearchStringInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelSearchStringInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelSearchStringInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
