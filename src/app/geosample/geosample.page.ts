import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-geosample',
  templateUrl: './geosample.page.html',
  styleUrls: ['./geosample.page.scss'],
})
export class GeosamplePage implements OnInit {
  lon: any;
  lat: any;
  constructor(private geolocation: Geolocation) { }

  ngOnInit() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lon = resp.coords.longitude;
      this.lat = resp.coords.latitude;
    }).catch((error) => {
      console.log(error);
    });
  }

  getlocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lon = resp.coords.longitude;
      this.lat = resp.coords.latitude;
    }).catch((error) => {
      console.log(error);
    });
  }

}
