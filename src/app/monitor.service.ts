import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Trainee } from './models/trainee'; 

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  constructor() { }

  getData(): Observable<Trainee[]> {
    // This is a placeholder for your data fetching mechanism.
    // Replace it with your actual data service call
    const exampleData: Trainee[] = [
      { id: 1, name: 'John Doe', grade: 85, passed: true },
      { id: 2, name: 'Jane Roe', grade: 75, passed: true },
      { id: 3, name: 'Jim Boe', grade: 55, passed: false }
    ];
    return of(exampleData);
  }
}
