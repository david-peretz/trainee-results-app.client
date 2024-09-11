import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DataSourceService } from '../services/data-source.service';

export interface Record {
  id: number;
  name: string;
  date: string;
  grade: number;
  subject: string;
  average:number
}

@Component({
  selector: 'app-data-page',
  templateUrl: './data-page.component.html',
  styleUrls: ['./data-page.component.scss']
})
export class DataPageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'date', 'grade', 'subject', 'details'];
  dataSource = new MatTableDataSource<Record>();
  selectedRecord: Record | null = null;
  filterId: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dataSourceService: DataSourceService) {}

  ngOnInit() {
    this.dataSourceService.records$.subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.applyFilter();
  }

  selectRecord(record: Record) {
    this.selectedRecord = record;
  }

  applyFilter() {
    const filterValue = this.filterId.trim().toLowerCase();
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addData(): void {
    const newRecord: Record = {
      id: this.dataSource.data.length + 1,
      name: 'New Name',
      date: new Date().toISOString().slice(0, 10),
      grade: 100,
      subject: 'New Subject',
      average:90
      
    };
    const updatedData = [...this.dataSourceService.getData(), newRecord];
    this.dataSourceService.setData(updatedData);
    this.applyFilter();
  }

  removeData(): void {
    if (this.selectedRecord) {
      const updatedData = this.dataSourceService.getData().filter(item => item.id !== this.selectedRecord!.id);
      this.dataSourceService.setData(updatedData);
      this.selectedRecord = null;
      this.applyFilter();
    }
  }

  getPaginatorData() {
    const pageIndex = this.paginator?.pageIndex || 0;
    const pageSize = this.paginator?.pageSize || 1;
    const length = this.paginator?.length || 0;

    const start = pageIndex * pageSize + 1;
    const end = Math.min((pageIndex + 1) * pageSize, length);

    return { start, end, length };
  }
}
