import { Component, OnInit, Input } from '@angular/core';
import { Types } from 'src/app/enums/types.enum';

@Component({
    selector: 'mv-search-input',
    templateUrl: './model-search-input.component.html',
    styleUrls: ['./model-search-input.component.css']
})
export class ModelSearchInputComponent implements OnInit {
    @Input() inputType: Types;

    constructor() { }

    ngOnInit() {
    }

}
