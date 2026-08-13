import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IPostResponse } from './IPostResponse';
import { IPost } from './IPost';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {

  private http: HttpClient = inject(HttpClient);
  private postsUrl: string = 'https://dummyjson.com/posts';

  getPosts(limit: number, skip: number): Observable<IPostResponse> {
    return this.http.get<IPostResponse>(this.postsUrl, {
      params: {
        limit: limit.toString(),
        skip: skip.toString(),
        select: 'title,tags,views',
      },
    });
  }

  deletePost(id: number | string): Observable<IPost> {
    return this.http.delete<IPost>(`${ this.postsUrl }/${ id }`);
  }

  getPostById(id: number | string): Observable<IPost> {
    return this.http.get<IPost>(`${ this.postsUrl }/${ id }`);
  }

  updatePost(post: IPost): Observable<IPost> {
    return this.http.put<IPost>(`${ this.postsUrl }/${ post.id }`, {
      title: post.title,
      tags: post.tags,
      views: post.views
    })
  }

  createPost(post: IPost): Observable<IPost> {
    return this.http.post<IPost>(`${ this.postsUrl }/add`, post)
  }

}
