using ChatService.DataService;
using ChatService.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatService.Hubs
{
    public class ChatHub: Hub
    {
        private readonly ShareDb _shareDb;

        public ChatHub(ShareDb shareDb)
        {
                _shareDb = shareDb;
        }

        public async Task JoinChat(UserConnection userConnection)
        {
            await Clients.All
                .SendAsync("ReceiveMessage", "Admin", $"{userConnection.UserName} has joined");
        }

        public async Task JoinSpecificChatRoom(UserConnection con)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, con.ChatRoom);

            _shareDb.connections[Context.ConnectionId] = con;

            await Clients
                .Group(con.ChatRoom)
                    .SendAsync("JoinSpecificChatRoom", "Admin", $"{con.UserName} has joined ${con.ChatRoom}");
        }

        public async Task SendMessage(string message)
        {
            if(_shareDb.connections.TryGetValue(Context.ConnectionId, out UserConnection conn))
            {
                await Clients.Group(conn.ChatRoom).SendAsync("ReceivedSpecificMessage", conn.UserName, message);
            }
        }
    }
}
