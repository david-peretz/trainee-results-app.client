import { Component, OnInit } from '@angular/core';
import { DataSourceService } from '../services/data-source.service'; // Import the data service for managing shared data
import { Chart, registerables } from 'chart.js'; // Import Chart.js for creating charts
Chart.register(...registerables); // Register all components of Chart.js

// Define the structure of each record in the data table
interface Record {
  id: number;
  name: string;
  date: string;
  grade: number;
  subject: string;
}

@Component({
  selector: 'app-analysis-page', // Selector for using this component in HTML
  templateUrl: './analysis-page.component.html', // Path to the HTML template file
  styleUrls: ['./analysis-page.component.scss'] // Path to the CSS file
})
export class AnalysisPageComponent implements OnInit {
  // Arrays to hold available and selected IDs and subjects
  availableIds: number[] = [];
  availableSubjects: string[] = [];
  selectedIds: number[] = [];
  selectedSubjects: string[] = [];
  
  // Chart data and configuration properties
  chart1Data: { data: number[]; label: string }[] = [];
  chart1Labels: string[] = [];
  chart2Data: { data: number[]; label: string }[] = [];
  chart2Labels: string[] = [];
  chart3Data: { data: number[]; label: string }[] = [];
  chart3Labels: string[] = [];
  chartOptions = { responsive: true }; // Options to make charts responsive
  chartType: any = 'bar'; // Type of chart to render, such as 'bar', 'line', etc.
  chartLegend: boolean | undefined; // Determines if the legend should be displayed

  // Inject the data source service
  constructor(private dataSourceService: DataSourceService) {}

  // Lifecycle hook that runs on component initialization
  ngOnInit(): void {
    // Subscribe to the data from the data service and update chart data
    this.dataSourceService.records$.subscribe((data: Record[]) => {
      // Populate available IDs and subjects from the data
      this.availableIds = [...new Set(data.map(record => record.id))];
      this.availableSubjects = [...new Set(data.map(record => record.subject))];
      this.updateCharts(data); // Update charts with the received data
    });
  }

  // Function to update chart data based on the current selections
  updateCharts(data: Record[]): void {
    // Set chart labels to unique dates from the data
    this.chart1Labels = [...new Set(data.map(record => record.date))];
    // Populate chart1 data with grades over time for selected student IDs
    this.chart1Data = this.selectedIds.map(id => {
      const studentData = data.filter(record => record.id === id);
      return { data: studentData.map(record => record.grade), label: `Student ID: ${id}` };
    });

    // Set chart2 labels and data based on average grades for selected student IDs
    this.chart2Labels = this.selectedIds.map(id => `ID: ${id}`);
    this.chart2Data = [{
      data: this.selectedIds.map(id => {
        const studentData = data.filter(record => record.id === id);
        const total = studentData.reduce((sum, record) => sum + record.grade, 0);
        return total / studentData.length; // Calculate average
      }),
      label: 'Average Grades'
    }];

    // Set chart3 labels and data based on average grades for selected subjects
    this.chart3Labels = this.selectedSubjects;
    this.chart3Data = [{
      data: this.selectedSubjects.map(subject => {
        const subjectData = data.filter(record => record.subject === subject);
        const total = subjectData.reduce((sum, record) => sum + record.grade, 0);
        return total / subjectData.length; // Calculate average
      }),
      label: 'Average per Subject'
    }];
  }

  // Handler for the drag start event, sets data for dragging
  onDragStart(event: DragEvent): void {
    event.dataTransfer?.setData('text/plain', 'chart');
  }

  // Handler for the drop event, prevents default and toggles chart positions
  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.toggleCharts();
  }

  // Swaps the content of two charts when called
  toggleCharts(): void {
    const chart1Element = document.getElementById('chart1');
    const chart2Element = document.getElementById('chart2');
    if (chart1Element && chart2Element) {
      const temp = chart1Element.innerHTML;
      chart1Element.innerHTML = chart2Element.innerHTML;
      chart2Element.innerHTML = temp;
    }
  }
}
