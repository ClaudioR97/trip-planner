import { ElementRef, ViewChild, Component, OnInit, AfterContentInit } from '@angular/core';
import { DialogUtils } from '../dialog.utils';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { Trip } from '../../../shared/model/trip.model';
import { TripService } from '../../../shared/services/trip/trip.service';

@Component({
  selector: 'add-trip',
  templateUrl: './add-trip.dialog.html',
  styleUrls: ['./add-trip.dialog.css']
})
export class AddTrip implements OnInit, AfterContentInit {
  range: FormGroup;
  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr: string = 'Choose File';
  base64Img: string = '/assets/icons/modern-planet.png';
  tripData: FormGroup;

  constructor(
    public dialog: DialogUtils,
    private fb: FormBuilder,
    public tripService: TripService
  ) {
    this.range = this.fb.group({
      start: [''],
      end: ['']
    });
    this.tripData = this.fb.group({
      obs: [''],
      tripName: [''],
      sheet_url: ['']
    });
  }

  ngAfterContentInit(): void {
    const dlgData = this.dialog.dlgData;
    if (dlgData.isEditing) {
      this.base64Img = dlgData.base_img;
      //this.tripName = dlgData.nm_trip;
      //this.obs = dlgData.obs;
      //this.sheet_url = dlgData.sheet_url;
      this.range.setValue({
        start: this.getDate(dlgData.dt_start),
        end: this.getDate(dlgData.dt_end),
      });
      this.tripData.setValue({
        obs: dlgData.obs,
        tripName: dlgData.nm_trip,
        sheet_url: dlgData.sheet_url || ''
      })
    }
  }
  
  ngOnInit(): void {
    
  }

  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.fileAttr += file.name + ' - ';
      });

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.base64Img = e.target.result;
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = '';
    } else {
      this.fileAttr = 'Choose File';
    }
  }

  resetImage() {
    this.base64Img = '/assets/icons/modern-planet.png';
    this.fileAttr = 'Choose File';
  }

  saveTrip() {
    const _tripData = this.tripData.value;
    const newTrip: Trip = {
      nm_trip: _tripData.tripName,
      obs: _tripData.obs,
      sheet_url: _tripData.sheet_url,
      is_public: true,
      dt_start: this.range.value.start,
      dt_end: this.range.value.end,
      base_img: this.base64Img
    };

    if (this.dialog.dlgData.data.isEditing) {
      newTrip.id = this.dialog.dlgData.data.id;
      this.tripService.updateTrip(newTrip);
    } else {
      this.tripService.addTrip(newTrip).then((doc:any) => {
        newTrip.id = doc.id;
        this.dialog.dlgData.data.push(newTrip);
      });
    }

    this.dialog.closeDialog();
  }

  deleteTrip() {
    const dlgData = this.dialog.dlgData;
    this.tripService.deleteTrip(dlgData.id).then(() => {
      this.dialog.closeDialog();      
    });
  }

  getDate(_date: any) {
    return moment(_date, 'DD/MM/YYYY').toDate();
  }

}
