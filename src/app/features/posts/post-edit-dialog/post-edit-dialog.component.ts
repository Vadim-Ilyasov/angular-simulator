import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { IPost } from '../IPost';

@Component({
  selector: 'app-post-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
  ],
  templateUrl: './post-edit-dialog.component.html',
  styleUrl: './post-edit-dialog.component.scss',
})
export class PostEditDialogComponent {

  private fb: FormBuilder = inject(FormBuilder);
  private ref: DynamicDialogRef<IPost> = inject(DynamicDialogRef);
  private config: DynamicDialogConfig<IPost> = inject(DynamicDialogConfig);
  post: IPost | null = null;

  editForm: FormGroup = this.fb.group({
    title: [''],
    tags: [''],
    views: [0],
  });

  ngOnInit(): void {
    this.post = this.config.data ?? null;
    if (this.post) {
      this.editForm.patchValue({
        title: this.post.title,
        tags: this.post.tags ? this.post.tags.join(', ') : '',
        views: this.post.views,
      });
    }
  }

  onSave(): void {
    if (this.editForm.invalid || !this.post) return;

    const updatedTags: string[] = this.editForm.value.tags
      ? this.editForm.value.tags
          .split(',')
          .map((tag: string) => tag.trim())
          .filter((tag: string) => tag.length > 0)
      : [];

    const updatedPost: IPost = {
      ...this.post,
      title: this.editForm.value.title,
      tags: updatedTags,
      views: this.editForm.value.views,
    };

    this.ref.close(updatedPost);
  }

  closeDialog(): void {
    this.ref.close();
  }

}
