import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCrlEditorComponent } from './header-crl-editor.component';

describe('HeaderCrlEditorComponent', () => {
  let component: HeaderCrlEditorComponent;
  let fixture: ComponentFixture<HeaderCrlEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderCrlEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderCrlEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
