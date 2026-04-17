import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-loader',
  imports: [AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {

  loaderService: LoaderService = inject(LoaderService);

}
