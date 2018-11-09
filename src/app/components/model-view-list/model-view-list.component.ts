import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ModelViewDescriptor } from 'src/app/models/model-view-descriptor';
import { ModelDescribeService } from 'src/app/services/model-describe.service';
import { ModelViewStoreService } from 'src/app/services/model-view-store.service';
import { ModelViewOptions } from 'src/app/enums/model-view-options.enum';

@Component({
  selector: 'mv-list',
  templateUrl: './model-view-list.component.html',
  styleUrls: ['./model-view-list.component.css']
})
export class ModelViewListComponent implements OnInit, OnChanges {
  @Input() modelViewDescriptor: ModelViewDescriptor;

  result: any[] = [];

  constructor(private readonly service: ModelDescribeService, private readonly store: ModelViewStoreService) { }

  ngOnInit() {
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['modelViewDescriptor'] && this.modelViewDescriptor) {
      this.result = this.modelViewDescriptor.data || await this.service.search(this.modelViewDescriptor.query).toPromise();
      console.log(this.result);
    }
  }

  onItemClick(item: any) {
    const descriptor = {
      ...this.modelViewDescriptor,
      data: item,
      type: ModelViewOptions.Details
    } as ModelViewDescriptor;

    const index = this.store.descriptors.indexOf(this.modelViewDescriptor);
    const count = index + 1;
    this.store.descriptors = this.store.descriptors.slice(0, count).concat(descriptor);
  }
}
