import { Component, OnInit } from '@angular/core';
import { DataSourceService } from '../services/data-source.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

interface Record {
  id: number;
  name: string;
  date: string;
  grade: number;
  subject: string;
}

@Component({
  selector: 'app-analysis-page',
  templateUrl: './analysis-page.component.html',
  styleUrls: ['./analysis-page.component.scss']
})
export class AnalysisPageComponent implements OnInit {
  availableIds: number[] = [];
  availableSubjects: string[] = [];
  selectedIds: number[] = [];
  selectedSubjects: string[] = [];
  
  chart1Data: { data: number[]; label: string }[] = [];
  chart1Labels: string[] = [];
  chart2Data: { data: number[]; label: string }[] = [];
  chart2Labels: string[] = [];
  chart3Data: { data: number[]; label: string }[] = [];
  chart3Labels: string[] = [];
  chartOptions = { responsive: true };
  chartType:any = 'bar'; // Make sure your HTML uses a compatible chart type binding
chartLegend: boolean|undefined;

  constructor(private dataSourceService: DataSourceService) {}

  ngOnInit(): void {
    this.dataSourceService.records$.subscribe((data: Record[]) => {
      this.availableIds = [...new Set(data.map(record => record.id))];
      this.availableSubjects = [...new Set(data.map(record => record.subject))];
      this.updateCharts(data);
    });
  }

  updateCharts(data: Record[]): void {
    this.chart1Labels = [...new Set(data.map(record => record.date))];
    this.chart1Data = this.selectedIds.map(id => {
      const studentData = data.filter(record => record.id === id);
      return { data: studentData.map(record => record.grade), label: `Student ID: ${id}` };
    });

    this.chart2Labels = this.selectedIds.map(id => `ID: ${id}`);
    this.chart2Data = [{
      data: this.selectedIds.map(id => {
        const studentData = data.filter(record => record.id === id);
        const total = studentData.reduce((sum, record) => sum + record.grade, 0);
        return total / studentData.length;
      }),
      label: 'Average Grades'
    }];

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

  onDragStart(event: DragEvent): void {
    event.dataTransfer?.setData('text/plain', 'chart');
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.toggleCharts();
  }

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
