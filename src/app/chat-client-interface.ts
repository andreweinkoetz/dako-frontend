import { ChatPdu } from "./chat-pdu";
import { ClientConversationStatus } from "./client-conversation-status.enum";

export interface ChatClientInterface {

    handleIncomingPdu(receivedPdu: ChatPdu);
    send(pdu: ChatPdu);
    chatMessageEventAction(receivedPdu: ChatPdu);
    logoutResponseAction(receivedPdu: ChatPdu);
    loginEventAction(receivedPdu: ChatPdu);
    logoutEventAction(receivedPdu: ChatPdu);
    chatMessageResponseAction(receivedPdu: ChatPdu);
    loginResponseAction(receivedPdu: ChatPdu);
    loginRequest(userName: string);
    logout(userName: string);
    tell(userName: string, message: string);
}
