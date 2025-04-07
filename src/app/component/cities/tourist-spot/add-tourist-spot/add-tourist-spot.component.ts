import { GoogleMapsService } from './../../../../shared/services/google-maps/google.maps.service';
import { TouristSpot } from './../../../../shared/model/tourist-spot.model';
import { Component, AfterContentInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CitiesComponent } from '../../cities.component';

@Component({
  selector: 'add-tourist-spot',
  templateUrl: './add-tourist-spot.component.html',
  styleUrls: ['./add-tourist-spot.component.css']
})
export class AddTouristSpotComponent implements AfterContentInit {
  autocomplete: google.maps.places.Autocomplete;
  // @ViewChild('autocomplete-input') autocompleteInput: FormControl = new FormControl();
  isAccommodation: boolean = false;
  observation: string;
  curTourSpotData: TouristSpot;

  autocompleteControl = new FormControl();
  @ViewChild('autocompleteInput', { static: false }) autocompleteInput: ElementRef<HTMLInputElement>;


  constructor(private cities: CitiesComponent, 
    private googleMapsService: GoogleMapsService, 
    private ngZone: NgZone) { }

  ngAfterContentInit(): void {
    this.googleMapsService.loadApi().then(() => {
      this.loadAutoComplete();
    });
  }

  onSaveClick() {
    this.curTourSpotData.viewed = false;
    this.curTourSpotData.is_accommodation = this.isAccommodation;
    this.curTourSpotData.obs = this.observation;
    this.cities.cityService.addTouristSpot(this.cities.checkedCity.id as string, this.curTourSpotData).then((data: any) => {
      this.curTourSpotData = {};
      this.isAccommodation = false;
      this.observation = '';
      const ele: any = document.getElementById('add-info');
      ele.innerHTML = '';
      this.autocompleteInput.nativeElement.value = '';
      this.cities.markers.push(data);
    });
  }

  loadAutoComplete() {
    const center = this.cities.googleCenter;
    const defaultBounds = {
      north: center.lat + 0.1,
      south: center.lat - 0.1,
      east: center.lng + 0.1,
      west: center.lng - 0.1
    };
    const options = {
      bounds: defaultBounds,
      fields: ['ALL'],
      strictBounds: false
    };
    const input = document.getElementById('autocomplete-input') as HTMLInputElement;
    const _autocomplete = new google.maps.places.Autocomplete(input, options);
    this.autocomplete = _autocomplete;

    this.autocomplete.addListener('place_changed', () => {
      const place: any = this.autocomplete.getPlace();
      if (place.geometry) {
        const markerData = {
          locale: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          },
          nm: place.name,
          place_url: place.url,
          openingHour: '',
          website: ''
        }
        if (place.opening_hours && place.opening_hours.weekday_text) {
          markerData.openingHour = place.opening_hours.weekday_text.toString().replaceAll(/,/g, '<br>')
          const ele: any = document.getElementById('add-info');
          ele.innerHTML = '<b>Horário de funcionamento</b><br>' +
            markerData.openingHour +
            '<br><b>Endereço</b><br>' +
            place.adr_address;
        }
        if (place.website) {
          markerData.website = place.website;
        }
        this.cities.tourSpotData = markerData;
        this.curTourSpotData = markerData;
      }
    });
  }
}
