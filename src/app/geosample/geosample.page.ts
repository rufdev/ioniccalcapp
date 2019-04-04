import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-geosample',
  templateUrl: './geosample.page.html',
  styleUrls: ['./geosample.page.scss'],
})
export class GeosamplePage implements OnInit {
  lon: any;
  lat: any;
  constructor(private geolocation: Geolocation,
    public alertController: AlertController,
    public loadingController: LoadingController
    ) { }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      spinner: null,
      message: 'Getting Location. Please wait...',
      translucent: true
    });
    await loading.present();

    this.geolocation.getCurrentPosition().then(async (resp) => {
      loading.dismiss();
      this.lon = resp.coords.longitude;
      this.lat = resp.coords.latitude;
      const alert =  await this.alertController.create({
        header: 'Success',
        message: 'Location obtained.',
        buttons: ['OK']
      });
      await alert.present();
    }).catch(async (error) => {
      loading.dismiss();
      const alert =  await this.alertController.create({
        header: 'Error',
        message: 'Unable to get location.',
        buttons: ['OK']
      });
      await alert.present();
    });
  }

  async getlocation() {
    const loading = await this.loadingController.create({
      spinner: null,
      message: 'Getting Location. Please wait...',
      translucent: true
    });
    await loading.present();
    this.geolocation.getCurrentPosition().then(async (resp) => {
      loading.dismiss();
      this.lon = resp.coords.longitude;
      this.lat = resp.coords.latitude;
      const alert =  await this.alertController.create({
        header: 'Success',
        message: 'Location obtained.',
        buttons: ['OK']
      });
      await alert.present();
    }).catch(async (error) => {
      loading.dismiss();
      const alert =  await this.alertController.create({
        header: 'Error',
        message: 'Unable to get location.',
        buttons: ['OK']
      });
      await alert.present();
    });
  }
}
