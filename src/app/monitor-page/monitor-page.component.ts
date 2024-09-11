import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

interface Trainee {
  id: number;
  name: string;
  average: number;
  exams: number;
  passed: boolean;
}

@Component({
  selector: 'app-monitor-page',
  templateUrl: './monitor-page.component.html',
  styleUrls: ['./monitor-page.component.scss']
})
export class MonitorPageComponent implements OnInit {
  availableIds: number[] = [3567, 3987];
  selectedIds: number[] = [];
  filterName: string = '';
  showPassed: boolean = true;
  showFailed: boolean = true;

  displayedColumns: string[] = ['id', 'name', 'average', 'exams'];
  dataSource = new MatTableDataSource<Trainee>([
    { id: 3567, name: 'Johnny K', average: 83, exams: 6, passed: true },
    { id: 3987, name: 'Johny R', average: 35, exams: 3, passed: false },
  ]);

  filteredData = this.dataSource;

  ngOnInit() {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredData = new MatTableDataSource(
      this.dataSource.data.filter((trainee) => {
        const matchesId = this.selectedIds.length ? this.selectedIds.includes(trainee.id) : true;
        const matchesName = trainee.name.toLowerCase().includes(this.filterName.toLowerCase());
        const matchesState = (this.showPassed && trainee.passed) || (this.showFailed && !trainee.passed);

        return matchesId && matchesName && matchesState;
      })
    );
  }
}
