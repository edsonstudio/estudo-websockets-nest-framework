import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

const options = {
    cors: {
        origin: ["http://localhost:8080", "http://127.0.0.1:8080"],
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        credentials: true
    }
}

// @WebSocketGateway(5000) // É possível selecionar a porta em que o gateway será executado
@WebSocketGateway(options)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server;

    private clients: { [key: string]: any } = {};

    handleConnection(client: any) {
        console.log(`${client.id} conectado!`);
        this.clients[client.id] = client;

        const connectedUsers = Object.keys(this.clients);

        // Emitir para o cliente recém-conectado
        client.emit('users', {
            users: connectedUsers,
            action: 'connected'
        });

        // Emitir para todos os clientes conectados
        this.server.emit('users', {
            users: connectedUsers,
            action: 'connected'
        });
    }

    handleDisconnect(client: any) {
        console.log(`${client.id} desconectado!`);
        delete this.clients[client.id];

        this.server.emit('users', {
            user: client.id,
            action: 'disconnected'
        });
    }

    @SubscribeMessage('chat')
    chat(client: any, data: any) {
        console.log(data);

        // Modificando a estrutura da mensagem para incluir o ID do remetente
        const messageWithUser = {
            user: client.id,
            message: data.message
        };

        // client.emit(client.id, 'Mensagem'); // Para enviar mensagem para um client específico
        client.broadcast.emit('chat', messageWithUser);
        return messageWithUser;
    }

    @SubscribeMessage('users')
    users(client: any, data: any) {
        console.log(data);
        return data;
    }
}