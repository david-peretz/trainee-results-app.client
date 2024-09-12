import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core'; // Import Angular core and lifecycle hooks
import { MatTableDataSource } from '@angular/material/table'; // Import Angular Material table module
import { MatPaginator } from '@angular/material/paginator'; // Import Angular Material paginator module
import { DataSourceService } from '../services/data-source.service'; // Import shared data service

// Define the structure of each record in the data table
export interface Record {
  id: number;
  name: string;
  date: string;
  grade: number;
  subject: string;
  average: number; // Additional property for average grade
}

@Component({
  selector: 'app-data-page', // Selector for using this component in HTML
  templateUrl: './data-page.component.html', // Path to the HTML template file
  styleUrls: ['./data-page.component.scss'] // Path to the CSS file
})
export class DataPageComponent implements OnInit, AfterViewInit {
  // Define columns to be displayed in the table
  displayedColumns: string[] = ['id', 'name', 'date', 'grade', 'subject', 'details'];
  dataSource = new MatTableDataSource<Record>(); // Data source for the table, using Material's data table system
  selectedRecord: Record | null = null; // Holds the currently selected record from the table
  filterId: string = ''; // Holds the filter input value

  @ViewChild(MatPaginator) paginator!: MatPaginator; // References the paginator to control table pagination

  // Injects the data service into the component for shared data access
  constructor(private dataSourceService: DataSourceService) {}

  // Lifecycle hook that runs on component initialization
  ngOnInit() {
    // Subscribes to the observable of records from the data service to update the table data
    this.dataSourceService.records$.subscribe((data) => {
      this.dataSource.data = data; // Assigns the received data to the dataSource
    });
  }

  // Lifecycle hook that runs after the component's view has been initialized
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; // Assigns the paginator to the table
    this.applyFilter(); // Applies any existing filters when initializing the view
  }

  // Updates the selectedRecord when a user clicks on a row in the table
  selectRecord(record: Record) {
    this.selectedRecord = record;
  }

  // Applies the filter value to the dataSource, filtering table rows based on the user's input
  applyFilter() {
    const filterValue = this.filterId.trim().toLowerCase(); // Prepares the filter value
    this.dataSource.filter = filterValue; // Sets the filter value for the data source

    // Resets to the first page if a filter is applied and paginator exists
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Adds a new record to the data source
  addData(): void {
    const newRecord: Record = {
      id: this.dataSource.data.length + 1, // Sets a new ID based on current data length
      name: 'New Name', // Example default name
      date: new Date().toISOString().slice(0, 10), // Sets the current date in YYYY-MM-DD format
      grade: 100, // Default grade value
      subject: 'New Subject', // Default subject value
      average: 90 // Default average grade value
    };
    // Updates the data in the data service with the new record
    const updatedData = [...this.dataSourceService.getData(), newRecord];
    this.dataSourceService.setData(updatedData); // Sends the updated data back to the service
    this.applyFilter(); // Reapplies any existing filter
  }

  // Removes the currently selected record from the data source
  removeData(): void {
    if (this.selectedRecord) {
      // Filters out the selected record from the current data
      const updatedData = this.dataSourceService.getData().filter(item => item.id !== this.selectedRecord!.id);
      this.dataSourceService.setData(updatedData); // Updates the data in the data service
      this.selectedRecord = null; // Clears the selected record
      this.applyFilter(); // Reapplies any existing filter
    }
  }

  // Computes pagination data for display in the footer
  getPaginatorData() {
    const pageIndex = this.paginator?.pageIndex || 0; // Current page index, defaulting to 0 if undefined
    const pageSize = this.paginator?.pageSize || 1; // Number of items per page, defaulting to 1 if undefined
    const length = this.paginator?.length || 0; // Total number of items, defaulting to 0 if undefined

    // Calculates the start and end item indices for the current page
    const start = pageIndex * pageSize + 1;
    const end = Math.min((pageIndex + 1) * pageSize, length);

    return { start, end, length }; // Returns pagination details for display
  }
}
