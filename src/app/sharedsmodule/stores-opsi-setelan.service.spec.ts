import { inject, TestBed } from '@angular/core/testing';

import { StoresOpsiSetelanService } from './stores-opsi-setelan.service';

describe('StoresOpsiSetelanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoresOpsiSetelanService]
    });
  });

  it('should be created', inject([StoresOpsiSetelanService], (service: StoresOpsiSetelanService) => {
    expect(service).toBeTruthy();
  }));
});
