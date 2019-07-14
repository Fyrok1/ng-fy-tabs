import { Component } from '@angular/core';
import { ngFyTabsInterface } from 'projects/ng-fy-tabs/src/public-api';
import { ExampleTabComponent } from './pages/example-tab/example-tab.component';

@Component({
  selector: 'mat-ta-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngFyTabsLib';
  tabIndex = 3;
  tabs:ngFyTabsInterface[] = [
    {
      title:"tab 1",
      id:1,
      component:ExampleTabComponent,
      data:[
        {
          key:"text",
          value:"tab 1 text"
        }
      ],
      canRefresh:true
    },
    {
      title:"tab 2",
      id:2,
      component:ExampleTabComponent,
    }
  ]

  activeId:string|number = -1;

  addTab(){
    this.tabs.push({
      id:this.tabIndex,
      title:"tab "+this.tabIndex,
      component:ExampleTabComponent,
      data:[
        {
          key:"text",
          value:"lel"
        }
      ]
    })
    this.tabIndex++;
  }

  onChange(id:string){
    this.activeId = id;        
  }

  setLoading(){
    let index = this.tabs.findIndex(el=>{
      if (el.id == this.activeId) {
        return true;
      }
    })    
    if (index != -1) {
      this.tabs[index].loading = !this.tabs[index].loading;
    }
  }
}