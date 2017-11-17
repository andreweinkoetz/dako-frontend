import { TestBed, inject } from '@angular/core/testing';

import { AbstractChatClientService } from './abstract-chat-client.service';

describe('AbstractChatClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AbstractChatClientService]
    });
  });

  it('should be created', inject([AbstractChatClientService], (service: AbstractChatClientService) => {
    expect(service).toBeTruthy();
  }));
});
