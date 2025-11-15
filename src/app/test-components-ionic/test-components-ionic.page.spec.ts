import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestComponentsIonicPage } from './test-components-ionic.page';

describe('TestComponentsIonicPage', () => {
  let component: TestComponentsIonicPage;
  let fixture: ComponentFixture<TestComponentsIonicPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponentsIonicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
