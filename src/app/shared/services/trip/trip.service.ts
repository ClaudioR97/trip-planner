import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { Trip } from '../../model/trip.model';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private dbPath: string = '/trip/';
  private tripId: string = '';
  private nmTrip: string = '';
  private isPublicTrip: boolean = false;
  private base64img: string = '';

  tripRef: AngularFirestoreCollection<Trip>;

  constructor(
    public db: AngularFirestore
  ) {
    this.tripRef = db.collection(this.dbPath);
  }

  getTripRef(): AngularFirestoreCollection<Trip> {
    return this.tripRef;
  }

  getAllDocs() {
    const datas:any = [];
    return new Promise(async (resolve, reject) => {
      const tripCollection = await this.tripRef.get();
      tripCollection.forEach(tripCol => {
        tripCol.docs.forEach(doc => {
          const data = doc.data();
          data.id = doc.id;
          datas.push(data);
        });
      });
      resolve(datas);
    });
  }

  addTrip(trip: Trip) {
    return this.tripRef.add(trip);
  }

  updateTrip(trip: Trip) {
    return this.tripRef.doc(trip.id).update(trip);
  }

  deleteTrip(tripId: string) {
    return this.tripRef.doc(tripId).ref.delete();
  }

  setTripId(_tripId: string): void {
    this.tripId = _tripId;
  }

  getTripId(): string {
    return this.tripId;
  }

  setNmTrip(_nmTrip: string): void {
    this.nmTrip = _nmTrip;
  }

  getNmTrip(): string {
    return this.nmTrip;
  }

  setPubTrip(_isPublicTrip: boolean): void {
    this.isPublicTrip = _isPublicTrip;
  }

  isPublic(): boolean {
    return this.isPublicTrip;
  }
}
