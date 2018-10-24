import { TestBed, inject } from '@angular/core/testing';

import { SecureSocketioService } from './secure-socketio.service';

describe('SecureSocketioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecureSocketioService]
    });
  });

  it('should be created', inject([SecureSocketioService], (service: SecureSocketioService) => {
    expect(service).toBeTruthy();
  }));
});
