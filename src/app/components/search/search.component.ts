import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @Input() searchString = "";
  @Output() onSearch = new EventEmitter<string>();

  constructor() { }

  search() {
    this.onSearch.emit(this.searchString);
  }

}
