import { Pdutype } from "./pdutype.enum";
import { ClientConversationStatus } from "./client-conversation-status.enum";
import { useAnimation } from "@angular/core/src/animation/dsl";

export class ChatPdu {

    private userName: string;
    private pdutype: Pdutype;
    private eventUserName: string;
    private clientThreadName: string;
    private serverThreadName: string;
    private sequenceNumber: number;
    private message: string;
    private clients: Array<string>;
    private serverTime: number;
    private clientStatus: ClientConversationStatus;
    private numberOfReceivedChatMessages: number;
    private numberOfSentEvents: number;
    private numberOfReceivedConfirms: number;
    private numberOfLostConfirms: number;
    private numberOfRetries: number;
    private errorCode: number;

    setPduType(pdutype: Pdutype) {
        this.pdutype = pdutype;
    }

    setUserName(userName: string) {
        this.userName = userName;
    }

    setEventUserName(eventUserName: string) {
        this.eventUserName = eventUserName;
    }

    setClientThreadName(clientThreadName: string) {
        this.clientThreadName = clientThreadName;
    }

    setServerThreadName(serverThreadName: string) {
        this.serverThreadName = serverThreadName;
    }

    setSequenceNumber(sequenceNumber: number) {
        this.sequenceNumber = sequenceNumber;
    }

    setMessage(message: string) {
        this.message = message;
    }

    setClients(clients: Array<string>) {
        this.clients = clients;
    }

    addClient(client: string) {
        if (this.clients != null) {
            this.clients.push(client);
        } else {
            this.clients = new Array<string>();
            this.addClient(client);
        }
    }

    setServerTime(serverTime: number) {
        this.serverTime = serverTime;
    }

    setClientStatus(clientStatus: ClientConversationStatus) {
        this.clientStatus = clientStatus;
    }

    setNumberOfReceivedChatMessages(numberOfReceivedChatMessages: number) {
        this.numberOfReceivedChatMessages = numberOfReceivedChatMessages;
    }

    setNumberOfSentEvents(numberOfSentEvents: number) {
        this.numberOfSentEvents = numberOfSentEvents;
    }

    setNumberOfReceivedConfirms(numberOfReceivedConfirms: number) {
        this.numberOfReceivedConfirms = numberOfReceivedConfirms;
    }

    setNumberOfLostConfirms(numberOfLostConfirms: number) {
        this.numberOfLostConfirms = numberOfLostConfirms;
    }

    setErrorCode(errorCode: number) {
        this.errorCode = errorCode;
    }

    setNumberOfRetries(numberOfRetries: number) {
        this.numberOfRetries = numberOfRetries;
    }

    getUserName(): string {
        return this.userName;
    }
    getEventUserName(): string {
        return this.eventUserName;
    }
    getClientThreadName(): string {
        return this.clientThreadName;
    }
    getServerThreadName(): string {
        return this.serverThreadName;
    }
    getSequenceNumber(): number {
        return this.sequenceNumber;
    }
    getMessage(): string {
        return this.message;
    }

    removeClient(client: string) {
        var index = this.clients.indexOf(client, 0);
        if (index > -1) {
            this.clients.splice(index, 1);
        }
    }

    getClients(): Array<string> {
        return this.clients;
    }

    getServerTime(): number {
        return this.serverTime;
    }

    getErrorCode(): number {
        return this.errorCode;
    }

    getClientStatus(): ClientConversationStatus {
        return this.clientStatus;
    }

    getNumberOfReceivedChatMessages(): number {
        return this.numberOfReceivedChatMessages;
    }

    getNumberOfRetries(): number {
        return this.numberOfRetries;
    }

    getNumberOfSentEvents(): number {
        return this.numberOfSentEvents;
    }

    getNumberOfReceivedConfirms(): number {
        return this.numberOfReceivedConfirms;
    }

    getNumberOfLostConfirms(): number {
        return this.numberOfLostConfirms;
    }

    getPdutype(): Pdutype {
        return this.pdutype;
    }

    /**
	 * Erzeugen einer Logout-Event-PDU
	 * 
	 * @param userName
	 *          Client, der Logout-Request-PDU gesendet hat
	 * @param clientList
	 *          Liste der registrierten User
	 * @param receivedPdu
	 *          Empfangene PDU (Logout-Request-PDU)
	 * @return Erzeugte PDU
	 */
    public static createLogoutEventPdu(userName: string, clientList: Array<string>, receivedPdu: ChatPdu): ChatPdu {
        var pdu: ChatPdu = new ChatPdu();
        pdu.setPduType(Pdutype.LOGOUT_EVENT);
        pdu.setUserName(userName);
        pdu.setEventUserName(userName);
        pdu.setClients(clientList);
        pdu.setClientStatus(ClientConversationStatus.UNREGISTERING);
        return pdu;
    }

    /**
	 * Erzeugen einer Login-Event-PDU
	 * 
	 * @param userName
	 *          Client, der Login-Request-PDU gesendet hat
	 * @param clientList
	 *          Liste der registrierten User
	 * @param receivedPdu
	 *          Empfangene PDU (Login-Request-PDU)
	 * @return Erzeugte PDU
	 */
    public static createLoginEventPdu(userName: string, clientList: Array<string>,
        receivedPdu: ChatPdu): ChatPdu {

        var pdu: ChatPdu = new ChatPdu();
        pdu.setPduType(Pdutype.LOGIN_EVENT);
        pdu.setUserName(userName);
        pdu.setEventUserName(receivedPdu.getUserName());
        pdu.setUserName(receivedPdu.getUserName());
        pdu.setClients(clientList);
        pdu.setClientStatus(ClientConversationStatus.REGISTERING);
        return pdu;
    }

    /**
	 * Erzeugen einer Login-Response-PDU
	 * 
	 * @param eventInitiator
	 *          Urspruenglicher Client, der Login-Request-PDU gesendet hat
	 * @param receivedPdu
	 *          Empfangene PDU
	 * @return Erzeugte PDU
	 */
    public static createLoginResponsePdu(eventInitiator: string, receivedPdu: ChatPdu): ChatPdu {
        var pdu: ChatPdu = new ChatPdu();
        pdu.setPduType(Pdutype.LOGIN_RESPONSE);
        pdu.setUserName(eventInitiator);
        pdu.setClientStatus(ClientConversationStatus.REGISTERED);
        return pdu;
    }

    /**
	 * Erzeugen einer Chat-Message-Event-PDU
	 * 
	 * @param userName
	 *          Client, der Chat-Message-Request-PDU gesendet hat
	 * @param receivedPdu
	 *          (Chat-Message-Request-PDU)
	 * @return Erzeugte PDU
	 */
    public static createChatMessageEventPdu(userName: string, receivedPdu: ChatPdu): ChatPdu {
        var pdu: ChatPdu = new ChatPdu();
        pdu.setPduType(Pdutype.CHAT_MESSAGE_EVENT);
        pdu.setUserName(userName);
        pdu.setEventUserName(receivedPdu.getUserName());
        pdu.setSequenceNumber(receivedPdu.getSequenceNumber());
        pdu.setClientStatus(ClientConversationStatus.REGISTERED);
        pdu.setMessage(receivedPdu.getMessage());
        return pdu;
    }

    /**
	 * Erzeugen einer Logout-Response-PDU
	 * 
	 * @param eventInitiator
	 *          Urspruenglicher Client, der Logout-Request-PDU gesendet hat
	 * @param numberOfSentEvents
	 *          Anzahl an den Client gesendeter Events
	 * @param numberOfLostEventConfirms
	 *          Anzahl verlorener EventConfirms des Clients
	 * @param numberOfReceivedEventConfirms
	 *          Anzahl empfangender EventConfirms des Clients
	 * @param numberOfRetries
	 *          Anzahl wiederholter Nachrichten
	 * @param numberOfReceivedChatMessages
	 *          Anzahl empfangender Chat-Messages des Clients
	 * @param clientThreadName
	 *          Name des Client-Threads
	 * @return Aufgebaute ChatPDU
	 */
    public static createLogoutResponsePdu(eventInitiator: string,
        numberOfSentEvents: number, numberOfLostEventConfirms: number,
        numberOfReceivedEventConfirms: number, numberOfRetries: number,
        numberOfReceivedChatMessages: number, clientThreadName: string): ChatPdu {

        var pdu: ChatPdu = new ChatPdu();
        pdu.setPduType(Pdutype.LOGOUT_RESPONSE);
        pdu.setClientStatus(ClientConversationStatus.UNREGISTERED);

        // Statistikdaten versorgen
        pdu.setNumberOfSentEvents(numberOfSentEvents);
        pdu.setNumberOfLostConfirms(numberOfLostEventConfirms);
        pdu.setNumberOfReceivedConfirms(numberOfReceivedEventConfirms);
        pdu.setNumberOfRetries(numberOfRetries);
        pdu.setNumberOfReceivedChatMessages(numberOfReceivedChatMessages);
        pdu.setUserName(eventInitiator);
        return pdu;
    }

    /**
	 * Erzeugen einer Chat-Message-Response-PDU
	 * 
	 * @param eventInitiator
	 *          Urspruenglicher Client, der Chat-Message-Request-PDU gesendet hat
	 * @param numberOfSentEvents
	 *          Anzahl an den Client gesendeter Events
	 * @param numberOfLostEventConfirms
	 *          Anzahl verlorener EventConfirms des Clients
	 * @param numberOfReceivedEventConfirms
	 *          Anzahl empfangender EventConfirms des Clients
	 * @param numberOfRetries
	 *          Anzahl wiederholter Nachrichten
	 * @param numberOfReceivedChatMessages
	 *          Anzahl empfangender Chat-Messages des Clients
	 * @param serverTime
	 *          Requestbearbeitungszeit im Server
	 * @return Erzeugte PDU
	 */
    public static createChatMessageResponsePdu(eventInitiator: string,
        numberOfSentEvents: number, numberOfLostEventConfirms: number,
        numberOfReceivedEventConfirms: number, numberOfRetries: number,
        numberOfReceivedChatMessages: number, clientThreadName: string, serverTime: number): ChatPdu {

        var pdu: ChatPdu = new ChatPdu();
        pdu.setPduType(Pdutype.CHAT_MESSAGE_RESPONSE);
        pdu.setEventUserName(eventInitiator);
        pdu.setUserName(eventInitiator);

        pdu.setClientStatus(ClientConversationStatus.REGISTERED);

        // Statistikdaten versorgen
        pdu.setSequenceNumber(numberOfReceivedChatMessages);
        pdu.setNumberOfSentEvents(numberOfSentEvents);
        pdu.setNumberOfLostConfirms(numberOfLostEventConfirms);
        pdu.setNumberOfReceivedConfirms(numberOfReceivedEventConfirms);
        pdu.setNumberOfRetries(numberOfRetries);
        pdu.setNumberOfReceivedChatMessages(numberOfReceivedChatMessages);

        // Serverbearbeitungszeit
        pdu.setServerTime(serverTime);
        return pdu;
    }

    /**
	 * Erzeugen einer Login-Response-PDU mit Fehlermeldung
	 * 
	 * @param pdu
	 *          Empfangene PDU
	 * @param errorCode
	 *          Fehlercode, der in der PDU uebertragen werden soll
	 * @return Erzeugte PDU
	 */
    public static createLoginErrorResponsePdu(receivedPdu: ChatPdu, errorCode: number): ChatPdu {

        var pdu: ChatPdu = new ChatPdu();
        pdu.setPduType(Pdutype.LOGIN_RESPONSE);
        pdu.setUserName(receivedPdu.getUserName());
        pdu.setClientStatus(ClientConversationStatus.UNREGISTERED);
        pdu.setErrorCode(errorCode);
        return pdu;
    }

    /**
	 * Erzeugen einer Login-Event-Confirm-PDU
	 * 
	 * @param userName
	 *          Name des Clients
	 * @param pdu
	 *          Empfangene PDU
	 * @return Erzeugte PDU
	 */
    public static createLoginEventConfirm(userName: string, receivedPdu: ChatPdu): ChatPdu {

        var pdu: ChatPdu = new ChatPdu();
        pdu.setPduType(Pdutype.LOGIN_EVENT_CONFIRM);
        pdu.setClientStatus(ClientConversationStatus.REGISTERED);
        pdu.setUserName(userName);
        pdu.setEventUserName(receivedPdu.getEventUserName());
        return pdu;
    }

    /**
	 * Erzeugen einer Logout-Event-Confirm-PDU
	 * 
	 * @param userName
	 *          Name des Clients
	 * @param pdu
	 *          Empfangene PDU
	 * @return Erzeugte PDU
	 */
    public static createLogoutEventConfirm(userName: string, receivedPdu: ChatPdu): ChatPdu {

        var pdu: ChatPdu = new ChatPdu();
        pdu.setPduType(Pdutype.LOGOUT_EVENT_CONFIRM);
        pdu.setClientStatus(ClientConversationStatus.UNREGISTERING);
        pdu.setUserName(userName);
        pdu.setEventUserName(receivedPdu.getEventUserName());
        return pdu;
    }

    /**
     * Erzeugen einer Chat-Message-Event-Confirm-PDU
     * 
     * @param userName
     *          Name des Clients
     * @param pdu
     *          Empfangene PDU
     * @return Erzeugte PDU
     */
    public static createChatMessageEventConfirm(userName: string,
        receivedPdu: ChatPdu): ChatPdu {

        var pdu: ChatPdu = new ChatPdu();
        pdu.setPduType(Pdutype.CHAT_MESSAGE_EVENT_CONFIRM);
        pdu.setClientStatus(ClientConversationStatus.REGISTERED);
        pdu.setUserName(userName);
        pdu.setEventUserName(receivedPdu.getEventUserName());
        return pdu;
    }

}
