import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'mv-search-string-input',
    templateUrl: './model-search-string-input.component.html',
    styleUrls: ['./model-search-string-input.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ModelSearchStringInputComponent),
        multi: true
    }]
})
export class ModelSearchStringInputComponent implements OnInit, ControlValueAccessor {
    selectedValue = 'contains';
    input = '';
    value = '';
    onChange: (_: any) => void = (_: any) => { };
    onTouched: () => void = () => { };

    constructor() { }

    ngOnInit() {
    }

    writeValue(obj: any): void {
        this.value = obj;
        this.selectedValue = 'contains';
        this.input = '';
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
        this.value = `$contains ${this.input}`;
        this.updateChanges();
    }
}
