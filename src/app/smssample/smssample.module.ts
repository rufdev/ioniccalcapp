import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { SmssamplePage } from './smssample.page';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';


const routes: Routes = [
  {
    path: '',
    component: SmssamplePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    AndroidPermissions
  ],
  declarations: [SmssamplePage]
})
export class SmssamplePageModule {}
