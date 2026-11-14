import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { IPostResponse } from '../../features/posts/IPostResponse';

@Component({
  selector: 'app-counter-default',
  imports: [],
  templateUrl: './counter-default.component.html',
  styleUrl: './counter-default.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CounterDefaultComponent {

  private http: HttpClient = inject(HttpClient);
  private postsUrl: string = 'https://dummyjson.com/posts';
  count: number = 0;

  ngDoCheck() {
    console.log('Change Detection');
  }

  changeAfterClick() {
    this.count++;
  }

  changeAfterSetTimeOut() {
    setTimeout(() => {
      this.count += 3;
    }, 1000);
  }
  
  changeAfterPromise() {
    Promise.resolve().then(() => {
      this.count += 5;
    });
  }

  changeAfterHttpClient() {
    this.http.get<IPostResponse>(this.postsUrl)
    .pipe(
      tap((posts: IPostResponse) => this.count = posts.limit)
    ).subscribe();
  }

  changeAfterSetInterval() {
    setInterval(() => this.count++, 2000);
  }

  changeAfterThreeOperation() {
    this.count += 10;
    setTimeout(() => {
      this.count += 20;
    }, 1000);
    Promise.resolve().then(() => {
      this.count += 30;
    });
  }

}

// 1.Обновился ли интерфейс автоматически? Да, во всех сценариях

// 2.Сколько раз выполнился ngDoCheck()? всего 6 сообщений вышло 

// 3.Понадобилось ли использовать ChangeDetectorRef? ни в одном сценарии не понадобилось

// 4.Что именно, по вашему мнению, стало причиной запуска Change Detection?


