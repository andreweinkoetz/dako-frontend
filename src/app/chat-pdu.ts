import { Pdutype } from "./pdutype.enum";
import { ClientConversationStatus } from "./client-conversation-status.enum";

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

    constructor(userName: string, pdutype: Pdutype) {
        this.userName = userName;

    }

    public getPdutype(): Pdutype{
        return this.pdutype;
    }

    public setPduType(pdutype : Pdutype): void {
		this.pdutype = pdutype;
	}

}
