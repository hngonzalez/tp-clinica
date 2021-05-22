import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegOkPacienteComponent } from './reg-ok-paciente.component';

describe('RegOkPacienteComponent', () => {
  let component: RegOkPacienteComponent;
  let fixture: ComponentFixture<RegOkPacienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegOkPacienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegOkPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
