import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface Record {
  id: number;
  name: string;
  date: string;
  grade: number;
  subject: string;
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

  constructor() {}

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.applyFilter(); // Apply any existing filter when initializing
  }

  loadData() {
    const records: Record[] = [
      { id: 1, name: 'Morgan', date: '2021-09-15', grade: 98, subject: 'Algebra' },
      { id: 2, name: 'James', date: '2021-09-16', grade: 85, subject: 'Geometry' },
      { id: 3, name: 'Sara', date: '2021-09-17', grade: 75, subject: 'Physics' },
      { id: 4, name: 'Emma', date: '2021-09-18', grade: 90, subject: 'Chemistry' },
      { id: 5, name: 'John', date: '2021-09-19', grade: 82, subject: 'Biology' },
      { id: 6, name: 'Alice', date: '2021-09-20', grade: 95, subject: 'Calculus' },
      { id: 7, name: 'Bob', date: '2021-09-21', grade: 78, subject: 'Art' },
      { id: 8, name: 'Carol', date: '2021-09-22', grade: 88, subject: 'History' },
      { id: 9, name: 'David', date: '2021-09-23', grade: 91, subject: 'Literature' },
      { id: 10, name: 'Eve', date: '2021-09-24', grade: 87, subject: 'Music' },
      { id: 11, name: 'Frank', date: '2021-09-25', grade: 84, subject: 'Drama' },
      { id: 12, name: 'Grace', date: '2021-09-26', grade: 89, subject: 'Philosophy' },
      { id: 13, name: 'Heidi', date: '2021-09-27', grade: 92, subject: 'Economics' },
      { id: 14, name: 'Ivan', date: '2021-09-28', grade: 77, subject: 'Astronomy' },
      { id: 15, name: 'Judy', date: '2021-09-29', grade: 80, subject: 'Engineering' },
      { id: 16, name: 'Karl', date: '2021-09-30', grade: 93, subject: 'Statistics' },
      { id: 17, name: 'Laura', date: '2021-10-01', grade: 76, subject: 'Programming' },
      { id: 18, name: 'Michael', date: '2021-10-02', grade: 88, subject: 'Networking' },
      { id: 19, name: 'Nia', date: '2021-10-03', grade: 83, subject: 'Security' },
      { id: 20, name: 'Oscar', date: '2021-10-04', grade: 79, subject: 'Machine Learning' }
    ];
    this.dataSource.data = records;
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
      subject: 'New Subject'
    };
    this.dataSource.data = [...this.dataSource.data, newRecord];
    this.applyFilter(); // Reapply filter after adding data
  }

  removeData(): void {
    if (this.selectedRecord) {
      this.dataSource.data = this.dataSource.data.filter(item => item.id !== this.selectedRecord!.id);
      this.selectedRecord = null;
      this.applyFilter(); // Reapply filter after removing data
    }
  }

  previousPage() {
    if (this.paginator && this.paginator.hasPreviousPage()) {
      this.paginator.previousPage();
    }
  }

  nextPage() {
    if (this.paginator && this.paginator.hasNextPage()) {
      this.paginator.nextPage();
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
