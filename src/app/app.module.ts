import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import { SignInComponent } from './component/sign-in/sign-in.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { TripComponent } from './component/trip/trip.component';
import { InitialPanelComponent } from './component/initial-panel/initial-panel.component';
import { MatCardModule } from '@angular/material/card';
import { DialogContent } from './component/dialog/dialog.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import { DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterButtonsComponent } from './component/router-buttons/router-buttons.component';
import { AddTrip } from './component/dialog/add-trip/add-trip.dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CitiesComponent } from './component/cities/cities.component';
import { MapComponent } from './component/cities/map/map.component';
import { AppRoutingModule } from './app-routing.module';
import { AddCityComponent } from './component/dialog/add-city/add-city.component';
import { AgmCoreModule } from '@agm/core';
import { AddTourSpotComponent } from './component/dialog/add-tour-spot/add-tour-spot.component';
import { AppDateFormatCustom, MY_DATE_FORMATS } from './app-date-format.custom';
import { AddTouristSpotComponent } from './component/cities/tourist-spot/add-tourist-spot/add-tourist-spot.component';
import { TouristSpotListComponent } from './component/cities/tourist-spot/tourist-spot-list/tourist-spot-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SignInComponent,
    TripComponent,
    InitialPanelComponent,
    DialogContent,
    RouterButtonsComponent,
    AddTrip,
    CitiesComponent,
    MapComponent,
    AddCityComponent,
    AddTourSpotComponent,
    AddTouristSpotComponent,
    TouristSpotListComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    RouterTestingModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatTableModule, 
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule,
    AgmCoreModule.forRoot({
      apiKey: environment.firebase.apiKey,
      libraries: ['places']
    }),
    AngularFireModule.initializeApp(environment.firebase),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: DateAdapter, useClass: AppDateFormatCustom },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
