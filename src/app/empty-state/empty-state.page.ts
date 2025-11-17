import { Component, inject } from '@angular/core';
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

  private readonly router = inject(Router);

  createNote() {
    this.router.navigate(['/create-edit']);
  }

}
