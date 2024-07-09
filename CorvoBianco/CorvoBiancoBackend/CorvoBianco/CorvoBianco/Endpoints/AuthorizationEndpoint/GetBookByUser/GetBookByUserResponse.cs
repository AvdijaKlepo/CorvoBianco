using CorvoBianco.Data.Models;
using CorvoBianco.Endpoints.BookEndpoint.GetBook;

namespace CorvoBianco.Endpoints.AuthorizationEndpoint.GetBookByUser
{
	public class GetBookByUserResponse
	{
		public ICollection<GetBookByUserResponseModel>? UserWantToRead { get; set; }
		


	}

	public class GetBookByUserResponseModel
	{
		public int Id { get; set; }
		public string Title { get; set; } = null!;
		public string Author { get; set; } = null!;
		public string? Series { get; set; } = "N/A";
		public float? Rating { get; set; } = 0;
		public float? RatingCount { get; set; } = 0;
		public string? BookCover { get; set; }
		public string Genre { get; set; } = null!;
	}



}
