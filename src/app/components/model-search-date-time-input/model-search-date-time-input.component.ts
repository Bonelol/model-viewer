import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { format } from 'date-fns';

@Component({
    selector: 'mv-search-date-time-input',
    templateUrl: './model-search-date-time-input.component.html',
    styleUrls: ['./model-search-date-time-input.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ModelSearchDateTimeInputComponent),
        multi: true
    }]
})
export class ModelSearchDateTimeInputComponent implements OnInit, ControlValueAccessor {
    selectedValue = 'equals';
    value = '';
    input1: Date = null;
    input2: Date = null;
    input1PlaceHolder = '';
    input2PlaceHolder = '';

    get input1Visible(): boolean {
        return this.selectedValue === 'equals' || this.selectedValue === 'between' || this.selectedValue === 'greaterThan';
    }

    get input2Visible(): boolean {
        return this.selectedValue === 'between' || this.selectedValue === 'lessThan';
    }

    onChange: (_: any) => void = (_: any) => { };
    onTouched: () => void = () => { };

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
                this.value = `='${format(this.input1, 'YYYY-MM-DD')}'`;
                break;
            case 'between':
                this.input1PlaceHolder = 'Greater Than';
                this.input2PlaceHolder = 'Less Than';
                this.value = `>'${format(this.input1, 'YYYY-MM-DD')}' & <'${format(this.input2, 'YYYY-MM-DD')}'`;
                break;
            case 'greaterThan':
                this.input1PlaceHolder = 'Greater Than';
                this.input2PlaceHolder = 'Less Than';
                this.value = `>'${format(this.input1, 'YYYY-MM-DD')}'`;
                break;
            case 'lessThan':
                this.input1PlaceHolder = 'Greater Than';
                this.input2PlaceHolder = 'Less Than';
                this.value = `<'${format(this.input2, 'YYYY-MM-DD')}'`;
                break;
        }

        this.updateChanges();
    }

}
