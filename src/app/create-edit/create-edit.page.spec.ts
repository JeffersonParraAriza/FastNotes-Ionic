import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateEditPage } from './create-edit.page';

describe('CreateEditPage', () => {
  let component: CreateEditPage;
  let fixture: ComponentFixture<CreateEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
