import { Component } from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  imports: [ChildComponent],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.scss',
})
export class ParentComponent {

  user = {
    name: 'Alex',
    age: 20
  }

  changeName() {
    // this.user.name = 'Eugene'; при таком способе не меняется ссылка поэтому имя не меняется
    this.user = {
      ...this.user,
      name: 'Eugene'
    } // здесь меняется ссылка
  }
  
}
