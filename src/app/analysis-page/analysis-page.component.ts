import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analysis-page',
  templateUrl: './analysis-page.component.html',
  styleUrls: ['./analysis-page.component.scss']
})
export class AnalysisPageComponent implements OnInit {
  availableIds = [1, 2, 3, 4, 5];  // Example IDs
  availableSubjects = ['Math', 'Science', 'History'];  // Example subjects
  selectedIds: number[] = [];
  selectedSubjects: string[] = [];

  constructor() {}

  ngOnInit(): void {}

  toggleCharts(): void {
    // Logic for swapping charts
    const chart1Element = document.getElementById('chart1');
    const chart2Element = document.getElementById('chart2');
    if (chart1Element && chart2Element) {
      const temp = chart1Element.innerHTML;
      chart1Element.innerHTML = chart2Element.innerHTML;
      chart2Element.innerHTML = temp;
    }
  }
}
