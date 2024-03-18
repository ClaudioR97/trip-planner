import { MapsAPILoader } from '@agm/core';
import { Component, AfterContentInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CitiesComponent } from '../../cities.component';

@Component({
  selector: 'add-tourist-spot',
  templateUrl: './add-tourist-spot.component.html',
  styleUrls: ['./add-tourist-spot.component.css']
})
export class AddTouristSpotComponent implements AfterContentInit {
  autocomplete: google.maps.places.Autocomplete;
  autocompleteInput: FormControl = new FormControl();
  isAccommodation: boolean = false;
  observation: string;

  constructor(public mapsAPILoader: MapsAPILoader, private cities: CitiesComponent) { }

  ngAfterContentInit(): void {
    this.loadAutoComplete();
  }

  onSaveClick() {
    //this.markers.push(this.tourSpotData as any);
  }

  loadAutoComplete() {
    this.mapsAPILoader.load().then(() => {
      setTimeout(() => {
        this.autocomplete = new google.maps.places.Autocomplete(
          document.getElementById('autocomplete-input') as HTMLInputElement
        );
        this.autocomplete.addListener('place_changed', () => {
          // Evento para quando uma seleção é feita no campo de autocomplete
          const place: google.maps.places.PlaceResult = this.autocomplete.getPlace();
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
              //this.address = place.adr_address as unknown as HTMLElement;
            }
            if (place.website) {
              markerData.website = place.website;
            }
            this.cities.tourSpotData = markerData;
          }
          console.log(place); // Aqui você pode processar os dados do lugar selecionado
        });
      }, 1000);
    });
  }
}
