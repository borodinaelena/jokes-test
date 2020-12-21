import { ChangeDetectorRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export abstract class PaginatedDataService {

  private searchString = "";
  private jokeList: any[];
  private count: number;
  private pageList: any[];
  private pageSize: number = 10;
  private pageIndex = 0;
  private fullJokeList: any[];

  constructor() { }

  setPage(newPage) {
    this.pageIndex = newPage;
    return this.getPageList();
  }

  getPage() {
    return this.pageIndex;
  }

  getCount() {
    return this.count;
  }

  setCount(count) {
    this.count = count;
  }

  setSearchString(newSearchString) {
    this.searchString = newSearchString;
  }

  getSearchString() {
    return this.searchString;
  }

  setJokeList(list) {
    this.fullJokeList = list;
    this.jokeList = list;
    this.count = this.jokeList.length;
    return this.getPageList();
  }

  getSavedJokeList() {
    if (this.searchString && this.searchString !== "") {
      return this.getJokeList();
    }
    return this.pageList;
  }

  getPageList(firstI = this.pageIndex * this.pageSize, lastI = this.pageIndex * this.pageSize + this.pageSize) {
    this.pageList = [];
    for (let item = firstI; item < lastI; item++) {
      if (this.jokeList[item]) {
        this.pageList.push(this.jokeList[item]);
      }
    }
    return this.pageList;
  }

  getJokeList(searchString = this.searchString) {
    this.searchString = searchString;
    if (!this.fullJokeList || this.fullJokeList.length === 0) {
      return [];
    }
    this.jokeList = [];
    this.count = 0;
    this.pageIndex = 0;
    if (searchString === '') {
      this.jokeList = this.fullJokeList;
      this.count = this.jokeList.length;
      return this.getPageList(0, 10);
    }
    this.fullJokeList.forEach(item => {
      const joke = item.joke.toLowerCase();
      if (joke.includes(searchString)) {
        this.jokeList.push(item);
      }
    });
    this.count = this.jokeList.length;
    return this.getPageList(0, 10);
  }
}