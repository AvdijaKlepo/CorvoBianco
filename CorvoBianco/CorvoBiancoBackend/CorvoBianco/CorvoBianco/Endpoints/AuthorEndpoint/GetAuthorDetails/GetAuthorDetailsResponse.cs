using CorvoBianco.Data.Models;

namespace CorvoBianco.Endpoints.AuthorEndpoint.GetAuthorDetails
{
	public class GetAuthorDetailsResponse
	{
		public int Id { get; set; }

		public string FirstName { get; set; } = null!;
		public string LastName { get; set; } = null!;
		public DateTime Born { get; set; }
		public string Bio { get; set; }
		public string? ProfilePicture { get; set; }

		public ICollection<Book>? Books { get; set; } = null!;

		public int BookId { get; set; }
	}
}
