import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenerdorGraficosComponent } from './contenerdor-graficos.component';

describe('ContenerdorGraficosComponent', () => {
  let component: ContenerdorGraficosComponent;
  let fixture: ComponentFixture<ContenerdorGraficosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenerdorGraficosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenerdorGraficosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
