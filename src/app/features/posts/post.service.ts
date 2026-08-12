import { Injectable, inject } from '@angular/core';
import { PostApiService } from './post-api.service';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { IPostResponse } from './IPostResponse';
import { IPost } from './IPost';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  postApiService: PostApiService = inject(PostApiService);

  private postsSubject: BehaviorSubject<IPostResponse | null> =
    new BehaviorSubject<IPostResponse | null>(null);
  posts$: Observable<IPostResponse | null> = this.postsSubject.asObservable();

  showPosts(limit: number, skip: number): Observable<IPostResponse> {
    return this.postApiService.getPosts(limit, skip).pipe(
      tap((response: IPostResponse) => {
        this.postsSubject.next(response);
      }),
      catchError((error) => {
        console.log('Ошибка при загрузке постов из API:', error);
        return throwError(() => error);
      }),
    );
  }

  deletePostById(id: number | string): Observable<IPost> {
    return this.postApiService.deletePost(id).pipe(
      tap(() => {
        const currentData: IPostResponse | null = this.postsSubject.getValue();
        if (currentData) {
          const updatedPosts: IPost[] = currentData.posts.filter(
            (post) => post.id !== Number(id) && post.id !== id,
          );
          this.postsSubject.next({
            ...currentData,
            posts: updatedPosts,
            total: currentData.total - 1,
          });
        }
      }),
    );
  }

  getPostById(id: number | string): Observable<IPost> {
    return this.postApiService.getPostById(id);
  }

  updatePost(updatedPost: IPost): Observable<IPost> {
    return this.postApiService.updatePost(updatedPost)
    .pipe(
      tap((resPost: IPost) => {
        const currentData: IPostResponse | null = this.postsSubject.getValue();
        if (currentData) {
          const updatedPosts: IPost[] = currentData.posts.map((post) =>
            post.id === resPost.id ? { ...post, ...resPost } : post,
          );
          this.postsSubject.next({ ...currentData, posts: updatedPosts });
        }
      }),
    );
  }

  createPost(post: IPost): Observable<IPost> {
    return this.postApiService.createPost(post)
    .pipe(
      tap((newPost: IPost) => {
        const currentData: IPostResponse | null = this.postsSubject.getValue();
        if (currentData) {
          this.postsSubject.next({
            ...currentData,
            posts: [newPost, ...currentData.posts],
            total: currentData.total + 1,
          });
        }
      }),
    );
  }

}
