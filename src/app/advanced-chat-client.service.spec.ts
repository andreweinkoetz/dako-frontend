import { TestBed, inject } from '@angular/core/testing';

import { AdvancedChatClientService } from './advanced-chat-client.service';

describe('AdvancedChatClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdvancedChatClientService]
    });
  });

  it('should be created', inject([AdvancedChatClientService], (service: AdvancedChatClientService) => {
    expect(service).toBeTruthy();
  }));
});
