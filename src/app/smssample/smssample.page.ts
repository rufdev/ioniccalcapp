import { Component, OnInit } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { AlertController } from '@ionic/angular';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { LoadingController } from '@ionic/angular';

declare var sms: any;

@Component({
  selector: 'app-smssample',
  templateUrl: './smssample.page.html',
  styleUrls: ['./smssample.page.scss']
})
export class SmssamplePage implements OnInit {
  smsForm: FormGroup;

  error_messages = {
    'mobileno': [
      {type: 'required', message: 'Mobile no. is required.'},
      {type: 'minlength', message: 'Mobile no. length must be no lower than 4 digits.'},
      {type: 'maxlength', message: 'Mobile no. length must not be greater than 11 digits.'},
      {type: 'pattern', message: 'Invalid Mobile no.'}
    ],
    'message': [
      {type: 'required', message: 'Message is required.'}
    ]
  };
  constructor(
    private androidPermissions: AndroidPermissions,
    public alertController: AlertController,
    public formBuilder: FormBuilder,
    public loadingController: LoadingController
  ) {
    this.smsForm = this.formBuilder.group({
      mobileno: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(11),
        Validators.pattern('^((\\+91-?)|0)?[0-9]{11}$')
      ])),
      message: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  ngOnInit() {
  }

  send() {
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(async () => {
      const loading = await this.loadingController.create({
        spinner: null,
        message: 'Sending SMS. Please wait...',
        translucent: true
      });
      await loading.present();
       sms.sendMessage({phoneNumber: this.smsForm.value.mobileno, textMessage: this.smsForm.value.message}, async (msg) => {
        loading.dismiss();
        const alert =  await this.alertController.create({
          header: 'Success',
          message: msg,
          buttons: ['OK']
        });
        await alert.present();
        this.smsForm.reset();
      }, async (err) => {
        loading.dismiss();
        const alert =  await this.alertController.create({
          header: 'Error',
          message: 'code: ' + err.code + ', message: ' + err.message,
          buttons: ['OK']
        });
        await alert.present();
      });
    }).catch(async (err) => {
      const alert = await this.alertController.create({
        header: 'SMS Permission Error',
        message: err.message,
        buttons: ['OK']
      });
      await alert.present();
    });
  }
}
