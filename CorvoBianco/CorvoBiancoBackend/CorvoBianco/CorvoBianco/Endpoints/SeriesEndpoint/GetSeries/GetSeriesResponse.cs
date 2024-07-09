using CorvoBianco.Data.Models;

namespace CorvoBianco.Endpoints.SeriesEndpoint.GetSeries
{
	public class GetSeriesResponse
	{
		public List<GetSeriesResponseModel> Series { get; set; }
	}
}

public class GetSeriesResponseModel
{
	public int Id { get; set; }
	public string SeriesName { get; set; }
	public ICollection<Book> Books { get; set; }


}