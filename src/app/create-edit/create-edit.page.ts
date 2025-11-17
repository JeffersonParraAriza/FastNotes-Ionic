import { Component, OnInit, inject } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonInput, IonButton, IonLabel
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from '../services/notes.service';
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
  category = '';
  tagsInput = '';
  isEditing = false;

  private readonly route = inject(ActivatedRoute);
  private readonly notesService = inject(NotesService);
  private readonly router = inject(Router);

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      if (params['id']) {
        this.id = Number(params['id']);
        this.isEditing = true;

        const note = await this.notesService.getNote(this.id);
        if (note) {
          this.title = note.title;
          this.content = note.content;
          this.category = note.category ?? '';
          this.tagsInput = (note.tags ?? []).join(', ');
        }
      }
    });
  }

  async saveNote() {
    if (!this.title.trim()) {
      alert('El título es obligatorio');
      return;
    }

    await this.notesService.upsert({
      id: this.isEditing ? this.id ?? undefined : undefined,
      title: this.title.trim(),
      content: this.content,
      category: this.category.trim(),
      tags: this.parseTags(this.tagsInput)
    });

    this.router.navigate(['/home']);
  }

  private parseTags(value: string): string[] {
    return value
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
  }

}
