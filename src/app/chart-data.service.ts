import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChartData } from './models/chart-data.model'; // Define this model based on your chart requirements

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  constructor() { }

  getChartData(): Observable<ChartData[]> {
    // This is a placeholder for your data fetching mechanism.
    // You should replace it with your actual data service call.
    // Here's a simple example data structure:
    const exampleChartData: ChartData[] = [
      { id: 1, label: 'Math', value: 75 },
      { id: 2, label: 'Science', value: 65 },
      { id: 3, label: 'History', value: 85 }
    ];
    return of(exampleChartData);
  }
}
