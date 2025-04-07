import { CitiesComponent } from './../../cities.component';
import { TouristSpot } from './../../../../shared/model/tourist-spot.model';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'tourist-spot-list',
  templateUrl: './tourist-spot-list.component.html',
  styleUrls: ['./tourist-spot-list.component.css']
})
export class TouristSpotListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['nm', 'viewed'];
  columns: any = {'nm': 'Local', 'viewed': 'Visto'};
  dataSource: MatTableDataSource<TouristSpot>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private cities: CitiesComponent) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.cities.markers);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  checkRecord(data: any) {
    debugger
  }

  deleteRecord(data: any) {
    this.cities.cityService.deleteTouristSpot(data.id).then(() => {
      this.cities.clickCity(this.cities.checkedCity);
    });
  }

  recordClick(record: any) {
    this.cities.googleCenter = record.position;
    this.cities.mapZoom = 16;
  }
}
