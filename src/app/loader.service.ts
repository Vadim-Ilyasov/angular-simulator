import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IMessage } from '../interfaces/IMessage';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {

  private isLoaderSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoader$: Observable<boolean> = this.isLoaderSubject.asObservable();

  showLoader(): void {
    this.isLoaderSubject.next(true);
  }

  hideLoader(): void {
    this.isLoaderSubject.next(false);
  }

}
