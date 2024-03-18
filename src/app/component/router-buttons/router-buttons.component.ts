import { SharedVariables } from './../../shared/shared.variables';
import { CityService } from './../../shared/services/city/city.service';
import { Component, OnInit } from '@angular/core';
import { DialogContent } from '../dialog/dialog.component';
import { DialogUtils } from '../dialog/dialog.utils';

@Component({
  selector: 'router-buttons',
  templateUrl: './router-buttons.component.html',
  styleUrls: ['./router-buttons.component.css']
})
export class RouterButtonsComponent implements OnInit {
  constructor(public dlg: DialogContent,
    public dialog: DialogUtils, 
    public cityService: CityService, 
    private sharedVariables: SharedVariables) {}
  ngOnInit(): void {
    this.cityService.loadTripCities(this.dlg.data.id);
  }

  onClick() {
    this.dlg.dialog.closeAll();
    this.sharedVariables.setTripContaiVisible(false);
    this.sharedVariables.setCitiesContVisi(true);
  }

  editClick() {
    const data: any = this.dlg.data;
    data.title = data.nm_trip;
    data.addTrip = true;
    data.routeTrips = false;
    data.isEditing = true;
    this.dialog.dlgData = data;
  }
}
