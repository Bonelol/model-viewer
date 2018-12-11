import { Component, OnInit } from '@angular/core';
import { ModelViewDescriptor } from 'src/app/models/model-view-descriptor';
import { ModelViewOptions } from 'src/app/enums/model-view-options.enum';
import { ModelViewStoreService } from 'src/app/services/model-view-store.service';

@Component({
    selector: 'mv-container',
    templateUrl: './model-view-container.component.html',
    styleUrls: ['./model-view-container.component.css']
})
export class ModelViewContainerComponent implements OnInit {
    get descriptors(): ModelViewDescriptor[] {
        return this.store.descriptors;
    }

    constructor(private readonly store: ModelViewStoreService) { }

    ngOnInit() {
        // const descriptor = new ModelViewDescriptor();
        // descriptor.type = ModelViewOptions.Entry;
        // this.descriptors.push(descriptor);
    }

    handleMvOnModelSelected(model: { FullName: string, Name: string }) {
        if (!model) {
            return;
        }

        const descriptor = new ModelViewDescriptor();
        descriptor.fullClassName = model.FullName;
        descriptor.type = ModelViewOptions.Search;
        this.store.descriptors = [descriptor];
    }

    handleClose(descriptor: ModelViewDescriptor) {
        const index = this.descriptors.indexOf(descriptor);
        this.store.descriptors = index === 0 ? [] : this.descriptors.slice(0, index);
    }
}
