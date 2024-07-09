using CorvoBianco.Data.Models;

namespace CorvoBianco.Endpoints.AuthorizationEndpoint.JwtRefresh
{
	public class JwtRefreshResponse
	{
		public bool Refresh { get; set; }
		public string NewToken { get; set; }
		public string? Message { get; set; }
		public AuthenticationToken AuthenticationToken { get; set; }
	}
}
