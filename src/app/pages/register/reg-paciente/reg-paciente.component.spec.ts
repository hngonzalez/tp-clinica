import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegPacienteComponent } from './reg-paciente.component';

describe('RegPacienteComponent', () => {
  let component: RegPacienteComponent;
  let fixture: ComponentFixture<RegPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
