using CorvoBianco.Data;
using CorvoBianco.Data.Models;
using CorvoBianco.Endpoints.AuthorEndpoint.GetAuthorDetails;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Endpoints.AuthorizationEndpoint.GetUser
{
	public class GetUserDetails:MyBaseEndpoint<int,GetUserResponseModel>
	{
		private readonly DataContext _dataContext;

		public GetUserDetails(DataContext dataContext)
		{
			_dataContext = dataContext;
		}
		[HttpGet("GetUserDetails{id}")]
		public override async Task<GetUserResponseModel> Obradi(int id, CancellationToken cancellationToken)
		{
			var userCertificate = await _dataContext.UserCertificate
				.SingleOrDefaultAsync(x => x.Id == id, cancellationToken: cancellationToken);

			if (userCertificate == null)
			{
				
				return null;
			}

			var response = new GetUserResponseModel
			{
				Id = userCertificate.Id,
				Username = userCertificate.Username,
				Password = userCertificate.Password
			};

			if (userCertificate.isUser)
			{
				response.Name = userCertificate.User.Name;
				response.LastName = userCertificate.User.LastName;
				response.BirthDate = userCertificate.User.BirthDate;
				response.ProfileImage = userCertificate.User.ProfileImage;
			}

			if (userCertificate.isAdmin)
			{
				response.Admin_Name = userCertificate.Admin.Name;
				response.Admin_LastName = userCertificate.Admin.LastName;
				response.BirthDate = userCertificate.Admin.BirthDate;  
			}

			return response;
		}
	}
}
