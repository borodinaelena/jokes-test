import { ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JokeService } from '../../servises/joke.service'

@Component({
  selector: 'app-joke-list',
  templateUrl: './joke-list.component.html',
  styleUrls: ['./joke-list.component.scss']
})
export class JokeListComponent {

  public jokeList: any[];
  public count: number;
  public pageList: any[];
  public pageSize: number = 10;
  public pageIndex: number;
  public fullJokeList: any[];
  constructor(
    private jokeService: JokeService,
    private router: Router,
    public cdr: ChangeDetectorRef) {

    this.pageIndex = this.jokeService.getPage();
    this.jokeList = this.jokeService.getSavedJokeList();
    this.fullJokeList = this.jokeList;
    if (this.jokeList && this.jokeList.length !== 0) {
      this.count = this.jokeList.length;
      this.getPageList();
      return;
    }
    this.jokeService.getJokeList()
      .subscribe(res => {
        this
        this.jokeList = res.value;
        this.fullJokeList = res.value;
        this.jokeService.setJokeList(this.jokeList);
        this.count = this.jokeList.length;
        this.getPageList();
      })
  }

  onPageChanged($event) {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.jokeService.setPage(this.pageIndex);
    this.getPageList();
  }

  getPageList(firstI = this.pageIndex * this.pageSize, lastI = this.pageIndex * this.pageSize + this.pageSize) {
    this.pageList = [];
    for (let item = firstI; item < lastI; item++) {
      if (this.jokeList[item]) {
        this.pageList.push(this.jokeList[item]);
      }
    }
  }

  goToJoke(id) {
    this.router.navigate([`/details/${id}`]);
  }

  getJokeList($event) {
    const searchString = $event.toLowerCase();
    this.jokeList = [];
    this.count = 0;
    this.pageIndex = 0;
    this.cdr.detectChanges();
    if ($event = '') {
      this.jokeList = this.fullJokeList;
      this.count = this.jokeList.length;
      this.getPageList(0, 10);
      return;
    }
    this.fullJokeList.forEach(item => {
      const joke = item.joke.toLowerCase();
      if (joke.includes(searchString)) {
        this.jokeList.push(item);
      }
    });
    this.count = this.jokeList.length;
    this.cdr.detectChanges();
    this.getPageList(0, 10);
  }
}
