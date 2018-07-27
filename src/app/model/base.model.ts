export class BaseMode {
  createdDateTime: Date;
  createdBy: string;
  modifiedDateTime: Date;
  modifiedBy: string;
  isActive: boolean;
  isDeleted: boolean;
}


export class Page {
  // constructor(
  //   sortColumn: string,
  //   sortDirection: string,
  //   pageIndex: number,
  //   pageSize: number,
  //   searchText: string,
  //   totalCount: number
  //  ) {
  //   this.sortColumn = sortColumn;
  //   this.sortDirection = sortDirection;
  //   this.pageIndex = pageIndex;
  //   this.pageSize = pageSize;
  //   this.searchText = searchText;
  //   this.totalCount = totalCount;
  // }
  sortColumn: string;
  sortDirection: string;
  pageIndex: number;
  pageSize: number;
  searchText: string;
  totalCount: number;
}
