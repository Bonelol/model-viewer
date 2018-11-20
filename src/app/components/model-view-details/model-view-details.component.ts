import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ModelViewDescriptor } from 'src/app/models/model-view-descriptor';
import { ModelClassDetails } from 'src/app/models/ModelClassDetails';
import { Types } from 'src/app/enums/types.enum';
import { ModelDescribeService } from 'src/app/services/model-describe.service';
import { ModelViewStoreService } from 'src/app/services/model-view-store.service';
import { getType } from 'src/app/functions/typeCheck';
import { ModelViewOptions } from 'src/app/enums/model-view-options.enum';
import { stringify } from 'querystring';

@Component({
  selector: 'mv-details',
  templateUrl: './model-view-details.component.html',
  styleUrls: ['./model-view-details.component.css']
})
export class ModelViewDetailsComponent implements OnInit, OnChanges {
  @Input() modelViewDescriptor: ModelViewDescriptor;

  modelClassDetails: ModelClassDetails[] = [];
  types = Types;

  get data() {
    return this.modelViewDescriptor.data;
  }

  get properties() {
    return this.modelViewDescriptor.properties;
  }

  get modelClassProperties(): ModelClassDetails[] {
    return this.modelClassDetails.filter(d => !d.IsNavigation);
  }

  private originalData: any;

  constructor(private readonly service: ModelDescribeService, private readonly store: ModelViewStoreService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['modelViewDescriptor']) {
      this.originalData = Object.assign({}, this.modelViewDescriptor.data);
    }
  }

  getType(type: string): Types {
    return getType(type);
  }

  async onViewProperty(property: ModelClassDetails) {

    const search = {
      type: property.TypeName,
      query: {},
      page: 0,
      pageSize: 25
    };

    for (const key of property.ForeignKeys) {
      search.query[key] = `=${this.data[key]}`;
    }

    const results = await this.service.search(search).toPromise();

    const typeDetails = await this.service.getModelDesctiption(property.TypeName).toPromise();
    const descriptor = {
      type: property.IsCollection ? ModelViewOptions.List : ModelViewOptions.Details,
      fullClassName: property.TypeName,
      properties: typeDetails,
      data: property.IsCollection ? results : results[0]
    } as ModelViewDescriptor;

    const index = this.store.descriptors.indexOf(this.modelViewDescriptor);
    const count = index + 1;
    this.store.descriptors = this.store.descriptors.slice(0, count).concat(descriptor);
  }

  async update() {
    const map = new Map<string, any>();
    const pks =  new Map<string, any>();

    for (const property of this.properties) {
      if (property.IsPrimaryKey) {
        pks[property.Name] = this.originalData[property.Name];
        continue;
      }

      if (this.data[property.Name] !== this.originalData[property.Name]) {
        map[property.Name] = this.data[property.Name];
      }
    }

    const query = {
      type: this.modelViewDescriptor.fullClassName,
      query: pks,
      page: 0,
      pageSize: 1
    };

    const result = await this.service.update(query, map).toPromise();
    console.log(result);
  }

  undo() {
    console.log('undo');
  }
}
