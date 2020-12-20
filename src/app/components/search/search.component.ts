import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'search-main',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  public serachString: string = "";
  @Output() onSearch = new EventEmitter<string>();

  constructor() { }

  search() {
    this.onSearch.emit(this.serachString);
  }

}
