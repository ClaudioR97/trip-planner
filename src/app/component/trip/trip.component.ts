import { SharedVariables } from './../../shared/shared.variables';
import { CityService } from 'src/app/shared/services/city/city.service';
import { TripService } from './../../shared/services/trip/trip.service';
import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/shared/model/trip.model';
import { DialogUtils } from '../dialog/dialog.utils';
import { CitiesComponent } from '../cities/cities.component';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'trips-component',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {
  trips: any = [];

  constructor(public tripService: TripService,
    public dialog: DialogUtils,
    public cs: CityService,
    public sharedVariables: SharedVariables) { }

  ngOnInit() {
    this.sync();
  }

  addTrip() {
    this.dialog.openSimpleDlg({
      title: 'Adicionar viagem!',
      addTrip: true,
      data: this.trips
    });
  }

  countryClick(_trip: Trip) {
    const cityRef = new CitiesComponent(this.cs, this.dialog)
    cityRef.cities = [];
    const data: any = _trip;
    data.title = _trip.nm_trip;
    data.routeTrips = true;
    this.dialog.openSimpleDlg(data).finally(() => this.sync());
  }

  sync() {
    this.tripService.getAllDocs().then(data => {
      this.trips = data;
    });
  }
}
