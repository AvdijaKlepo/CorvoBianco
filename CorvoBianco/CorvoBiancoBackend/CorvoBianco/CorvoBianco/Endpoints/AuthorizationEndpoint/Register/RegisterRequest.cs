namespace CorvoBianco.Endpoints.AuthorizationEndpoint.Register
{
	public class RegisterRequest
	{
		public int Id { get; set; }
		public string Username { get; set; }
		public string Password { get; set; }
		public string Name { get; set; }
		public string LastName { get; set; }
		public DateTime BirthDate { get; set; }
		public string? ProfileImage { get; set; }
	}
}
