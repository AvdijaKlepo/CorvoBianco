using CorvoBianco.Data;
using CorvoBianco.Endpoints.AuthorizationEndpoint.GetUserById;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Endpoints.AuthorizationEndpoint.GetAdminById
{
	public class GetAdminByIdEndpoint:MyBaseEndpoint<int,GetUserIdResponse>
	{
		private readonly DataContext _dataContext;

		public GetAdminByIdEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}
		[HttpGet("GetAdminById{id}")]
		public override async Task<GetUserIdResponse> Obradi(int id, CancellationToken cancellationToken)
		{
			var userById = await _dataContext.Admins
				.Select(u => new GetUserIdResponse()
				{
					Id = u.Id,
					LastName = u.LastName,
					Name = u.Name,
					BirthDate = u.BirthDate
				})
				.SingleAsync(u => u.Id == id, cancellationToken: cancellationToken);
			return userById;
		}
	}
}
