import { Injectable } from '@angular/core';
import { TableContentService } from './table-content.service';
import { BehaviorSubject } from 'rxjs';

export type TableTitles = 'country' | 'contact' | 'company' | 'name';

export interface TableContent {
  company: string;
  name: string;
  contact: string;
  country: string;
}

export enum SortOrder {
  none = 'none',
  asc = 'asc',
  desc = 'desc',
}

@Injectable({
  providedIn: 'root',
})
export class TableSortService {
  private _activeSortColumnSubject: BehaviorSubject<TableTitles> =
    new BehaviorSubject<TableTitles>('name');
  public _activeSortColumn = this._activeSortColumnSubject.asObservable();

  private sortOrderIndex = 0;
  private sortOrderValues = [SortOrder.none, SortOrder.asc, SortOrder.desc];
  private _sortOrderSubject: BehaviorSubject<SortOrder> =
    new BehaviorSubject<SortOrder>(this.sortOrderValues[this.sortOrderIndex]);
  public sortOrder = this._sortOrderSubject.asObservable();

  constructor(private tableContentService: TableContentService) {}

  private set activeSortColumn(value: TableTitles) {
    this._activeSortColumnSubject.next(value);
  }

  public sortData(
    content: TableContent[],
    initTableData: TableContent[],
    sortData: TableTitles,
    activeSortColumn: TableTitles,
    isEnabledChangeOrder = true
  ): void {
    if (activeSortColumn === sortData && isEnabledChangeOrder) {
      this.sortOrderIndex = ++this.sortOrderIndex % 3;
    } else {
      this.activeSortColumn = sortData;
    }

    if (this.sortOrderValues[this.sortOrderIndex] === SortOrder.asc) {
      content.sort((a, b) => a[sortData].localeCompare(b[sortData]));
    } else if (this.sortOrderValues[this.sortOrderIndex] === SortOrder.desc) {
      content.sort((a, b) => b[sortData].localeCompare(a[sortData]));
    } else {
      content.splice(
        0,
        content.length,
        ...this.tableContentService.initTableDataCopy(initTableData)
      );
    }

    this._sortOrderSubject.next(this.sortOrderValues[this.sortOrderIndex]);
  }
}
