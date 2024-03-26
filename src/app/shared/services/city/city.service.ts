import { SharedVariables } from './../../shared.variables';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { City } from '../../model/city.model';
import { TouristSpot } from '../../model/tourist-spot.model';
import { timestamp } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  cityRef: AngularFirestoreCollection<City>;
  touristSpot: AngularFirestoreCollection<TouristSpot>;
  private citiesData:City[] = [];
  private touristSpotData: TouristSpot[] = [];
  private tripName: string;
  constructor(public db: AngularFirestore,
    public sharedVariables: SharedVariables) {
  }

  loadTripCities(_cityId: string = this.tripName) {
    this.cityRef = this.db.collection(`/trip/${_cityId}/city/`);
    this.tripName = _cityId;
    this.citiesData = [];
    return new Promise(async (resolve, reject) => {
      const cityCollection = await this.cityRef.get();
      await cityCollection.forEach(cityCol => {
        cityCol.docs.forEach(doc => {
          const data = doc.data();
          data.id = doc.id;
          this.citiesData.push(data);
        });
      });
      resolve(this.citiesData);
    });
  }

  getCities() {
    return this.citiesData;
  }

  addCity(cityData: City) {
    this.cityRef.add(cityData);
  }

  editCity(cityData: City) {
    this.cityRef.doc(cityData.id).update({
      base_img: cityData.base_img,
      nm_city: cityData.nm_city
    });
  }

  getTouristSpotCol(city: string) {
    return this.cityRef.doc(city).collection('/tourist_spot/');
  }
  
  addTouristSpot(city: string, touristSpotData: TouristSpot) {
    return this.getTouristSpotCol(city).add(touristSpotData);
  }
  
  getTouristSpots(city: string) {
    this.touristSpotData = [];
    return new Promise(async (resolve, reject) => {
      const tourismColl = await this.getTouristSpotCol(city).get();
      await tourismColl.forEach(tourismCol => {
        tourismCol.docs.forEach(doc => {
          const data: TouristSpot = doc.data();
          data.id = doc.id;
          this.touristSpotData.push(data);
        });
      });
      resolve(this.touristSpotData);
    })
  }

  deleteCity(cityData: City): void {
    this.cityRef.doc(cityData.id).ref.delete();
  }
}