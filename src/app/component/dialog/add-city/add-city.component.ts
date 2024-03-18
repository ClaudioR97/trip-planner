import { City } from './../../../shared/model/city.model';
import { CityService } from './../../../shared/services/city/city.service';
import { DialogUtils } from '../dialog.utils';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {

  constructor(
    public dialog: DialogUtils,
    private dateAdapter: DateAdapter<Date>,
    private cityService: CityService) {
    this.dateAdapter.setLocale('en-GB')
  }

  @ViewChild('fileInput') fileInput: ElementRef;
  fileAttr = 'Choose File';
  base64Img = '/assets/icons/modern-planet.png';
  cityName = '';
  dt_city: Date;
  cityData: City;

  ngOnInit(): void {
    this.cityData = this.dialog.dlgData;
    this.cityName = this.dialog.dlgData.nm_city;
    this.base64Img = this.dialog.dlgData.base_img || this.base64Img;
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

  onSaveClick() {
    const cityData: City = {
      base_img: this.base64Img,
      nm_city: this.cityName
    };
    if (this.cityData.id) {
      cityData.id = this.cityData.id;
      this.cityService.editCity(cityData);
    } else {
      this.cityService.addCity(cityData);
    }
    
    this.dialog.closeDialog();
  }

  onChange(event: any) {
    this.cityName = event.target.value;
  }

  addEvent(a: any, event: any) {
    this.dt_city = event.value;
  }

  deletePlace() {
    if (this.cityData.id) {
      this.cityService.deleteCity(this.cityData);
    }
    this.dialog.closeDialog();
  }

}
