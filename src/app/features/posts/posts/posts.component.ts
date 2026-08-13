import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PostService } from '../post.service';
import { BehaviorSubject, catchError, EMPTY, finalize, Observable, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { TableModule, TablePageEvent } from 'primeng/table';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SkeletonModule } from 'primeng/skeleton';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IPost } from '../IPost';
import { IPostResponse } from '../IPostResponse';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component';
import { ButtonModule } from 'primeng/button';
import { MessageService } from '../../../message.service';

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
  providers: [DialogService],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {

  private postService: PostService = inject(PostService);
  private router: Router = inject(Router);
  private cd: ChangeDetectorRef = inject(ChangeDetectorRef);
  private dialogService: DialogService = inject(DialogService);
  messageService: MessageService = inject(MessageService);
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
    this.postService.posts$
    .pipe(
      takeUntilDestroyed(),
      tap((data: IPostResponse | null) => {
        if (data) {
          this.posts = data.posts;
          this.totalElements = data.total;
          this.cd.markForCheck();
        }
      })
    )
  .subscribe();
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
    this.skeletonRows = Array.from({ length: this.pageSize }).map((_, i) => `Item #${ i }`);
    const skip: number = (this.currentPage - 1) * this.pageSize;
    this.postService
      .showPosts(this.pageSize, skip)
      .pipe(
        tap((response: IPostResponse) => {
          this.posts = response.posts;
          this.totalElements = response.total;
        }),
        catchError(() => {
          this.messageService.showError('Не удалось загрузить пост');
          return EMPTY;
        }),
        finalize(() => {
          this.isLoadingSubject.next(false);
          this.cd.markForCheck();
        }),
      )
      .subscribe();
  }

  onPageChange(event: TablePageEvent): void {
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
    if (!this.selectedPost) return;

    const ref: DynamicDialogRef<PostEditDialogComponent> | null = this.dialogService.open(
      PostEditDialogComponent,
      {
        header: 'Редактировать пост',
        width: '500px',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        data: this.selectedPost,
      },
    );

    ref?.onClose
      .pipe(
        tap((updatedPost: IPost | undefined) => {
          if (updatedPost) {
            this.onSaveEditedPost(updatedPost);
          }
        }),
      )
    .subscribe();
  }

  deletePost(): void {
    if (!this.selectedPost) return;
    const idToDelete: number = this.selectedPost.id;
    this.postService
      .deletePostById(idToDelete)
      .pipe(
        tap(() => {
          this.posts = this.posts.filter((post: IPost) => post.id !== idToDelete);
          this.totalElements--;
        }),
        catchError(() => {
          this.messageService.showError('Нет поста с этим id');
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
        catchError(() => {
          this.messageService.showError('Не удалось обновить пост');
          return EMPTY;
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
