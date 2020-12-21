import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Input() count: number;
  @Input() pageSize = 10;
  @Input() currentPage = 1;

  @Output() onChangePage = new EventEmitter<any>();
  pagesCount = 0;
  pagesFirstPart = [];
  pagesSecondPart = [];
  pastCount = 0;
  customPage: number = null;

  constructor(
    public cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.initData();

  }

  initData() {
    this.pagesFirstPart = [];
    this.pagesSecondPart = [];
    this.pagesCount = parseInt(((this.count - 1) / this.pageSize).toString());
    if (this.pagesCount < this.count / this.pageSize) {
      this.pagesCount += 1;
    }
    if (this.currentPage > this.pagesCount) {
      this.currentPage -= 1;
      this.changePage(this.currentPage)
    }
    if (this.pagesCount <= 8) {
      for (let i = 1; i <= this.pagesCount; i++) {
        this.pagesFirstPart.push(i)
      }

      this.cdr.detectChanges();
      return;
    }

    this.pagesFirstPart = [1, 2, 3];
    this.pagesSecondPart = [this.pagesCount - 2, this.pagesCount - 1, this.pagesCount];
    this.cdr.detectChanges();
  }


  changePage(page) {
    page = parseInt(page);
    if (!page || page < 1 || page > this.pagesCount) {
      this.customPage = this.currentPage;
      return;
    }
    if (page === 0) {
      return;
    }
    this.currentPage = page;
    this.onChangePage.emit({
      pageSize: this.pageSize,
      pageIndex: this.currentPage - 1
    })
    this.getPages();
  }

  changeCustomPage($event) {
    this.customPage = $event.target.value;
  }

  getPages() {
    if (this.pagesCount <= 8) {
      this.pagesFirstPart = [];
      for (let i = 1; i <= this.pagesCount; i++) {
        this.pagesFirstPart.push(i)
      }
      return;
    }
    if (this.currentPage <= this.pagesCount - 6) {
      if (this.currentPage > 2) {
        this.pagesFirstPart = [this.currentPage - 1, this.currentPage, this.currentPage + 1];
        this.pagesSecondPart = [this.pagesCount - 2, this.pagesCount - 1, this.pagesCount];
      }
      else if (this.currentPage <= 2) {
        this.pagesFirstPart = [1, 2, 3];
        this.pagesSecondPart = [this.pagesCount - 2, this.pagesCount - 1, this.pagesCount];
      }
    } else {
      this.pagesFirstPart = [];
      this.pagesSecondPart = [];
      for (let i = this.pagesCount - 6; i <= this.pagesCount; i++) {
        this.pagesSecondPart.push(i);
      }
    }
  }

}
