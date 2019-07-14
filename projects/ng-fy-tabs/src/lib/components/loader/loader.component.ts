import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ng-fy-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() open:boolean = false;

}
