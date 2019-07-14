import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-example-tab',
  templateUrl: './example-tab.component.html',
  styleUrls: ['./example-tab.component.scss']
})
export class ExampleTabComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  rand = Math.random();
  @Input() text:string = "";

}
