import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelSearchDateTimeInputComponent } from './model-search-date-time-input.component';

describe('ModelSearchDateTimeInputComponent', () => {
  let component: ModelSearchDateTimeInputComponent;
  let fixture: ComponentFixture<ModelSearchDateTimeInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelSearchDateTimeInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelSearchDateTimeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
