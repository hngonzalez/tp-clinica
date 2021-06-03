import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegAdministradorComponent } from './reg-administrador.component';

describe('RegAdministradorComponent', () => {
  let component: RegAdministradorComponent;
  let fixture: ComponentFixture<RegAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegAdministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
