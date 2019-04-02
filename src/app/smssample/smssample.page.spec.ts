import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmssamplePage } from './smssample.page';

describe('SmssamplePage', () => {
  let component: SmssamplePage;
  let fixture: ComponentFixture<SmssamplePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmssamplePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmssamplePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
