import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  @Output() newPost = new EventEmitter();
  public postForm = new FormGroup({
    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
    id: new FormControl(''),
    userId: new FormControl(1),
  })

  constructor() {
  }

  ngOnInit(): void {
  }

  createPost() {
    this.postForm.value.id = Math.floor(Math.random() * 20) + 6
    this.newPost.emit(this.postForm.value)
    this.postForm.reset()
  }
}
