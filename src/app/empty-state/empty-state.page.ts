import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.page.html',
  styleUrls: ['./empty-state.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton
  ]
})
export class EmptyStatePage {

  constructor(private router: Router) { }

  createNote() {
    this.router.navigate(['/create-edit']);
  }

}
