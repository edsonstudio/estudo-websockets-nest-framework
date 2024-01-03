import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

// @WebSocketGateway(5000) // É possível selecionar a porta em que o gateway será executado
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()

    handleConnection(client: any) {
        console.log(`${client.id} conectado!`);
        client.broadcast.emit('users', {
            user: client.id,
            action: 'connected'
        });
    }

    handleDisconnect(client: any) {
        console.log(`${client.id} desconectado!`);
        client.broadcast.emit('users', {
            user: client.id,
            action: 'disconnected'
        });
    }

    @SubscribeMessage('chat')
    chat(client: any, data: any) { 
        console.log(data);
        // client.emit(client.id, 'Mensagem'); // Para enviar mensagem para um client específico
        client.broadcast.emit('chat', data);
        return data;
    }

    @SubscribeMessage('users')
    users(client: any, data: any) { 
        console.log(data);
        return data;
    }
}