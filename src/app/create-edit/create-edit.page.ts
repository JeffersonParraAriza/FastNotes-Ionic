import { Component, OnInit } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonInput, IonButton, IonLabel
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService, Note } from '../services/notes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.page.html',
  styleUrls: ['./create-edit.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonInput, IonButton, IonLabel,
    CommonModule, FormsModule
  ]
})
export class CreateEditPage implements OnInit {

  id: number | null = null;
  title = '';
  content = '';
  isEditing = false;

  constructor(
    private route: ActivatedRoute,
    private notesService: NotesService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      if (params['id']) {
        this.id = Number(params['id']);
        this.isEditing = true;

        const note = await this.notesService.getNote(this.id);
        if (note) {
          this.title = note.title;
          this.content = note.content;
        }
      }
    });
  }

  async saveNote() {
    if (!this.title.trim()) {
      alert('El título es obligatorio');
      return;
    }

    if (this.isEditing && this.id !== null) {
      const notes = await this.notesService.getNotes();
      const index = notes.findIndex(n => n.id === this.id);

      if (index !== -1) {
        notes[index] = {
          id: this.id,
          title: this.title,
          content: this.content,
          date: new Date().toLocaleString()
        };

        await this.notesService.saveNotes(notes);
      }

    } else {
      const newNote: Note = {
        id: Date.now(),
        title: this.title,
        content: this.content,
        date: new Date().toLocaleString()
      };

      await this.notesService.addNote(newNote);
    }

    this.router.navigate(['/home']);
  }

}
