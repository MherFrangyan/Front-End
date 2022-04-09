import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PostService} from "../service/post.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnChanges {
  @Input() newPost: any;
  @Input() searchPost: any;
  public posts: any = [];
  public activeEditPost: any;
  public editForm = new FormGroup({
    title: new FormControl(''),
    body: new FormControl(''),
    userId: new FormControl(1)
  })
  constructor(public postService: PostService,
              public toaster: ToastrService) {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.searchPost) {
      return
    }
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

  removePost(index: number, id: number) {
    this.postService.deletePost(id).subscribe(res => {
      this.toaster.success('Post deleted successfully')
      this.posts.splice(this.posts.filter((indexPost: any) => indexPost.id === id), 1)
      console.log(res);
    })

  }

  saveChanges() {
    console.log(this.editForm.value)
    if (!this.editForm.value.title.trim() || !this.editForm.value.body.trim()) {
      this.toaster.warning('Please write text')
      return;
    }
    this.postService.updateData(this.editForm.value).subscribe( (res: any) => {
      this.toaster.success('Data saved successfully')
      this.posts.forEach((post: any) => {
         if (post.id === this.activeEditPost){
           console.log(post);
           post.title = this.editForm.value.title
           post.body = this.editForm.value.body
         }
      })
      this.activeEditPost = ''
    });
  }

}
