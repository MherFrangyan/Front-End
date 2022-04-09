import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {PostService} from "../service/post.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  providers: [DatePipe]
})
export class PostsComponent implements OnInit, OnChanges {
  @Input() newPost: any;
  @Input() searchPost: any;
  @Output() sendCount = new EventEmitter();
  public posts: any = [];
  public activeEditPost: any;
  public postCount:any = {};
  public editForm = new FormGroup({
    title: new FormControl(''),
    body: new FormControl(''),
    userId: new FormControl(1)
  })
  constructor(public postService: PostService,
              public toaster: ToastrService,
              public datePipe: DatePipe) {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.searchPost) {
      return
    }
    if (changes.newPost.currentValue) {
      this.postCount = {}
      this.newPost = {...this.newPost, date: this.datePipe.transform(Date.now(),'M/d/yy, h:mm')}
      this.posts.unshift(this.newPost)

      this.postCountFunc()
      console.log(this.postCount,'ng change');
    }
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe((res:any) => {
      res.map((post: any) => {
        console.log(post,'res.map');
        this.posts.push({...post, date: this.datePipe.transform(Date.now(),'M/d/yy, h:mm')})
      })
      console.log('this.posts')
      this.postCountFunc()
      console.log(this.posts);
      console.log(this.postCount);
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
      this.posts.splice(index, 1)
      console.log(res);
      this.postCountFunc()
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

  postCountFunc() {
    this.postCount = {};
    this.posts.forEach((value: any) => {
      this.postCount[value.date] = (this.postCount[value.date] || 0) + 1
    })
    let data:any = []
    for(let key in this.postCount) {
      data.push({date: key, count: this.postCount[key]})
    }
    this.sendCount.emit(data)
  }

}
