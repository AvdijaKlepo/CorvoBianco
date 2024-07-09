using CorvoBianco.Data.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace CorvoBianco.Endpoints.AuthorEndpoints.GetAuthor
{
	public class GetAuthorResponse
	{
		public List<GetAuthorResponseModel> Authors { get; set; } = null!;

	}
	public class GetAuthorResponseModel
	{
		public int Id { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public DateTime Born { get; set; }
		public string Bio { get; set; }
		public string? ProfilePicture { get; set; }
		[ForeignKey(nameof(Books))]
		public int BookId { get; set; }

		public ICollection<Book>? Books { get; set; } = null!;
	}
}
