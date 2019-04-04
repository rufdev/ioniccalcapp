import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  appPages: any;
  constructor(
    private platform: Platform,
    private appComponent: AppComponent
  ) {
    this.appPages = appComponent.appPages.filter(function(obj){
      return obj.title !== 'Home';
    });
  }
}
