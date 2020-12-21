import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JokeService } from 'src/app/servises/joke.service';

@Component({
  selector: 'app-joke',
  templateUrl: './joke.component.html',
  styleUrls: ['./joke.component.scss']
})
export class JokeComponent {

  public jokeId: string;
  public joke: string;
  constructor(
    private route: ActivatedRoute,
    private jokeService: JokeService,
    private router: Router) {
    this.jokeId = this.route.snapshot.params.jokeId;
    this.jokeService.getJoke(this.jokeId)
      .subscribe(res => {
        console.log(res)
        this.joke = res.value.joke;
      })
  }

  goBack() {
    this.router.navigate([`/list`]);
  }
}