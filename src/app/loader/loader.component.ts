import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { LoaderService } from '../loader.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [AsyncPipe, FontAwesomeModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {

  loaderService: LoaderService = inject(LoaderService);

  faArrowsRotate: IconDefinition = faArrowsRotate;

}
