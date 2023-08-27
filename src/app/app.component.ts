import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TableContentService } from './services/table-content.service';
import {
  TableSortService,
  TableTitles,
  TableContent,
  SortOrder,
} from './services/table-sort.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  private initTableData!: TableContent[];
  public activeSortColumn!: TableTitles;
  public searchData = '';
  public content!: TableContent[];
  public currentPage = 1;
  public pageAmount!: number;
  public predications: string[] = [];
  public sortOrder!: SortOrder;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private tableContentService: TableContentService,
    private tableSortService: TableSortService
  ) {}

  ngOnInit(): void {
    this.tableSortService._activeSortColumn
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.activeSortColumn = value));
    this.tableSortService.sortOrder
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.sortOrder = value));

    this.getTableContent();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private getTableContent(
    searchData?: string,
    page?: number,
    pageItemsAmount?: number
  ): void {
    const { data, pageAmount } = this.tableContentService.getTableData({
      searchData,
      page,
      pageItemsAmount,
    });

    this.initTableData = data;
    this.pageAmount = pageAmount;
    this.content = this.tableContentService.initTableDataCopy(
      this.initTableData
    );
  }

  public filterTable(): void {
    this.getTableContent(this.searchData);
    this.sortData(this.activeSortColumn, false);
    this.currentPage = 1;
  }

  public sortData(sortData: TableTitles, isEnabledChangeOrder = true): void {
    this.tableSortService.sortData(
      this.content,
      this.initTableData,
      sortData,
      this.activeSortColumn,
      isEnabledChangeOrder
    );
  }

  public getPage(page: number) {
    this.currentPage = page;
    this.getTableContent(this.searchData, this.currentPage);
    this.sortData(this.activeSortColumn, false);
  }

  public getPrediction() {
    this.predications = this.tableContentService.getPredication(
      this.searchData
    );
  }
}
