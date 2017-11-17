import { TestBed, inject } from '@angular/core/testing';

import { SimpleChatClientService } from './simple-chat-client.service';

describe('SimpleChatClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SimpleChatClientService]
    });
  });

  it('should be created', inject([SimpleChatClientService], (service: SimpleChatClientService) => {
    expect(service).toBeTruthy();
  }));
});
