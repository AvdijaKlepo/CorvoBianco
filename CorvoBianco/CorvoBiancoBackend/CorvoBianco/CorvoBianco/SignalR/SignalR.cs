using Microsoft.AspNetCore.SignalR;

namespace CorvoBianco.SignalR
{
	public class SignalR:Hub
	{
		public override Task OnConnectedAsync()
		{
			Console.WriteLine(this.Context.ConnectionId);
			return base.OnConnectedAsync();
		}
	}
}
