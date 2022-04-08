import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PostService} from "../service/post.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ifStmt} from "@angular/compiler/src/output/output_ast";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnChanges {
  @Input() newPost: any;
  public posts: any = [];
  public activeEditPost: any;
  public editForm = new FormGroup({
    title: new FormControl(''),
    body: new FormControl(''),
    userId: new FormControl(1)
  })
  constructor(public postService: PostService) {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.newPost.currentValue) {
      this.posts.unshift(this.newPost)
    }
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(res => {
      this.posts = res
      console.log(this.posts);
    })
  }

  toggleEdit(postId: number) {
    this.activeEditPost = postId
    this.posts.filter((post: any) => post.id === postId)
      .map((data: any) => {
        this.editForm.patchValue({
          title: data.title,
          body: data.body,
        })
      });

    console.log(this.editForm.value)

  }

  removePost() {
    console.log('rrrrrrrrrrrrrrrrrrrrrr')
  }

  saveChanges() {
    console.log(this.editForm.value)
    this.postService.updateData(this.editForm.value).subscribe( (res: any) => {
      console.log(res);
    });
    // console.log(this.editForm.value, 'ttttttttttt')
  }

}
