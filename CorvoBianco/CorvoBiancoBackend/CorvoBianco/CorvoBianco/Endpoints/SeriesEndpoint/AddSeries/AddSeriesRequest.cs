namespace CorvoBianco.Endpoints.SeriesEndpoint.AddSeries
{
	public class AddSeriesRequest
	{
		public int Id { get; set; }

		public string SeriesName { get; set; }
		public int AuthorId { get; set; }
	}
}
