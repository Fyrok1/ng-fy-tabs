import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgFyTabsModule } from 'projects/ng-fy-tabs/src/public-api';
import { ExampleTabComponent } from './pages/example-tab/example-tab.component';

@NgModule({
  declarations: [
    AppComponent,
    ExampleTabComponent
  ],
  imports: [
    BrowserModule,
    NgFyTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[ExampleTabComponent]
})
export class AppModule { }
