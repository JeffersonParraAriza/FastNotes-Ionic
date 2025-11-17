import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonItem, IonLabel, IonBadge
} from '@ionic/angular/standalone';
import { NotesService, Note } from '../services/notes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonLabel, IonButton, IonBadge
  ]
})
export class DetailPage implements OnInit {

  noteId!: number;
  note: Note | undefined;

  private readonly route = inject(ActivatedRoute);
  private readonly notesService = inject(NotesService);
  private readonly router = inject(Router);

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      this.noteId = Number(params['id']);
      this.note = await this.notesService.getNote(this.noteId);
    });
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  editNote() {
    this.router.navigate(['/create-edit', this.noteId]);
  }

  deleteNote() {
    this.router.navigate(['/modal-confirm'], {
      queryParams: { id: this.noteId }
    });
  }
}
