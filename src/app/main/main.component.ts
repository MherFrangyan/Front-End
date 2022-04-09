import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public postItem: any;
  public search: string = ''
  constructor() { }

  ngOnInit(): void {
  }

  addPosts(e: any) {
    this.postItem = e;
    console.log(e);
  }
}
