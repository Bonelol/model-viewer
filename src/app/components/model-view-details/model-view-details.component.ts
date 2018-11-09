import { Component, OnInit, Input } from '@angular/core';
import { ModelViewDescriptor } from 'src/app/models/model-view-descriptor';
import { ModelClassDetails } from 'src/app/models/ModelClassDetails';
import { Types } from 'src/app/enums/types.enum';
import { ModelDescribeService } from 'src/app/services/model-describe.service';
import { ModelViewStoreService } from 'src/app/services/model-view-store.service';
import { getType } from 'src/app/functions/typeCheck';
import { ModelViewOptions } from 'src/app/enums/model-view-options.enum';

@Component({
  selector: 'mv-details',
  templateUrl: './model-view-details.component.html',
  styleUrls: ['./model-view-details.component.css']
})
export class ModelViewDetailsComponent implements OnInit {
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

  constructor(private readonly service: ModelDescribeService, private readonly store: ModelViewStoreService) { }

  ngOnInit() {
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
}
