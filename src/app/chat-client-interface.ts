import { ChatPdu } from "./chat-pdu";
import { ClientConversationStatus } from "./client-conversation-status.enum";

export interface ChatClientInterface {
    
    // Verarbeitet eintreffende PDUs
    handleIncomingPdu(receivedPdu: ChatPdu);
    // Verarbeitung einer Änderung der Benutzerliste
    handleUserListEvent(receivedPdu: ChatPdu);
    // Sendet eine ChatPDU über ClientService
    send(pdu: ChatPdu);

    // Verarbeitung eintreffender Events, Anfragen und Antworten
    chatMessageEventAction(receivedPdu: ChatPdu);
    logoutResponseAction(receivedPdu: ChatPdu);
    loginEventAction(receivedPdu: ChatPdu);
    logoutEventAction(receivedPdu: ChatPdu);
    chatMessageResponseAction(receivedPdu: ChatPdu);
    loginResponseAction(receivedPdu: ChatPdu);
    loginRequest(userName: string);
    
    // Führt Abmeldung durch
    logout(userName: string);
    // Sendet Nachricht an Benutzer
    tell(userName: string, message: string);
}
