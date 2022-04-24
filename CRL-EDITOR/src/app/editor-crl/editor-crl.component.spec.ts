import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorCrlComponent } from './editor-crl.component';

describe('EditorCrlComponent', () => {
  let component: EditorCrlComponent;
  let fixture: ComponentFixture<EditorCrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorCrlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorCrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
