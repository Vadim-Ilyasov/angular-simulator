import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
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
    DialogModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
  ],
  templateUrl: './post-edit-dialog.component.html',
  styleUrl: './post-edit-dialog.component.scss',
})
export class PostEditDialogComponent {

  private fb: FormBuilder = inject(FormBuilder);

  @Input() visible: boolean = false;
  @Input() post: IPost | null = null;

  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() save: EventEmitter<IPost> = new EventEmitter<IPost>();

  editForm: FormGroup = this.fb.group({
    title: [''],
    tags: [''],
    views: [0],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post'] && this.post) {
      this.editForm.patchValue({
        title: this.post.title,
        tags: this.post.tags ? this.post.tags.join(', ') : '',
        views: this.post.views,
      });
    }
  }

  onSave(): void {
    if (this.editForm.invalid || !this.post) return;

    const formValue = this.editForm.value;
    const updatedTags = formValue.tags
      ? formValue.tags
          .split(',')
          .map((tag: string) => tag.trim())
          .filter((tag: string) => tag.length > 0)
      : [];

    const updatedPost: IPost = {
      ...this.post,
      title: formValue.title,
      tags: updatedTags,
      views: formValue.views,
    };

    this.save.emit(updatedPost);
    this.closeDialog();
  }

  closeDialog(): void {
    this.visibleChange.emit(false);
  }

}
