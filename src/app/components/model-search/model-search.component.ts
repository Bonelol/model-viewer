import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ModelDescribeService } from 'src/app/services/model-describe.service';
import { ModelViewDescriptor } from 'src/app/models/model-view-descriptor';
import { ModelClassDetails } from 'src/app/models/ModelClassDetails';
import { Types } from 'src/app/enums/types.enum';
import { getType } from 'src/app/functions/typeCheck';
import { ModelViewStoreService } from 'src/app/services/model-view-store.service';
import { ModelViewOptions } from 'src/app/enums/model-view-options.enum';

@Component({
  selector: 'mv-model-search',
  templateUrl: './model-search.component.html',
  styleUrls: ['./model-search.component.css']
})
export class ModelSearchComponent implements OnInit, OnChanges {
  @Input() modelViewDescriptor: ModelViewDescriptor;

  modelClassDetails: ModelClassDetails[] = [];
  types = Types;
  values: Map<string, any> = {} as any;

  get modelClassProperties(): ModelClassDetails[] {
    return this.modelClassDetails.filter(d => !d.IsNavigation);
  }

  constructor(private readonly service: ModelDescribeService, private readonly store: ModelViewStoreService) { }

  ngOnInit() {
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['modelViewDescriptor'] && this.modelViewDescriptor) {
      this.modelClassDetails = await this.service.getModelDesctiption(this.modelViewDescriptor.fullClassName).toPromise();
    }
  }

  getType(type: string): Types {
    return getType(type);
  }

  search() {
    console.log(this.values);
    const query = {
      type: this.modelViewDescriptor.fullClassName,
      query: this.values,
      page: 0,
      pageSize: 25
    };

    const descriptor = {
      ...this.modelViewDescriptor,
      query: query,
      type: ModelViewOptions.List,
      properties: this.modelClassDetails,
    } as ModelViewDescriptor;

    const index = this.store.descriptors.indexOf(this.modelViewDescriptor);
    const count = index + 1;
    this.store.descriptors = this.store.descriptors.slice(0, count).concat(descriptor);
  }
}
