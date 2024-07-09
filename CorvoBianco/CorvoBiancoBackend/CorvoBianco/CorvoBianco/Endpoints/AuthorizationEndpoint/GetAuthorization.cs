using CorvoBianco.Data;
using CorvoBianco.Data.Models;
using CorvoBianco.Helper;
using CorvoBianco.Helper.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CorvoBianco.Endpoints.AuthorizationEndpoint
{
	public class GetAuthorization:MyBaseEndpoint<NoRequest,AuthorizationService.MyAuthInfo>
	{
		private readonly DataContext _dataContext;
		private readonly AuthorizationService _authorizationService;

		public GetAuthorization(DataContext dataContext,AuthorizationService authorizationService)
		{
			_dataContext = dataContext;
			_authorizationService = authorizationService;
		}
		[HttpPost("Get")]
		public override async Task<AuthorizationService.MyAuthInfo> Obradi([FromBody]NoRequest request, CancellationToken cancellationToken)
		{
			AuthenticationToken? authenticationToken = _authorizationService.GetAuthInfo().authenticationToken;

			return new AuthorizationService.MyAuthInfo(authenticationToken);
		}
	}
}
