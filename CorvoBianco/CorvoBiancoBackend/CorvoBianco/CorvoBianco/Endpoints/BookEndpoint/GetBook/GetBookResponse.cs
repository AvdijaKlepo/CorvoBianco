namespace CorvoBianco.Endpoints.BookEndpoint.GetBook
{
	public class GetBookResponse
	{
		public List<GetBookResponseModel> Books { get; set; } = null!;
	}
	public class GetBookResponseModel
	{
		public int Id { get; set; }
		public string Title { get; set; } = null!;
		public string Author { get; set; }
		public string? Series { get; set; } = "N/A";
		public float? Rating { get; set; } = 0;
		public float? RatingCount { get; set; } = 0;

		public string BookCover { get; set; }
		public string Genre { get; set; }

	}
}
