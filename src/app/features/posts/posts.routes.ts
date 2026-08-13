import { Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { postResolver } from './post.resolver';
import { PostCreateComponent } from './post-create/post-create.component';

export const postsRoutes: Routes = [
  {
    path: '',
    component: PostsComponent,
  },
  {
    path: 'create',
    component: PostCreateComponent,
  },
  {
    path: ':id',
    component: PostDetailComponent,
    resolve: { postData: postResolver },
  },
];
