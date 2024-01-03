import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

// @WebSocketGateway(5000) // É possível selecionar a porta em que o gateway será executado
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()

    handleConnection(client: any) {
        console.log(`${client.id} conectado!`);
        client.emit('connection', 'Conectado com sucesso ao servidor');
        client.broadcast.emit('users', {
            user: client.id,
            action: 'connected'
        });
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