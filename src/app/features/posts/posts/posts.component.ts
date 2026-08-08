import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PostService } from '../post.service';
import { BehaviorSubject, catchError, EMPTY, finalize, Observable, tap, throwError } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { IPost } from '../IPost';
import { IPostResponse } from '../IPostResponse';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    TableModule,
    SkeletonModule,
    ContextMenuModule,
    AsyncPipe,
    PostEditDialogComponent,
    ButtonModule,
    RouterLink,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {

  private postService: PostService = inject(PostService);
  private router: Router = inject(Router);
  private cd: ChangeDetectorRef = inject(ChangeDetectorRef);
  private isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();
  posts$: Observable<IPostResponse | null> = this.postService.posts$;
  pageSize: number = 10;
  currentPage: number = 1;
  totalElements: number = 0;
  first: number = 0;
  isEditDialogVisible: boolean = false;
  skeletonRows: unknown[] = [];
  posts: IPost[] = [];
  selectedPost: IPost | null = null;
  menuItems: MenuItem[] = [];

  ngOnInit(): void {
    this.loadPostsPage();
    this.initContextMenu();
  }

  initContextMenu(): void {
    this.menuItems = [
      {
        label: 'Просмотр',
        icon: 'pi pi-fw pi-search',
        command: () => this.viewPost(),
      },
      {
        label: 'Редактировать',
        icon: 'pi pi-fw pi-pencil',
        command: () => this.editPost(),
      },
      {
        label: 'Удалить',
        icon: 'pi pi-fw pi-trash',
        command: () => this.deletePost(),
      },
    ];
  }

  loadPostsPage(): void {
    this.isLoadingSubject.next(true);
    this.skeletonRows = Array.from({ length: this.pageSize }).map((_, i) => `Item #${i}`);
    const skip: number = (this.currentPage - 1) * this.pageSize;
    this.postService
      .showPosts(this.pageSize, skip)
      .pipe(
        tap((response) => {
          this.posts = response.posts;
          this.totalElements = response.total;
        }),
        catchError(() => EMPTY),
        finalize(() => {
          this.isLoadingSubject.next(false);
          this.cd.markForCheck();
        }),
      )
    .subscribe();
  }

  onPageChange(event: any): void {
    this.pageSize = event.rows;
    this.first = event.first;
    this.currentPage = event.first / event.rows + 1;
    this.loadPostsPage();
  }

  viewPost(): void {
    if (this.selectedPost) {
      this.router.navigate(['/posts', this.selectedPost.id]);
    }
  }

  editPost(): void {
    if (this.selectedPost) {
      this.isEditDialogVisible = true;
    }
  }

  deletePost(): void {
    if (!this.selectedPost) return;
    const idToDelete: number = this.selectedPost.id;
    this.postService
      .deletePostById(idToDelete)
      .pipe(
        tap(() => {
          this.posts = this.posts.filter((post) => post.id !== idToDelete);
          this.totalElements--;
        }),
        catchError(() => {
          this.isLoadingSubject.next(false);
          return EMPTY;
        }),
        finalize(() => {
          this.selectedPost = null;
          this.cd.markForCheck();
        }),
      )
    .subscribe();
  }

  onSaveEditedPost(updatedPost: IPost): void {
    this.postService
      .updatePost(updatedPost)
      .pipe(
        tap((resPost) => {
          const index: number = this.posts.findIndex((p) => p.id === resPost.id);
          if (index !== -1) {
            this.posts[index] = { ...this.posts[index], ...resPost };
            this.posts = [...this.posts];
          }
        }),
        finalize(() => {
          this.cd.markForCheck();
        }),
      )
    .subscribe();
  }

  onDoubleClick(post: IPost): void {
    this.router.navigate(['/posts', post.id]);
  }

}
