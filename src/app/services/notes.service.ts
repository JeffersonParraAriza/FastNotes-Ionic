import { Injectable, inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Note {
  id: number;
  title: string;
  content: string;
  date: string;
  category?: string;
  tags?: string[];
  createdAt: number;
  updatedAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  // RF004 – Persistencia local de datos (modo offline)
  // RF009 – Ordenar notas por fecha
  private readonly storage = inject(Storage);
  private _storage: Storage | null = null;
  private readonly NOTES_KEY = 'notes';

  private async initStorage(): Promise<void> {
    if (!this._storage) {
      this._storage = await this.storage.create();
    }
  }

  private normalizeTags(input?: string[] | string): string[] {
    if (!input) {
      return [];
    }

    const rawTags = Array.isArray(input) ? input : String(input).split(',');
    const unique = new Set<string>();

    rawTags.forEach(tag => {
      if (typeof tag === 'string') {
        const clean = tag.trim();
        if (clean.length > 0) {
          unique.add(clean);
        }
      }
    });

    return Array.from(unique);
  }

  private formatDate(timestamp: number): string {
    return new Date(timestamp).toLocaleString();
  }

  private normalizeNote(raw: any): Note {
    const id = typeof raw?.id === 'number' ? raw.id : Number(raw?.id) || this.generateId();
    const title = typeof raw?.title === 'string' ? raw.title : '';
    const content = typeof raw?.content === 'string' ? raw.content : '';

    const createdAtCandidate =
      typeof raw?.createdAt === 'number'
        ? raw.createdAt
        : raw?.date
        ? Date.parse(raw.date)
        : undefined;
    const createdAt =
      createdAtCandidate && !Number.isNaN(createdAtCandidate) ? createdAtCandidate : Date.now();

    const updatedAtCandidate =
      typeof raw?.updatedAt === 'number' && raw.updatedAt >= createdAt ? raw.updatedAt : undefined;
    const updatedAt = updatedAtCandidate ?? createdAt;

    const categoryValue = typeof raw?.category === 'string' ? raw.category.trim() : '';
    const tagsValue = this.normalizeTags(raw?.tags);
    const dateValue =
      typeof raw?.date === 'string' && raw.date.trim().length > 0
        ? raw.date
        : this.formatDate(createdAt);

    return {
      id,
      title,
      content,
      date: dateValue,
      category: categoryValue || undefined,
      tags: tagsValue.length ? tagsValue : undefined,
      createdAt,
      updatedAt
    };
  }

  private async loadAll(): Promise<Note[]> {
    await this.initStorage();
    const stored = await this._storage?.get(this.NOTES_KEY);
    if (!stored || !Array.isArray(stored)) {
      return [];
    }
    return stored.map(note => this.normalizeNote(note)).sort((a, b) => b.createdAt - a.createdAt);
  }

  private async saveAll(notes: Note[]): Promise<void> {
    await this.initStorage();
    const normalized = notes
      .map(note => this.normalizeNote(note))
      .sort((a, b) => b.createdAt - a.createdAt);
    await this._storage?.set(this.NOTES_KEY, normalized);
  }

  /**
   * RF009 – Ordenar notas por fecha (más recientes primero)
   */
  async getAll(): Promise<Note[]> {
    return this.loadAll();
  }

  async getNotes(): Promise<Note[]> {
    return this.getAll();
  }

  async getNote(id: number): Promise<Note | undefined> {
    const notes = await this.loadAll();
    return notes.find(note => note.id === id);
  }

  /**
   * RF007 – Crear categorías/etiquetas
   * RF008 – Listar notas por categoría
   */
  async getCategories(): Promise<string[]> {
    const notes = await this.loadAll();
    const categories = new Set<string>();
    notes.forEach(note => {
      if (note.category) {
        categories.add(note.category);
      }
    });
    return Array.from(categories).sort((a, b) => a.localeCompare(b));
  }

  /**
   * RF007 – Crear categorías/etiquetas
   */
  async getTags(): Promise<string[]> {
    const notes = await this.loadAll();
    const tags = new Set<string>();
    notes.forEach(note => {
      note.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort((a, b) => a.localeCompare(b));
  }

  /**
   * RF005 – Buscar notas por texto (dinámico)
   * RF006/RF008 – Filtrar notas por categoría
   */
  async search(term: string, category?: string, tags?: string[]): Promise<Note[]> {
    const notes = await this.getAll();
    const normalizedTerm = (term ?? '').trim().toLowerCase();
    const normalizedCategory = (category ?? '').trim().toLowerCase();
    const normalizedTags = this.normalizeTags(tags).map(tag => tag.toLowerCase());

    return notes.filter(note => {
      const matchesTerm =
        !normalizedTerm ||
        note.title.toLowerCase().includes(normalizedTerm) ||
        note.content.toLowerCase().includes(normalizedTerm) ||
        (note.category ?? '').toLowerCase().includes(normalizedTerm) ||
        (note.tags ?? []).some(tag => tag.toLowerCase().includes(normalizedTerm));

      const matchesCategory =
        !normalizedCategory || (note.category ?? '').toLowerCase() === normalizedCategory;

      const matchesTags =
        normalizedTags.length === 0 ||
        normalizedTags.every(tag =>
          (note.tags ?? []).some(existing => existing.toLowerCase() === tag)
        );

      return matchesTerm && matchesCategory && matchesTags;
    });
  }

  /**
   * Crea una nueva nota o actualiza una existente y devuelve el listado actualizado.
   */
  async upsert(data: {
    id?: number;
    title: string;
    content?: string;
    category?: string;
    tags?: string[];
  }): Promise<Note[]> {
    const now = Date.now();
    const notes = await this.loadAll();
    const normalizedTags = this.normalizeTags(data.tags);
    const normalizedCategory = (data.category ?? '').trim();
    const content = typeof data.content === 'string' ? data.content : '';

    if (typeof data.id === 'number') {
      const index = notes.findIndex(note => note.id === data.id);

      if (index !== -1) {
        const existing = notes[index];
        notes[index] = {
          ...existing,
          title: data.title,
          content,
          category: normalizedCategory || undefined,
          tags: normalizedTags.length ? normalizedTags : undefined,
          updatedAt: now,
          date: this.formatDate(existing.createdAt)
        };
      } else {
        notes.unshift({
          id: data.id,
          title: data.title,
          content,
          category: normalizedCategory || undefined,
          tags: normalizedTags.length ? normalizedTags : undefined,
          createdAt: now,
          updatedAt: now,
          date: this.formatDate(now)
        });
      }
    } else {
      notes.unshift({
        id: this.generateId(),
        title: data.title,
        content,
        category: normalizedCategory || undefined,
        tags: normalizedTags.length ? normalizedTags : undefined,
        createdAt: now,
        updatedAt: now,
        date: this.formatDate(now)
      });
    }

    const sorted = notes.sort((a, b) => b.createdAt - a.createdAt);
    await this.saveAll(sorted);
    return sorted;
  }

  /**
   * Elimina una nota por id y devuelve el listado actualizado.
   */
  async deleteNote(id: number): Promise<Note[]> {
    const notes = await this.loadAll();
    const filtered = notes.filter(note => note.id !== id);
    await this.saveAll(filtered);
    return filtered;
  }

  private generateId(): number {
    return Date.now() + Math.floor(Math.random() * 1000);
  }
}
