using CorvoBianco.Data.Models;

namespace CorvoBianco.Endpoints.SeriesEndpoint.GetSeriesDetails
{
	public class GetSeriesDetailsResponse
	{
		public int Id { get; set; }
		public string SeriesName { get; set; }
		public int NumberOfBooks { get; set; }
		public ICollection<Book> Books { get; set; }

		public string AuthorName { get; set; }
	}
}
