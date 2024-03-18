/*import { ChecklistComponent } from './components/checklist/checklist.component';
import { LoginComponent } from './components/login/login.component';
import { InitialPanelComponent } from './components/initial-panel/initial-panel.component';
import { TripsComponent } from './components/trips/trips.component';*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitiesComponent } from './component/cities/cities.component';
import { AppComponent } from './app.component';
//import { BackofficeComponent } from './components/backoffice/backoffice.component';

const routes: Routes = [
  {
    path: '',
    children: [
      
    ]
  },
  {         path: 'cities',         component: CitiesComponent       }
  /*,  {
    path: '',
    component: InitialPanelComponent
  }, {
    path: 'trips',
    component: TripsComponent
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'backoffice',
    component: BackofficeComponent
  }, {
    path: 'checklist',
    component: ChecklistComponent
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
