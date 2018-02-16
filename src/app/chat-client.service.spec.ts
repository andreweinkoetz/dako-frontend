import { TestBed, inject } from '@angular/core/testing';

import { ChatService } from './chat-client.service';

describe('ChatClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChatService]
    });
  });

  it('should be created', inject([ChatService], (service: ChatService) => {
    expect(service).toBeTruthy();
  }));
});
