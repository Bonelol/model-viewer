import { Injectable } from '@angular/core';
import { ModelViewDescriptor } from '../models/model-view-descriptor';

@Injectable({
  providedIn: 'root'
})
export class ModelViewStoreService {

  constructor() { }

  descriptors = new Array<ModelViewDescriptor>();
}
