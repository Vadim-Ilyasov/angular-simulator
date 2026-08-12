import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tap, throwError, catchError, finalize, EMPTY } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { PostService } from '../post.service';
import { IPost } from '../IPost';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
  ],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent {

  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private postService: PostService = inject(PostService);

  isSubmitting = false;

  createForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
    userId: [1, [Validators.required, Validators.min(1)]],
    tags: [''],
    views: [0, [Validators.required, Validators.min(0)]],
  });

  onSubmit(): void {
    if (this.createForm.invalid) return;
    this.isSubmitting = true;
    const newPost: IPost = this.preparePostData();
    this.postService
      .createPost(newPost)
      .pipe(
        tap(() => {
          this.router.navigate(['/posts']);
        }),
        catchError(() => EMPTY),
        finalize(() => {
          this.isSubmitting = false;
        }),
      )
    .subscribe();
  }

  private preparePostData(): IPost {
    const tagsArray: string[] = this.createForm.value.tags
      ? this.createForm.value.tags
          .split(',')
          .map((tag: string) => tag.trim())
          .filter(Boolean)
      : [];

    return {
      id: 0,
      ...this.createForm.value,
      tags: tagsArray,
      reactions: { likes: 0, dislikes: 0 },
    };
  }

}
