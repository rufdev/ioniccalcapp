import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeosamplePage } from './geosample.page';

describe('GeosamplePage', () => {
  let component: GeosamplePage;
  let fixture: ComponentFixture<GeosamplePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeosamplePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeosamplePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
