using CorvoBianco.Endpoints.AuthorizationEndpoint.GetBookByUser;

namespace CorvoBianco.Endpoints.AuthorizationEndpoint.GetAllBookByUser
{
	public class GetAllBookByUserResponse
	{
		public ICollection<GetAllBookByUserResponseModel>? AllUserBooks { get; set; }
	}
	public class GetAllBookByUserResponseModel
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
