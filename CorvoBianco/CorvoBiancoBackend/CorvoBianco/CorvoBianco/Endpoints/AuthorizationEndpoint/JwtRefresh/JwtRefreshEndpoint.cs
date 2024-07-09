using CorvoBianco.Data;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Endpoints.AuthorizationEndpoint.JwtRefresh
{
	public class JwtRefreshEndpoint:ControllerBase
	{
		private readonly DataContext _dataContext;

		public JwtRefreshEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}

		[HttpPost("CheckJwtRefresh")]
		public async Task<ActionResult<JwtRefreshResponse>> CheckJwtRefresh(
			[FromHeader(Name = "my-auth-token")] string oldToken, CancellationToken cancellationToken)
		{
			var currentlySignedToken = await _dataContext.AuthenticationToken
				.Where(x => x.Value == oldToken)
				.Include(x => x.UserCertificate)
				.FirstOrDefaultAsync();
			if (currentlySignedToken==null)
			{
				return Ok(new JwtRefreshResponse() { Message = "You are not logged in!" });
			}
			else
			{
				TimeSpan time = TimeSpan.FromMinutes(90);
				DateTime expirationDate = currentlySignedToken.EvidentedTime.Add(time);
				if (DateTime.Now > expirationDate)
				{
					string newToken = TokenGenerator.Generate();

					_dataContext.Remove(currentlySignedToken);

					currentlySignedToken.Value = newToken;
					currentlySignedToken.EvidentedTime=DateTime.Now;

					_dataContext.AuthenticationToken.Update(currentlySignedToken);
					await _dataContext.SaveChangesAsync(cancellationToken);

					return Ok(new JwtRefreshResponse
					{
						Message = "New Token Generated!",
						Refresh = true,
						NewToken = currentlySignedToken.Value,
						AuthenticationToken = currentlySignedToken
					});
				}
				else
				{
					return Ok(new JwtRefreshResponse
					{
						Message = "Token not expired!",
						Refresh = false,
						NewToken = currentlySignedToken.Value,
						AuthenticationToken = currentlySignedToken
					});
				}
			}

			return Ok();
		}
	}
}
