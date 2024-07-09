namespace CorvoBianco.Endpoints.AuthorizationEndpoint.GetUser
{
	public class GetUserResponse
	{
		public List<GetUserResponseModel> Users { get; set; }
	}

	public class GetUserResponseModel
	{
		public int Id { get; set; }
		public string? Name { get; set; }
		public string? LastName { get; set; }
		public string? Admin_Name { get; set; }
		public string? Admin_LastName { get; set; }
		public DateTime BirthDate { get; set; }
		public string? ProfileImage { get; set; }
		public string Username { get; set; }
		public string Password { get; set; }
	}
}
