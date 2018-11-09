import { ModelViewOptions } from '../enums/model-view-options.enum';
import { ModelClassDetails } from './ModelClassDetails';

export class ModelViewDescriptor {
    type: ModelViewOptions;
    fullClassName: string;
    data: any;
    query: any;
    properties: ModelClassDetails[];
}
