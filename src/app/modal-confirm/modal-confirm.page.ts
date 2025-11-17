import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.page.html',
  styleUrls: ['./modal-confirm.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ModalConfirmPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
