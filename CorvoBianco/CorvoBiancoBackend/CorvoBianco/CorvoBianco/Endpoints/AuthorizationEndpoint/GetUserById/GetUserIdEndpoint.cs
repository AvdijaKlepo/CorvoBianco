using CorvoBianco.Data;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Endpoints.AuthorizationEndpoint.GetUserById
{
	public class GetUserIdEndpoint:MyBaseEndpoint<int,GetUserIdResponse>
	{
		private readonly DataContext _dataContext;

		public GetUserIdEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}
		[HttpGet("GetUserById{id}")]
		public override async Task<GetUserIdResponse> Obradi(int id, CancellationToken cancellationToken)
		{
			var userCertificate = await _dataContext.UserCertificate
				.SingleOrDefaultAsync(u => u.Id == id, cancellationToken: cancellationToken);

			if (userCertificate == null)
			{
	
				return null;
			}

			var response = new GetUserIdResponse
			{
				Id = userCertificate.Id
			};

			if (userCertificate.isUser)
			{
				response.Name = userCertificate.User.Name;
				response.LastName = userCertificate.User.LastName;
				response.BirthDate = userCertificate.User.BirthDate;
				response.ProfileImage = userCertificate.User.ProfileImage;
				response.Ratings = userCertificate.User.UserRatings;
			}

			if (userCertificate.isAdmin)
			{
				response.AdminName = userCertificate.Admin.Name;
				response.AdminLastName = userCertificate.Admin.LastName;
				response.AdminBirthDate = userCertificate.Admin.BirthDate;
			}

			return response;
		}
	}
}
