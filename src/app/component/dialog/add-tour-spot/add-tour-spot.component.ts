import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TouristSpot } from 'src/app/shared/model/tourist-spot.model';

@Component({
  selector: 'inactive-add-tour-spot',
  templateUrl: './add-tour-spot.component.html',
  styleUrls: ['./add-tour-spot.component.css']
})
export class AddTourSpotComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  autocomplete: google.maps.places.Autocomplete;
  autocompleteInput: FormControl = new FormControl();
  fileAttr = 'Choose File';
  base64Img = '/assets/icons/modern-planet.png';
  tripName = '';
  placeData: TouristSpot;
  constructor(public mapsAPILoader: MapsAPILoader){}

  ngOnInit(): void {
    this.mapsAPILoader.load().then(() => {
      this.autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete-input') as HTMLInputElement
      );
      this.autocomplete.addListener('place_changed', () => {
        // Evento para quando uma seleção é feita no campo de autocomplete
        const place: google.maps.places.PlaceResult = this.autocomplete.getPlace();
        if (place.geometry) {
          this.placeData = {
            locale: {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng()
            },
            nm: place.name,
            place_url: place.url,
            openingHour: ''
          }
          if (place.opening_hours && place.opening_hours.weekday_text) {
            this.placeData.openingHour = place.opening_hours.weekday_text.toString().replaceAll(/,/g, '<br>')
          }

        }
        console.log(place); // Aqui você pode processar os dados do lugar selecionado
      });
    });
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
}
