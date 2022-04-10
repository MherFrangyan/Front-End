import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(posts: [], search: string): any {
    if (!search.trim()) {
      return posts
    }

    const postResult: any = []

    posts.forEach((post: any) => {
      if (post['title'].toLowerCase().includes(search.toLowerCase())
        || post['body'].toLowerCase().includes(search.toLowerCase())) {
        postResult.push(post)
      }
    })
    return postResult
  }

}
