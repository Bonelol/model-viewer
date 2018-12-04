import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'mv-search-number-input',
  templateUrl: './model-search-number-input.component.html',
  styleUrls: ['./model-search-number-input.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ModelSearchNumberInputComponent),
    multi: true
  }]
})
export class ModelSearchNumberInputComponent implements OnInit, ControlValueAccessor {
  selectedValue = 'equals';
  value = '';
  input1: number = null;
  input2: number = null;
  input1PlaceHolder = '';
  input2PlaceHolder = '';

  get input1Visible(): boolean {
    return this.selectedValue === 'equals' || this.selectedValue === 'between' || this.selectedValue === 'greaterThan';
  }

  get input2Visible(): boolean {
    return this.selectedValue === 'between' || this.selectedValue === 'lessThan';
  }

  onChange: (_: any) => void = (_: any) => {};
  onTouched: () => void = () => {};

  constructor() { }

  ngOnInit() {
  }

  writeValue(obj: any): void {
    this.value = obj;
    this.selectedValue = 'equals';
    this.input1 = null;
    this.input2 = null;
    this.input1PlaceHolder = '';
    this.input2PlaceHolder = '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  updateChanges() {
    this.onChange(this.value);
  }

  handleChange() {
    switch (this.selectedValue) {
      case 'equals':
        this.input1PlaceHolder = 'Equals';
        this.input2PlaceHolder = '';
        this.value = `${this.input1}`;
        break;
      case 'between':
        this.input1PlaceHolder = 'Greater Than';
        this.input2PlaceHolder = 'Less Than';
        this.value = `>${this.input1} & <${this.input2}`;
        break;
      case 'greaterThan':
        this.input1PlaceHolder = 'Greater Than';
        this.input2PlaceHolder = 'Less Than';
        this.value = `>${this.input1}`;
        break;
      case 'lessThan':
        this.input1PlaceHolder = 'Greater Than';
        this.input2PlaceHolder = 'Less Than';
        this.value = `<${this.input2}`;
        break;
    }

    this.updateChanges();
  }
}
