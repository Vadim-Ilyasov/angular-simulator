import { Component, DestroyRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs';

@Component({
  selector: 'app-users-filter',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent {

  @Input() name!: string;
  @Output() OnFilteredName = new EventEmitter<string>();
  private destroyRef = inject(DestroyRef);

  nameControl = new FormControl('', [Validators.required]);


  ngOnInit() {
    this.nameControl.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
      debounceTime(200),
      distinctUntilChanged(),
      map(name => name?.trim().toLowerCase() || ''),
      tap(name => this.OnFilteredName.emit(name))
    )
    .subscribe()
  }

}
