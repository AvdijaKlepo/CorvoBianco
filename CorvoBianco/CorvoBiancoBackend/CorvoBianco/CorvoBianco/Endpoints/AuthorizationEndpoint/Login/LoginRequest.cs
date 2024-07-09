namespace CorvoBianco.Endpoints.AuthorizationEndpoint.Login
{
	public class LoginRequest
	{
		public string Username { get; set; }
		public string Password { get; set; }
		public string SignalRConnectionId { get; set; }
	}
}
