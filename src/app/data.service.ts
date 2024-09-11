// Example model
export interface Trainee {
  id: number;
  name: string;
  grade: number;
  passed: boolean;
}

// Service function to return fake data
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  fakeData: Trainee[] = [
    { id: 1, name: 'John Doe', grade: 85, passed: true },
    { id: 2, name: 'Jane Doe', grade: 65, passed: true },
    { id: 3, name: 'Jim Beam', grade: 55, passed: false }
  ];

  getTrainees(): Observable<Trainee[]> {
    return of(this.fakeData);
  }
}
