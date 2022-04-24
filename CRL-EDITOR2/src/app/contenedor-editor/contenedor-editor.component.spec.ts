import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorEditorComponent } from './contenedor-editor.component';

describe('ContenedorEditorComponent', () => {
  let component: ContenedorEditorComponent;
  let fixture: ComponentFixture<ContenedorEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenedorEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
