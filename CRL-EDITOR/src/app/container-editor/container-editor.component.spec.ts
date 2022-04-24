import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerEditorComponent } from './container-editor.component';

describe('ContainerEditorComponent', () => {
  let component: ContainerEditorComponent;
  let fixture: ComponentFixture<ContainerEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
