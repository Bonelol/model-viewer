import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelSearchNumberInputComponent } from './model-search-number-input.component';

describe('ModelSearchNumberInputComponent', () => {
  let component: ModelSearchNumberInputComponent;
  let fixture: ComponentFixture<ModelSearchNumberInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelSearchNumberInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelSearchNumberInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
