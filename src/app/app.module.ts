import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { ModelListComponent } from './components/model-list/model-list.component';
import { HttpService } from './services/http.service';
import { ModelDescribeService } from './services/model-describe.service';
import { ModelViewContainerComponent } from './components/model-view-container/model-view-container.component';
import { ModelSearchComponent } from './components/model-search/model-search.component';
import { ModelViewSwitchComponent } from './components/model-view-switch/model-view-switch.component';
import { ModelViewItemContainerComponent } from './components/model-view-item-container/model-view-item-container.component';
import { ModelViewListComponent } from './components/model-view-list/model-view-list.component';
import { ModelViewStoreService } from './services/model-view-store.service';
import { ModelViewDetailsComponent } from './components/model-view-details/model-view-details.component';
import { ModelSearchInputComponent } from './components/model-search-input/model-search-input.component';
import { ModelSearchStringInputComponent } from './components/model-search-string-input/model-search-string-input.component';
import { ModelSearchNumberInputComponent } from './components/model-search-number-input/model-search-number-input.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    ModelListComponent,
    ModelViewContainerComponent,
    ModelSearchComponent,
    ModelViewSwitchComponent,
    ModelViewItemContainerComponent,
    ModelViewListComponent,
    ModelViewDetailsComponent,
    ModelSearchInputComponent,
    ModelSearchStringInputComponent,
    ModelSearchNumberInputComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }, HttpService, ModelDescribeService, ModelViewStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
