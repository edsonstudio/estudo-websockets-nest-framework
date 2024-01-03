import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

// @WebSocketGateway(5000) // É possível selecionar a porta em que o gateway será executado
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()

    handleConnection(client: any) {

    }

    handleDisconnect(client: any) {

    }

    @SubscribeMessage('chat')
    chat(client: any, data: any) { 
        
    }

    @SubscribeMessage('users')
    users(client: any, data: any) { 

    }
}