import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolaCRLComponent } from './consola-crl.component';

describe('ConsolaCRLComponent', () => {
  let component: ConsolaCRLComponent;
  let fixture: ComponentFixture<ConsolaCRLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsolaCRLComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsolaCRLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
