import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MonitorService } from '../monitor.service';
  

@Component({
  selector: 'app-monitor-page',
  templateUrl: './monitor-page.component.html',
  styleUrls: ['./monitor-page.component.scss'],

})
export class MonitorPageComponent implements OnInit {
  dataSource: any;

  constructor(private monitorService: MonitorService) {}

  ngOnInit() {
    this.monitorService.getData().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
