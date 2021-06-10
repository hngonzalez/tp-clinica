import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlergistaComponent } from './alergista.component';

describe('AlergistaComponent', () => {
  let component: AlergistaComponent;
  let fixture: ComponentFixture<AlergistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlergistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlergistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
