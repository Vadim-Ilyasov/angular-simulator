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

  getPosts(limit: number, skip: number): Observable<IPostResponse> {
    return this.http.get<IPostResponse>('https://dummyjson.com/posts', {
      params: {
        limit: limit.toString(),
        skip: skip.toString(),
        select: 'title,tags,views',
      },
    });
  }

  deletePost(id: number | string): Observable<IPost> {
    return this.http.delete<IPost>(`https://dummyjson.com/posts/${id}`);
  }

  getPostById(id: number | string): Observable<IPost> {
    return this.http.get<IPost>(`https://dummyjson.com/posts/${id}`);
  }

  updatePost(post: IPost): Observable<IPost> {
    return this.http.put<IPost>(`https://dummyjson.com/posts/${post.id}`, {
      title: post.title,
      tags: post.tags,
      views: post.views
    })
  }

  createPost(post: IPost): Observable<IPost> {
    return this.http.post<IPost>('https://dummyjson.com/posts/add', post)
  }

}
