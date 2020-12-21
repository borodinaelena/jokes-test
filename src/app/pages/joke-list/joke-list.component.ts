import { ChangeDetectorRef } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JokeService } from '../../servises/joke.service'
import { PaginatedDataService } from '../../servises/paginated-data.service'

@Component({
  selector: 'app-joke-list',
  templateUrl: './joke-list.component.html',
  styleUrls: ['./joke-list.component.scss']
})
export class JokeListComponent {

  public jokeList: any[];
  public pageSize = 10;

  constructor(
    private jokeService: JokeService,
    private paginatedDataService: PaginatedDataService,
    private router: Router,
    public cdr: ChangeDetectorRef) {

    this.jokeList = this.paginatedDataService.getSavedJokeList();
    if (this.jokeList && this.jokeList.length !== 0) {
      return;
    }
    this.jokeService.getJokeList()
      .subscribe(res => {
        this.jokeList = this.paginatedDataService.setJokeList(res.value);
      })
  }

  onPageChanged($event) {
    this.jokeList = this.paginatedDataService.setPage($event.pageIndex);
  }

  goToJoke(id) {
    this.router.navigate([`/details/${id}`]);
  }

  getJokeList($event) {
    this.paginatedDataService.setCount(0);
    this.cdr.detectChanges();
    this.jokeList = this.paginatedDataService.getJokeList($event.toLowerCase());
    this.cdr.detectChanges();
  }

  get count() {
    return this.paginatedDataService.getCount();
  }

  get pageIndex() {
    return this.paginatedDataService.getPage();
  }

  get searchString() {
    return this.paginatedDataService.getSearchString();
  }
}
