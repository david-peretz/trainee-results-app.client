import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Record } from '../models/record';

@Injectable({
  providedIn: 'root',
})
export class DataSourceService {
 
  private recordsSubject = new BehaviorSubject<Record[]>([]);
  records$ = this.recordsSubject.asObservable();

  constructor() {
    this.loadData();
  }

  loadData() {

    const initialRecords: Record[] = [
        { id: 1, name: 'Morgan', date: '2021-09-15', grade: 98, subject: 'Algebra', average: 92 },
        { id: 2, name: 'James', date: '2021-09-16', grade: 85, subject: 'Geometry', average: 85 },
        { id: 3, name: 'Sara', date: '2021-09-17', grade: 75, subject: 'Physics', average: 78 },
        { id: 4, name: 'Emma', date: '2021-09-18', grade: 90, subject: 'Chemistry', average: 90 },
        { id: 5, name: 'John', date: '2021-09-19', grade: 82, subject: 'Biology', average: 83 },
        { id: 6, name: 'Alice', date: '2021-09-20', grade: 95, subject: 'Calculus', average: 94 },
        { id: 7, name: 'Bob', date: '2021-09-21', grade: 78, subject: 'Art', average: 80 },
        { id: 8, name: 'Carol', date: '2021-09-22', grade: 88, subject: 'History', average: 87 },
        { id: 9, name: 'David', date: '2021-09-23', grade: 91, subject: 'Literature', average: 89 },
        { id: 10, name: 'Eve', date: '2021-09-24', grade: 87, subject: 'Music', average: 86 },
        { id: 11, name: 'Frank', date: '2021-09-25', grade: 84, subject: 'Drama', average: 82 },
        { id: 12, name: 'Grace', date: '2021-09-26', grade: 89, subject: 'Philosophy', average: 88 },
        { id: 13, name: 'Heidi', date: '2021-09-27', grade: 92, subject: 'Economics', average: 91 },
        { id: 14, name: 'Ivan', date: '2021-09-28', grade: 77, subject: 'Astronomy', average: 76 },
        { id: 15, name: 'Judy', date: '2021-09-29', grade: 80, subject: 'Engineering', average: 79 },
        { id: 16, name: 'Karl', date: '2021-09-30', grade: 93, subject: 'Statistics', average: 92 },
        { id: 17, name: 'Laura', date: '2021-10-01', grade: 76, subject: 'Programming', average: 78 },
        { id: 18, name: 'Michael', date: '2021-10-02', grade: 88, subject: 'Networking', average: 87 },
        { id: 19, name: 'Nia', date: '2021-10-03', grade: 83, subject: 'Security', average: 82 },
        { id: 20, name: 'Oscar', date: '2021-10-04', grade: 79, subject: 'Machine Learning', average: 78 }
      ];
      
    this.recordsSubject.next(initialRecords);
  }
  setData(updatedData: Record[]) {
    this.recordsSubject.next(updatedData);
  }

  getData(): Record[] {
    return this.recordsSubject.getValue();
  }
  addRecord(record: Record) {
    const currentRecords = this.recordsSubject.getValue();
    this.recordsSubject.next([...currentRecords, record]);
  }

  removeRecord(id: number) {
    const currentRecords = this.recordsSubject.getValue().filter(record => record.id !== id);
    this.recordsSubject.next(currentRecords);
  }

  filterRecords(filter: string) {
    // פונקציה לסינון רשומות לפי קריטריונים.
  }
}
