import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PostService } from './post.service';
import { IPost } from './IPost';
import { MessageService } from '../../message.service';

export const postResolver: ResolveFn<IPost> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const postService: PostService = inject(PostService);
  const messageService: MessageService = inject(MessageService);
  const id: string | null = route.paramMap.get('id')!;
  return postService.getPostById(id).pipe(
    catchError(() => {
      messageService.showError('Не удалось загрузить пост');
      return EMPTY;
    })
  );
};
