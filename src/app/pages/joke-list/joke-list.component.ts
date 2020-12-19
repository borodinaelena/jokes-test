import { Component } from '@angular/core';

@Component({
  selector: 'joke-list-main',
  templateUrl: './joke-list.component.html',
  styleUrls: ['./joke-list.component.scss']
})
export class JokeListComponent {

  constructor(){
    console.log('JokeListComponent')
  }

}
