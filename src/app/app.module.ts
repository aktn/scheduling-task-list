import { SchedulingAppModule } from './../scheduling-app/scheduling-app.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { Store } from 'store';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// feature modules

// containers
import { AppComponent } from './containers/app/app.component';

// components

// routes
export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'schedule' }
];

export const config: FirebaseAppConfig = {
    apiKey: "AIzaSyBezijfp4eCQXZHx2sTi1nC17VrqIlTHy4",
    authDomain: "scheduling-task.firebaseapp.com",
    databaseURL: "https://scheduling-task.firebaseio.com",
    projectId: "scheduling-task",
    storageBucket: "scheduling-task.appspot.com",
    messagingSenderId: "138243786320"
};

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    SchedulingAppModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    Store
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
