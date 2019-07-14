import { NgModule } from '@angular/core';
import { NgFyTabsComponent } from './ng-fy-tabs.component';
import { LoaderComponent } from './components/loader/loader.component';
import { RippleDirective } from './directives/ripple.directive';
import { CommonModule } from '@angular/common';
 
@NgModule({
  declarations: [
    NgFyTabsComponent,
    LoaderComponent,
    RippleDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [NgFyTabsComponent]
})
export class NgFyTabsModule { }
