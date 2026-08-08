import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PostService } from './post.service';
import { IPost } from './IPost';

export const postResolver: ResolveFn<IPost> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const postService: PostService = inject(PostService);
  const id: string | null = route.paramMap.get('id')!;
  const numericId = +id;
  return postService.getPostById(id).pipe(
    catchError((error) => {
      console.error('Ошибка резолвера при загрузке поста:', error);
      return of({
        id: numericId,
        title: 'Пост не найден (Ошибка сети)',
        body: 'Не удалось получить данные с сервера. Пожалуйста, проверьте подключение или включите VPN.',
        userId: 0,
        tags: ['ошибка'],
        views: 0,
        reactions: { likes: 0, dislikes: 0 }
      } as unknown as IPost);
    })
  );
};
