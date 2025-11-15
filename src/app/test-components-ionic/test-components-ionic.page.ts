import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonAlert, IonModal, IonButtons, IonItem, IonToast, IonToggle } from '@ionic/angular/standalone';
import { OverlayEventDetail } from '@ionic/core/components';
@Component({
  selector: 'app-test-components-ionic',
  templateUrl: './test-components-ionic.page.html',
  styleUrls: ['./test-components-ionic.page.scss'],
  standalone: true,
  imports: [IonToggle, IonToast, IonItem, IonButtons, IonModal, IonAlert, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TestComponentsIonicPage implements OnInit {
alertButtons = ['Action'];

@ViewChild(IonModal) modal!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      this.message = `Hello, ${event.detail.data}!`;
    }
  }
  constructor() { }

  ngOnInit() {
  }

}
