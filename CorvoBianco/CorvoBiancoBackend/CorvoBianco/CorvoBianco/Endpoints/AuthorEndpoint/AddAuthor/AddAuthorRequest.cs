namespace CorvoBianco.Endpoints.AuthorEndpoints.AddAuthor
{
	public class AddAuthorRequest
	{
		public int Id { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public DateTime Born { get; set; }
		public string Bio { get; set; }
		public string? ProfilePicture { get; set; }
	}
}
