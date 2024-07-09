using CorvoBianco.Data;
using CorvoBianco.Helper;
using CorvoBianco.Helper.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Endpoints.AuthorizationEndpoint.OrderShipped
{

	public class OrderShippedEndpoint : MyBaseEndpoint<int, OrderShippedResponse>
	{
		private readonly DataContext _dataContext;
		private readonly IHubContext<SignalR.SignalR> _hubContext;

		public OrderShippedEndpoint(DataContext dataContext, IHubContext<SignalR.SignalR> hubContext)
		{
			_dataContext = dataContext;
			_hubContext = hubContext;
		}

		[HttpPost("OrderShipped")]
		public override async Task<OrderShippedResponse> Obradi([FromBody] int request, CancellationToken cancellationToken)
		{
			var order = await _dataContext.Purchases
				.Include(o => o.User)
				.Include(b=>b.Book)
				.FirstOrDefaultAsync(o => o.Id == request, cancellationToken);
			
			if (order == null)
			{
				throw new Exception("Order not found");
			}

			var book = order.Book;
			if (book==null)
			{
				throw new Exception("Book not found in the order!");
			}

			book.IsPurchased = true;
			await _dataContext.SaveChangesAsync(cancellationToken);
			
			

			var message = "Your order has been shipped";
			var username = order.User?.Username;

			if (!string.IsNullOrEmpty(username))
			{
				Console.WriteLine($"Sending message to user {username}");
				await _hubContext.Clients.Group(username).SendAsync("prijem_poruke_js", message, cancellationToken);
				
			}
			else
			{
				Console.WriteLine("Username is null or empty.");
			}

		
			
			return new OrderShippedResponse
			{
				OrderShippedMessage = message
			};
		}
	}
}
