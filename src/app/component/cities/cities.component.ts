import { TouristSpotListComponent } from './tourist-spot/tourist-spot-list/tourist-spot-list.component';
import { DARK_MODE_MAP, DAY_MODE_MAP, NEW_DARK_MODE } from './../../shared/shared.consts';
import { City } from './../../shared/model/city.model';
import { Component, OnInit, OnDestroy, destroyPlatform, ViewChild, AfterContentInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CityService } from 'src/app/shared/services/city/city.service';
import { DialogUtils } from '../dialog/dialog.utils';
import { TouristSpot } from 'src/app/shared/model/tourist-spot.model';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit, AfterContentInit {
  [x: string]: any;
  public cities: City[] = [];
  toggleView: any = { viewList: false, viewAdd: false };
  destroy: any;
  @ViewChild('map') map: GoogleMap;
  @ViewChild('fileInput') fileInput: ElementRef;

  public checkedCity: string = '';
  markerIconUrl: string = '../../../assets/icons/mochila.png';
  openingHour: any;
  address: HTMLElement;
  tourSpotData: TouristSpot;
  tourSpotDataList: TouristSpot[] = [];
  markers: any[] = [];
  infoWindow: google.maps.InfoWindow;
  titleCity: any = 'Cidades';
  isAddDisabled: boolean;
  mapZoom: number = 18;
  @ViewChild('toggleGroup') toggleGroup: MatButtonToggleGroup;
  @ViewChild(TouristSpotListComponent) touristSpotListComp: TouristSpotListComponent;

  // Determine the current time
  currentTime: Date = new Date();

  // Determine if it's currently day or night
  isDayTime: boolean = this.currentTime.getHours() > 6 && this.currentTime.getHours() < 18;

  // Bind the selected map style dynamically based on the time
  selectedMapStyle: any;

  googleCenter: google.maps.LatLngLiteral;
  currentLocation: any;
  options: google.maps.MapOptions = {
    styles: DARK_MODE_MAP as google.maps.MapTypeStyle[]
  };

  constructor(
    public cityService: CityService,
    public dialog: DialogUtils) {
    this.destroy = destroyPlatform;
  }

  ngAfterContentInit(): void {
    this.isAddDisabled = true;
    this.cities = this.cityService.getCities();
    this.getCurrentLocation();
    
    this.options.styles = (this.isDayTime ? DAY_MODE_MAP : DARK_MODE_MAP) as google.maps.MapTypeStyle[];
  }

  ngOnInit(): void {

  }

  onMapReady(map: any) {
    this.centerLiveLocation();
    map.setOptions({ fullscreenControl: true });
  }

  editCity(_city: City) {
    const data: any = _city;
    data.title = _city.nm_city;
    data.addCity = true;
    this.dialog.openSimpleDlg(data).then(() => this.sync());
  }

  addCity() {
    const data: any = {};
    data.title = 'Add city';
    data.addCity = true;
    this.dialog.openSimpleDlg(data).then(() => this.sync());
  }

  addTouristSpot() {
    const data: any = {};
    data.title = 'Add place';
    data.addTouSpot = true;
    this.dialog.openSimpleDlg(data).then(() => this.sync());

  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      setInterval(() => {

        new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition((pos) => {
            if (!this.googleCenter) {
              this.googleCenter = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
              }
            }

            this.currentLocation = {
              position: {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
              },
              optimized: true,
              options: {
                animation: google.maps.Animation.BOUNCE,
              }
            }
            resolve(pos);
          });
        });
      }, 500);
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  toggleButtonChange(item: string) {
    switch (item) {
      case 'lista':
        this.toggleView.viewList = true;
        this.toggleView.viewAdd = false;
        break;
      case 'add':
        this.toggleView.viewList = false;
        this.toggleView.viewAdd = true;
        break;

      default:
        this.toggleView.viewList = false;
        this.toggleView.viewAdd = false;
        break;
    }
  }

  clickCity(city: City) {
    this.titleCity = city.nm_city;
    this.checkedCity = city.id || '';
    this.markers = [];
    this.isAddDisabled = false;
    this.cityService.getTouristSpots(city.id as string).then((data: any) => {
      data.forEach((mark: any) => {
        const _mark = {
          position: {
            lat: mark.locale.lat,
            lng: mark.locale.lng
          },
          optimized: true,
          options: {
            animation: google.maps.Animation.BOUNCE,
          },
          obs: mark.obs,
          content: mark.openingHour,
          place_url: mark.place_url,
          viewed: mark.viewed,
          website: mark.website,
          nm: mark.nm,
          is_accommodation: mark.is_accommodation
        };
        this.markers.push(_mark);
      });

      const isThereAccom: any[] = this.markers.filter((data) => data.is_accommodation === true);

      if (isThereAccom.length === 0) {
        this.setAvgCoord(data);
      } else {
        this.mapZoom = 15;
      }

      if (this.touristSpotListComp) {
        this.touristSpotListComp.ngAfterViewInit();
      }
    });
  }

  sync(resetTButton: boolean = true) {
    this.titleCity = 'Cidades';
    this.checkedCity = '';
    this.markers = [];
    this.tourSpotDataList = [];
    this.isAddDisabled = true;
    this.toggleButtonChange('');
    this.cityService.loadTripCities().then(() => {
      this.cities = this.cityService.getCities();
      this.centerLiveLocation();
    });

    if (resetTButton) {
      this.toggleGroup.value = 'map';
      this.toggleButtonChange('');
    }
  }

  centerLiveLocation() {
    new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.googleCenter = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };
        this.mapZoom = 18;
        resolve(pos);
      });
    });
  }

  setMarkers() {
    this.infoWindow = new google.maps.InfoWindow();
    this.tourSpotDataList.forEach(tourSport => {
      //const newMarker = new google.maps.Marker(this.getMarkerOptions(this.tripMap, location, customIcon))
      // this.markers.push(newMarker);
      //newMarker.addListener('click', ((event:any) => {
      //this.infoWindow.setContent(this.generateContent(data[key], isLondon));
      // this.infoWindow.open(this.map, newMarker);
      //}));
    });
  }

  getCustonIcon(data: any): string {
    let icon = '';

    if (data.is_accommodation) {
      this.googleCenter = data.position;
      icon = '../../../assets/icons/hotel.png';
    } else if (data.viewed) {
      icon = '../../../assets/icons/blue-marker.png';
    }

    return icon;
  }

  markerClick(event: any, marker: any) {
    debugger;
  }

  setAvgCoord(data: any[]) {
    const coordinates = data.map(({ locale }) => locale);
    const sumLng = coordinates.reduce((acc, coord) => acc + coord.lng, 0);
    const sumLat = coordinates.reduce((acc, coord) => acc + coord.lat, 0);
    const avgLng = sumLng / coordinates.length;
    const avgLat = sumLat / coordinates.length;

    this.googleCenter = {
      lat: avgLat,
      lng: avgLng
    };
    this.mapZoom = 13;
  }
}
