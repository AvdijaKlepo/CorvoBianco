using CorvoBianco.Data;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Endpoints.AuthorizationEndpoint.GetUser
{
	public class GetUserEndpoint:MyBaseEndpoint<GetUserRequest,GetUserResponse>
	{
		private readonly DataContext _dataContext;

		public GetUserEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}
		[HttpGet("GetUsers")]
		public override async Task<GetUserResponse> Obradi([FromQuery]GetUserRequest request, CancellationToken cancellationToken)
		{
			var user = await _dataContext.Users
				.OrderByDescending(u => u.Id)
				.Select(u => new GetUserResponseModel()
				{
					Id = u.Id,
					ProfileImage = u.ProfileImage,
					Name = u.Name,
					LastName = u.LastName,
					BirthDate = u.BirthDate
				})
				.ToListAsync(cancellationToken: cancellationToken);
			return new GetUserResponse()
			{
				Users = user
			};
		}
	}
}
