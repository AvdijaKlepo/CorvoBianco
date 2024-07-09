using CorvoBianco.Data;
using System.Text.Json.Serialization;
using CorvoBianco.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Helper.Authorization
{
	public class AuthorizationService
	{
		private readonly DataContext _dataContext;
		private readonly IHttpContextAccessor _httpContextAccessor;

		public AuthorizationService(DataContext dataContext,IHttpContextAccessor httpContextAccessor)
		{
			_dataContext = dataContext;
			_httpContextAccessor = httpContextAccessor;
		}

		public bool isLogged()
		{
			return GetAuthInfo().isLogged;
		}

		public bool isAdmin()
		{
			return GetAuthInfo().UserCertificate?.isAdmin ?? false;
		}
		

		public MyAuthInfo GetAuthInfo()
		{
			string? authToken = _httpContextAccessor.HttpContext!.Request.Headers["my-auth-token"];

			AuthenticationToken? authenticationToken = _dataContext.AuthenticationToken
				.Include(x => x.UserCertificate)
				.SingleOrDefault(x => x.Value == authToken);

			return new MyAuthInfo(authenticationToken);
		}
		public class MyAuthInfo
		{
			public MyAuthInfo(AuthenticationToken? authenticationToken)
			{
				this.authenticationToken = authenticationToken;
			}

			[JsonIgnore]
			public UserCertificate? UserCertificate => authenticationToken?.UserCertificate;
			public AuthenticationToken? authenticationToken { get; set; }

			public bool isLogged => UserCertificate != null;

		}
	}
}
