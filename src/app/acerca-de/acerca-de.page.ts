import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList } from '@ionic/angular/standalone';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.page.html',
  styleUrls: ['./acerca-de.page.scss'],
  standalone: true,
  imports: [IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AcercaDePage implements OnInit {
 items: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  constructor() { }

  ngOnInit() {

  }

  itemSelected(item: string) {
    console.log('Selected item:', item);
  }
}
