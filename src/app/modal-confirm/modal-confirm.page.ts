import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonText
} from '@ionic/angular/standalone';

import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.page.html',
  styleUrls: ['./modal-confirm.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonText
  ]
})
export class ModalConfirmPage implements OnInit {

  noteId!: number;

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly notesService = inject(NotesService);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.noteId = Number(params['id']);
    });
  }

  async confirmDelete() {
    await this.notesService.deleteNote(this.noteId);

    this.router.navigate(['/home']);
  }

  cancel() {
    this.router.navigate(['/home']);
  }

}
