import { TestBed, inject } from '@angular/core/testing';

import { StateCommunicationKomponenService } from './state-communication-komponen.service';

describe('StateCommunicationKomponenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateCommunicationKomponenService]
    });
  });

  it('should be created', inject([StateCommunicationKomponenService], (service: StateCommunicationKomponenService) => {
    expect(service).toBeTruthy();
  }));
});
