import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorTextoComponent } from './contenedor-texto.component';

describe('ContenedorTextoComponent', () => {
  let component: ContenedorTextoComponent;
  let fixture: ComponentFixture<ContenedorTextoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorTextoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenedorTextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
