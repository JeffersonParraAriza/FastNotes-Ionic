import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonToast } from '@ionic/angular/standalone';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonToast],
})
export class HomePage {
  constructor() {}
  mostrarToast = false;

  mostrarMensaje() {
    this.mostrarToast = true;
  }
}
