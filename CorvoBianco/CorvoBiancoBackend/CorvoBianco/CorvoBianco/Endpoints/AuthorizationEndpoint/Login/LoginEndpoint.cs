using CorvoBianco.Data;
using CorvoBianco.Data.Models;
using CorvoBianco.Helper;
using CorvoBianco.Helper.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Endpoints.AuthorizationEndpoint.Login
{
	public class AuthorizationLoginEndpoint : MyBaseEndpoint<LoginRequest, AuthorizationService.MyAuthInfo>
	{
		private readonly DataContext _dataContext;
		private readonly IHubContext<SignalR.SignalR> _hubContext;

		public AuthorizationLoginEndpoint(DataContext dataContext, IHubContext<SignalR.SignalR> hubContext)
		{
			_dataContext = dataContext;
			_hubContext = hubContext;
		}

		[HttpPost("Login")]
		public override async Task<AuthorizationService.MyAuthInfo> Obradi([FromBody] LoginRequest request, CancellationToken cancellationToken)
		{
			UserCertificate? loggedUser = await _dataContext.UserCertificate
				.FirstOrDefaultAsync(u =>
					u.Username == request.Username && u.Password == request.Password, cancellationToken);
			if (loggedUser == null)
			{
				return new AuthorizationService.MyAuthInfo(null);
			}

			string twoFKey = null;
			string randomString = TokenGenerator.Generate();

			var newToken = new AuthenticationToken()
			{
				IpAddress = Request.HttpContext.Connection.RemoteIpAddress?.ToString(),
				Value = randomString,
				UserCertificate = loggedUser,
				EvidentedTime = DateTime.Now,
				TwoFactorKey = twoFKey,
				UserCertificateId = loggedUser.Id
			};

			_dataContext.Add(newToken);
			await _dataContext.SaveChangesAsync(cancellationToken);

			if (!string.IsNullOrEmpty(request.SignalRConnectionId))
			{
				await _hubContext.Groups.AddToGroupAsync(request.SignalRConnectionId, loggedUser.Username);
				Console.WriteLine($"Added user {loggedUser.Username} to group with Connection ID: {request.SignalRConnectionId}");
			}
			else
			{
				Console.WriteLine("SignalRConnectionId is null or empty.");
			}
			Console.WriteLine();

			return new AuthorizationService.MyAuthInfo(newToken);
		}
	}

}
