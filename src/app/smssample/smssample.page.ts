import { Component, OnInit } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { ToastController } from '@ionic/angular';
declare var sms: any;

@Component({
  selector: 'app-smssample',
  templateUrl: './smssample.page.html',
  styleUrls: ['./smssample.page.scss']
})
export class SmssamplePage implements OnInit {
  mobileno: any;
  message: any;

  constructor(
    private androidPermissions: AndroidPermissions,
    private toastController: ToastController
  ) {}

  ngOnInit() {
  }

  send() {
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(() => {
      sms.sendMessage({phoneNumber: this.mobileno, textMessage: this.message}, function(message) {
        this.success(message);
      }, function(error) {
        this.error('code: ' + error.code + ', message: ' + error.message);
      });
    }).catch((err) => {
      console.log('error');
    });
  }

  async success(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    await toast.present();
  }

  async error(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    await toast.present();
  }
}
