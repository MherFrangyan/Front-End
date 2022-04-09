import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() postCount: any;
  public postDate: object = [];
  public blockTitle: string = 'Created date and count';
  public markerSettings: object = {}
  public xAxis: object = {}
  public yAxis: object = {}
  constructor() { }


  ngOnChanges(changes: SimpleChanges) {
    if (changes.postCount) {
      this.postDate = this.postCount
    }
  }

  ngOnInit(): void {
    this.xAxis = {
      title: 'Date time',
      valueType: 'DateTimeCategory',
    }
    this.yAxis = {
      title: 'Posts count'
    }
    this.markerSettings = {
      visible: true
    }

  }

}
