import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JokeService } from '../../servises/joke.service'

@Component({
  selector: 'joke-list-main',
  templateUrl: './joke-list.component.html',
  styleUrls: ['./joke-list.component.scss']
})
export class JokeListComponent {

  public jokeList: any[];
  public count: number;
  public pageList: any[];
  public pageSize: number = 10;
  public pageIndex: number;

  constructor(
    private jokeService: JokeService,
    private router: Router) {

    this.pageIndex = this.jokeService.getPage();
    this.jokeList = this.jokeService.getSavedJokeList();
    if (this.jokeList && this.jokeList.length !== 0) {
      this.count = this.jokeList.length;
      this.getPageList(this.pageIndex, this.pageIndex + this.pageSize);
      return;
    }
    this.jokeService.getJokeList()
      .subscribe(res => {
        this.jokeList = res.value;
        this.jokeService.setJokeList(this.jokeList);
        this.count = this.jokeList.length;
        this.getPageList(this.pageIndex, this.pageIndex + this.pageSize);
      })
  }

  onPageChanged($event) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.jokeService.setPage(this.pageIndex);
    this.getPageList(this.pageIndex, this.pageIndex + this.pageSize);
  }

  getPageList(firstI, lastI) {
    this.pageList = [];
    for (let item = firstI; item < lastI; item++) {
      this.pageList.push(this.jokeList[item]);
    }
  }

  goToJoke(id) {
    this.router.navigate([`/details/${id}`]);
  }
}
