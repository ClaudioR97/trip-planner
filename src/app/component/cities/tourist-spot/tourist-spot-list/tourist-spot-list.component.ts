import { CitiesComponent } from './../../cities.component';
import { TouristSpot } from './../../../../shared/model/tourist-spot.model';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'tourist-spot-list',
  templateUrl: './tourist-spot-list.component.html',
  styleUrls: ['./tourist-spot-list.component.css']
})
export class TouristSpotListComponent implements AfterViewInit {
  displayedColumns: string[] = ['nm', 'obs', 'viewed'];
  columns: any = {'nm': 'Local', 'obs': 'Observações', 'viewed': 'Visto'};
  dataSource: MatTableDataSource<TouristSpot>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private cities: CitiesComponent) { }

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource(this.cities.markers);
    this.dataSource.paginator = this.paginator;
  }

  checkRecord(data: any) {
    debugger
  }
}
