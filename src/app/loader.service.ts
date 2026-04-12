import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IMessage } from '../interfaces/IMessage';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {

  private loaderSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  loader$: Observable<boolean> = this.loaderSubject.asObservable();

  loading: boolean = true;

  showLoader() {
    this.loaderSubject.next(this.loading);
  }

  hideLoader() {
    setTimeout(() => {
      this.loaderSubject.next(false);
    }, 2000);
  }

}
