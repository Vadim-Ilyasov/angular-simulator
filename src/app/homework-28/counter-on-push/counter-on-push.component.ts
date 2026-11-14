import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, ChangeDetectorRef, DoCheck } from '@angular/core';

@Component({
  selector: 'app-counter-on-push',
  imports: [],
  templateUrl: './counter-on-push.component.html',
  styleUrl: './counter-on-push.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterOnPushComponent implements DoCheck {

  count: number = 0;
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef); 

  ngDoCheck() {
    console.log('Change Detection OnPush');
  }

  runMarkForCheck() {
    setTimeout(() => {
      this.count += 5;
      this.cdr.markForCheck();
    }, 1000);
  }

  // 1.Что произошло после вызова markForCheck()? 

  // Angular поставил специальный флаг на текущий компонент и поднялся вверх по дереву, 
  // проставив этот же флаг всем его родительским компонентам вплоть до корневого AppComponent.

  // 2.Обновился ли интерфейс сразу?

  // Нет, метод только планирует проверку

  // 3.Когда фактически произошел Change Detection?

  // Проверка запустилась сразу после завершения коллбэка setTimeout.

  // 4.Почему без markForCheck() интерфейс не обновлялся?

  // Компоненты со стратегией OnPush пропускаются при стандартном обходе дерева.

 
  runDetectChanges() {
    setTimeout(() => {
      this.count += 10;
      this.cdr.detectChanges();
    }, 1000);
  }

  // 1.Чем поведение отличается от предыдущего сценария?

  // detectChanges() не трогает родителей, а сам выступает триггером и мгновенно обновляет интерфейс локально.

  // 2.Выполняется ли Change Detection немедленно? Да


  // 3.Какие компоненты были проверены? Проверка затронула только текущий компонент и всех его дочерних компонентов

  // 4.В каких случаях использование detectChanges() предпочтительнее?

  // Этот метод применяют, когда нужно принудительно и локально обновить интерфейс вне стандартного цикла Angular.

  runDetachWithAllScenarios() {
    this.cdr.detach(); 
    this.count += 1;
    setTimeout(() => {
      this.count += 10;
    }, 1000);
    const intervalId: number = setInterval(() => {
      this.count += 2;
      if (this.count > 100) clearInterval(intervalId);
    }, 2000);

    Promise.resolve().then(() => {
      this.count += 5;
    });
  }

  // 1.Обновляется ли интерфейс? Нет

  // 2.Выполняется ли ngDoCheck()? Нет

  // 3.Почему Angular перестал проверять компонент?

  // Внутри каждого компонента в Angular есть специальное представление (LView), 
  // которое хранит битовую маску состояния (LViewFlags), так как компонент отсоединен, 
  // родитель просто пропускает его и все его дочернее поддерево.


  // 4.Какие способы изменения значения больше не работают?

  // Перестают работать все автоматические механизмы обновления шаблона.

  runReattach() {
    this.cdr.reattach(); 
    this.cdr.detectChanges(); 
  }

  // 1.Что изменилось после reattach()?

  // На внутреннем представлении компонента (LView) снова выставился системный флаг Attached.

  // 2.Когда компонент снова начал участвовать в Change Detection?

  // Из-за того что на следующей же строке вызван this.cdr.detectChanges(), 
  // компонент проверился мгновенно и синхронно, не дожидаясь следующего асинхронного события.

  // 3.Нужно ли дополнительно вызывать detectChanges() или markForCheck()? 

  // Да нужно вызвать detectChanges() для немедленного отображения актуального состояния на экране

}
