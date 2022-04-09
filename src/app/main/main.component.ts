import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @Input() postCount: any
  public postItem: any;
  public search: string = ''
  public postData: any;
  constructor() { }

  ngOnInit(): void {
  }

  addPosts(e: any) {
    this.postItem = e;
    console.log(e);
  }

  postsCounts(ev: any) {
    this.postData = ev;
    console.log(this.postData,'this.postData');
  }
}
