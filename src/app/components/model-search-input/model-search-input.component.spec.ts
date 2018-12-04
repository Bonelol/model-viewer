import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelSearchInputComponent } from './model-search-input.component';

describe('ModelSearchInputComponent', () => {
  let component: ModelSearchInputComponent;
  let fixture: ComponentFixture<ModelSearchInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelSearchInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
