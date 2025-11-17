import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalConfirmPage } from './modal-confirm.page';

describe('ModalConfirmPage', () => {
  let component: ModalConfirmPage;
  let fixture: ComponentFixture<ModalConfirmPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalConfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
