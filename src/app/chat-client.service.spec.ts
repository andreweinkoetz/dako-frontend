import { TestBed, inject } from '@angular/core/testing';

import { ChatClientService } from './chat-client.service';

describe('ChatClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatClientService]
    });
  });

  it('should be created', inject([ChatClientService], (service: ChatClientService) => {
    expect(service).toBeTruthy();
  }));
});
