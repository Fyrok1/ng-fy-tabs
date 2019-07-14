import { Component, Input, ComponentRef, DoCheck, ViewChild, ViewContainerRef, ComponentFactoryResolver, Renderer2, ElementRef, ApplicationRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ng-fy-tabs',
  templateUrl: './ng-fy-tabs.component.html',
  styleUrls: ['./ng-fy-tabs.component.scss']
})
export class NgFyTabsComponent implements DoCheck {

  constructor(
    private resolver: ComponentFactoryResolver,
    private renderer2: Renderer2,
    private appRef:ApplicationRef
  ) { }

  ngDoCheck() {
    if (this.tabs != undefined) {
      let isOk = true;
      for (let i = 0; i < this.tabs.length; i++) {
        for (let j = 0; j < this.tabs.length; j++) {
          if (i != j && this.tabs[i].id == this.tabs[j].id) {
            isOk = false;
          }
        }
      }
      this.isOk = isOk;      
      this.tabs.forEach(el => {        
        if (el.componentRef == undefined) {
          this.hideAll();
          this.setTab(el.id);
        } else {
          //Object.keys(el.componentRef.instance).forEach(function (key) { delete el.componentRef.instance[key]; });
          if (el.data != undefined) {
            for (let i = 0; i < el.data.length; i++) {
              if (el.componentRef.location.nativeElement.getAttribute(el.data[i].key) == null || el.componentRef.location.nativeElement.getAttribute(el.data[i].key) != el.data[i].value) {
                el.componentRef.instance[el.data[i].key] = el.data[i].value;
              }
            }
          }
        }
      })
      let countChild = 0;
      for (let i = 0; i < this.content.nativeElement.children.length; i++) {
        if (this.content.nativeElement.children[i].getAttribute('ngfycomponentid') != null) {
          countChild += 1;
        }
      }
      if (this.tabs.length < countChild) {
        let childCount = -1;
        for (let i = 0; i < this.content.nativeElement.children.length; i++) {
          if (this.content.nativeElement.children[i].getAttribute('ngfycomponentid') != null) {
            childCount++;
            let childIndex = this.tabs.findIndex(el => {
              if (el.id == this.content.nativeElement.children[i].getAttribute('ngfycomponentid')) {
                return true;
              }
            })
            if (childIndex == -1) {
              this.contentRef.remove(childCount);
            }
          }
        }
      }
      let sumWidth = 0;
      for (let i = 0; i < this.headers.nativeElement.children.length; i++) {
        if (this.headers.nativeElement.children[i].className.indexOf('item') != -1) {
          sumWidth+=this.headers.nativeElement.children[i].offsetWidth;
        }
      }      
      this.bottomBarWidth = (sumWidth > this.headers.nativeElement.clientWidth ? sumWidth : this.headers.nativeElement.clientWidth)+'px';  
      if (this.activeId != -1) {
        for (let i = 0; i < this.headers.nativeElement.children.length; i++) {          
          if (this.headers.nativeElement.children[i].className.indexOf('active') != -1) {
            this.headers.nativeElement.children[i].scrollIntoView({behavior:'smooth',block:'end',inline:'center'});
            break;
          }
        }
        if (this.tabs.findIndex(el=>el.id==this.activeId) == -1) {
          this.setTab(this.tabs[this.tabs.length-1].id);
        }
      }
    }
  }

  @Input() tabs: ngFyTabsInterface[] = [];
  @Output() tabChange = new EventEmitter<string>();
  @ViewChild('contentRef', { read: ViewContainerRef, static: true }) contentRef: ViewContainerRef;
  @ViewChild('content', { static: true }) content: ElementRef;
  @ViewChild('headers', { static: true }) headers: ElementRef;

  activeId: string | number = -1;
  isOk: boolean = true;
  bottomBarWidth = "0px";

  setTab(id: string | number) {
    let index = this.tabs.findIndex(el => {
      if (el.id == id) {
        return true;
      }
    })
    if (index != -1) {
      this.activeId = this.tabs[index].id;
      this.tabChange.emit(this.activeId.toString());
      if (this.tabs[index].componentRef == undefined) {
        this.tabs[index].componentRef = this.contentRef.createComponent(this.resolver.resolveComponentFactory(this.tabs[index].component));
        this.tabs[index].componentRef.changeDetectorRef.detectChanges();
        this.renderer2.setAttribute(this.tabs[index].componentRef.location.nativeElement, 'ngfycomponentid', this.tabs[index].id.toString());
        if (this.tabs[index].data != undefined) {
          this.tabs[index].data.forEach(el => {
            this.tabs[index].componentRef.instance[el.key] = el.value;
          })
        }
      }
      this.setVisual();
    }
  }

  setVisual() {
    setTimeout(() => {
      let countChild = -1;
      for (let i = 0; i < this.content.nativeElement.children.length; i++) {
        if (this.content.nativeElement.children[i].getAttribute('ngfycomponentid') != null) {
          countChild++;
          if (this.content.nativeElement.children[i].getAttribute('ngfycomponentid') == this.activeId) {
            this.content.nativeElement.children[i].style.display = "block";
          } else {
            this.content.nativeElement.children[i].style.display = "none";
            let isFind = false;
            for (let j = 0; j < this.tabs.length; j++) {
              if (this.tabs[j].id == this.content.nativeElement.children[i].getAttribute("ngfycomponentid")) {
                isFind = true;
              }
            }
            if (!isFind) {
              this.contentRef.remove(countChild);
            }
          }
        }
      }
    });
  }

  hideAll(){
    for (let i = 0; i < this.content.nativeElement.children.length; i++) {
      if (this.content.nativeElement.children[i].getAttribute('ngfycomponentid') != null) {
        this.content.nativeElement.children[i].style.display = "none";
      }
    }
  }

  removeTab(id: string | number) {
    let index = this.tabs.findIndex(el => {
      if (el.id == id) {
        return true;
      }
    })
    if (this.tabs.length == 1) {
      this.activeId = -1;
    } else {
      if (this.tabs[index].id == this.activeId) {
        if (index == 0) {
          this.activeId = this.tabs[1].id;
        } else {
          this.activeId = this.tabs[index - 1].id;
        }
      }
    }
    this.tabChange.emit(this.activeId.toString());
    let childCount = 0;
    for (let i = 0; i < this.content.nativeElement.children.length; i++) {
      if (this.content.nativeElement.children[i].getAttribute("ngfycomponentid") != null) {
        if (this.content.nativeElement.children[i].getAttribute("ngfycomponentid") == this.tabs[index].id) {
          this.contentRef.remove(childCount);
          break;
        }else{
          childCount++;
        }
      }
    }
    this.tabs.splice(index, 1);
    setTimeout(() => {
      this.setVisual();
    });
  }

  refreshTab(id: string | number) {
    if (this.tabs != undefined) {
      let index = this.tabs.findIndex(el => {
        if (el.id == id) {
          return true;
        }
      })

      if (index != -1) {
        let count = 0;
        for (let i = 0; i < this.content.nativeElement.children.length; i++) {
          if (this.content.nativeElement.children[i].getAttribute("ngfycomponentid") != null) {
            if (this.content.nativeElement.children[i].getAttribute("ngfycomponentid") == id) {
              this.contentRef.remove(count);
              this.tabs[index].componentRef = undefined;
              this.setTab(id);
              break;
            } else {
              count++;
            }
          }
        }
      }
    }
  }

  isActiveTabLoading(){
    if (this.tabs != undefined) {
      let index = this.tabs.findIndex(el=>{
        if (el.id == this.activeId) {
          return true;
        } 
      })
      if (index != -1) {
        if (this.tabs[index].loading) {
          return true;
        }
      }
    }
    return false;
  }
}

export interface ngFyTabsInterface {
  readonly id: string | number,
  title: string,
  canRefresh?: boolean,
  canClose?: boolean,
  readonly component: any,
  componentRef?: ComponentRef<any>,
  data?: { key: string, value: string }[],
  loading?: boolean
}