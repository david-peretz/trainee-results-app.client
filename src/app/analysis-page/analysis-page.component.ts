import { Component, OnInit } from '@angular/core';
import { ChartDataService } from '../chart-data.service';

@Component({
  selector: 'app-analysis-page',
  templateUrl: './analysis-page.component.html',
  styleUrls: ['./analysis-page.component.scss']
})
export class AnalysisPageComponent implements OnInit {
  chartData: any;

  constructor(private chartDataService: ChartDataService) {}

  ngOnInit() {
    this.chartData = this.chartDataService.getChartData();
  }
}
