using CorvoBianco.Endpoints.AuthorizationEndpoint.GetBookByUserCurrentlyReading;

namespace CorvoBianco.Endpoints.AuthorizationEndpoint.GetBookByUserRead
{
	public class GetBookByUserReadResponse
	{
		public ICollection<GetBookByUserReadResponseModel>? UserRead { get; set; }
	}
	public class GetBookByUserReadResponseModel
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
