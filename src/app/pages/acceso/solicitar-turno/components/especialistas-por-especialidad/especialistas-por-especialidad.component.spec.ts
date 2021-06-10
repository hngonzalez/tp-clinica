import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecialistasPorEspecialidadComponent } from './especialistas-por-especialidad.component';

describe('EspecialistasPorEspecialidadComponent', () => {
  let component: EspecialistasPorEspecialidadComponent;
  let fixture: ComponentFixture<EspecialistasPorEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspecialistasPorEspecialidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecialistasPorEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
