using CorvoBianco.Data.Models;

namespace CorvoBianco.Endpoints.BookEndpoint.GetBookDetails
{
	public class GetBookDetailPageResponse
	{
		public int Id { get; set; }
		public string Title { get; set; } = null!;
		public string Author { get; set; }
		public int AuthorId { get; set; }
		public string Series { get; set; }
		public int? SeriesId { get; set; }
		public float? Rating { get; set; } = 0;
		public float? RatingCount { get; set; } = 0;
		public string Description { get; set; } = null!;
		public string Genres { get; set; } = null!;
		public int GenresId { get; set; }

		public int PageCount { get; set; } = 0;
		public DateTime Published { get; set; }
		public string BookCover { get; set; }
		public Author AuthorDetails { get; set; }
		public ICollection<Data.Models.Book> AuthorBooks { get; set; }
		public string AuthorBio { get; set; }
	}
}
