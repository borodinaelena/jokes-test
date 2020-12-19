import { Component } from '@angular/core';
import { JokeService } from '../../servises/joke.service'

@Component({
  selector: 'joke-list-main',
  templateUrl: './joke-list.component.html',
  styleUrls: ['./joke-list.component.scss']
})
export class JokeListComponent {

  public jokeList: any[];
  public count: number;
  public pageList:any[];
  public pageSize: number = 10;
  public pageIndex: number=0;
  constructor(private jokeService: JokeService) {
    console.log('JokeListComponent')
    jokeService.getJokeList().subscribe(res => {
      console.log('res', res)
      this.jokeList = res.value;
      this.count = this.jokeList.length;
      this.getPageList(this.pageIndex, this.pageIndex+this.pageSize);
    })
  }

  onPageChanged($event) {
    console.log($event);
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.getPageList(this.pageIndex, this.pageIndex+this.pageSize);
  }

  getPageList(firstI, lastI){
    this.pageList=[];
    for( let item=firstI; item<lastI; item++){
      this.pageList.push(this.jokeList[item]);
    }
  }

  hide(i){
    // console.log(i, this.pageIndex)
    console.log(i<this.pageIndex || i>=this.pageSize+this.pageIndex)
    return i<this.pageIndex || i>=this.pageSize+this.pageIndex;
  }
}
