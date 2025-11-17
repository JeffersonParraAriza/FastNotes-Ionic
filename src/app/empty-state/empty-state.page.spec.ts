import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmptyStatePage } from './empty-state.page';

describe('EmptyStatePage', () => {
  let component: EmptyStatePage;
  let fixture: ComponentFixture<EmptyStatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyStatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
