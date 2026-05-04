import { Component, DestroyRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs';

@Component({
  selector: 'app-users-filter',
  standalone: true,
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent {

  @Input() name!: string;
  @Output() OnFilterName: EventEmitter<string> = new EventEmitter<string>();
  private destroyRef: DestroyRef = inject(DestroyRef);

  nameControl:FormControl<string | null> = new FormControl('', [Validators.required]);


  ngOnInit() {
    this.nameControl.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((name: string | null) => name?.trim().toLowerCase() || ''),
      tap((name: string) => this.OnFilterName.emit(name)),
      takeUntilDestroyed(this.destroyRef),
    )
    .subscribe();
  }

}
