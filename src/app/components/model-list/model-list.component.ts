import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ModelDescribeService } from 'src/app/services/model-describe.service';
import { ModelViewDescriptor } from 'src/app/models/model-view-descriptor';

@Component({
  selector: 'mv-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.css']
})
export class ModelListComponent implements OnInit {
  @Input() modelViewDescriptor: ModelViewDescriptor;

  @Output() mvOnModelSelected: EventEmitter<{Name: string, FullName: string}> = new EventEmitter();

  models: {Name: string, FullName: string}[] = [];
  selectModel: {Name: string, FullName: string};

  constructor(private readonly service: ModelDescribeService) { }

  async ngOnInit() {
    this.models = await this.service.getModels().toPromise();
  }

  handleNgModelChange(model: {Name: string, FullName: string}) {
    this.mvOnModelSelected.emit(model);
  }
}
