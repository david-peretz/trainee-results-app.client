import { Component, OnInit } from '@angular/core';
import { DataSourceService } from '../services/data-source.service'; // Import the service that provides the data
import { Chart, registerables } from 'chart.js'; // Import Chart.js and register chart components
Chart.register(...registerables); // Register all necessary components of Chart.js

// Define an interface for the data structure used in charts
interface Record {
  id: number;
  name: string;
  date: string;
  grade: number;
  subject: string;
}

@Component({
  selector: 'app-analysis-page', // The selector used to include this component in other templates
  templateUrl: './analysis-page.component.html', // Path to the HTML template
  styleUrls: ['./analysis-page.component.scss'] // Path to the SCSS styles
})
export class AnalysisPageComponent implements OnInit {
  // Arrays to store available IDs and subjects from the data
  availableIds: number[] = [];
  availableSubjects: string[] = [];
  // Arrays to store selected IDs and subjects for filtering charts
  selectedIds: number[] = [];
  selectedSubjects: string[] = [];

  // Chart data and labels for each chart
  chart1Data: { data: number[]; label: string }[] = [];
  chart1Labels: string[] = [];
  chart2Data: { data: number[]; label: string }[] = [];
  chart2Labels: string[] = [];
  chart3Data: { data: number[]; label: string }[] = [];
  chart3Labels: string[] = [];
  chartOptions = { responsive: true }; // Options to make charts responsive
  chartType: any = 'bar'; // Set the type of charts, e.g., 'bar', 'line'
  chartLegend: boolean | undefined; // Toggle chart legend visibility

  constructor(private dataSourceService: DataSourceService) {} // Inject the data service

  ngOnInit(): void {
    // Subscribe to the data stream from the service
    this.dataSourceService.records$.subscribe((data: Record[]) => {
      // Extract unique IDs and subjects for selection options
      this.availableIds = [...new Set(data.map(record => record.id))];
      this.availableSubjects = [...new Set(data.map(record => record.subject))];
      this.updateCharts(data); // Update the charts with the initial data
    });
  }

  // Handle changes in selected IDs
  onIdsChange(ids: number[]): void {
    this.selectedIds = ids; // Update the selected IDs
    this.updateCharts(this.dataSourceService.getData()); // Update charts with filtered data
  }

  // Handle changes in selected subjects
  onSubjectsChange(subjects: string[]): void {
    this.selectedSubjects = subjects; // Update the selected subjects
    this.updateCharts(this.dataSourceService.getData()); // Update charts with filtered data
  }

  // Update charts based on the selected data
  updateCharts(data: Record[]): void {
    // Update Chart 1 with grades over time for selected IDs
    this.chart1Labels = [...new Set(data.map(record => record.date))];
    this.chart1Data = this.selectedIds.map(id => {
      const studentData = data.filter(record => record.id === id);
      return { data: studentData.map(record => record.grade), label: `Student ID: ${id}` };
    });

    // Update Chart 2 with average grades for selected IDs
    this.chart2Labels = this.selectedIds.map(id => `ID: ${id}`);
    this.chart2Data = [{
      data: this.selectedIds.map(id => {
        const studentData = data.filter(record => record.id === id);
        const total = studentData.reduce((sum, record) => sum + record.grade, 0);
        return total / studentData.length;
      }),
      label: 'Average Grades'
    }];

    // Update Chart 3 with averages per selected subjects
    this.chart3Labels = this.selectedSubjects;
    this.chart3Data = [{
      data: this.selectedSubjects.map(subject => {
        const subjectData = data.filter(record => record.subject === subject);
        const total = subjectData.reduce((sum, record) => sum + record.grade, 0);
        return total / subjectData.length;
      }),
      label: 'Average per Subject'
    }];
  }
}
