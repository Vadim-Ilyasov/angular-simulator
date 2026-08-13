import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IPost } from '../IPost';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent {

  private route: ActivatedRoute = inject(ActivatedRoute);
  post!: IPost;

  ngOnInit() {
    this.post = this.route.snapshot.data['postData'];
  }

}
