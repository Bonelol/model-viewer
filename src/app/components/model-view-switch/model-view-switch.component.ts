import { Component, OnInit, Input, EventEmitter, Output, ElementRef, AfterViewInit } from '@angular/core';
import { ModelViewDescriptor } from 'src/app/models/model-view-descriptor';
import { ModelViewOptions } from 'src/app/enums/model-view-options.enum';

@Component({
  selector: 'mv-switch',
  templateUrl: './model-view-switch.component.html',
  styleUrls: ['./model-view-switch.component.css']
})
export class ModelViewSwitchComponent implements OnInit, AfterViewInit {
  @Input() modelViewDescriptor: ModelViewDescriptor;
  @Output() close: EventEmitter<ModelViewDescriptor> = new EventEmitter();

  options = ModelViewOptions;

  constructor(private readonly elementRef: ElementRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    window.scrollTo(window.document.body.scrollWidth, 0);
  }

  handleCloseButtonOnClick()  {
    this.close.emit(this.modelViewDescriptor);
  }
}
