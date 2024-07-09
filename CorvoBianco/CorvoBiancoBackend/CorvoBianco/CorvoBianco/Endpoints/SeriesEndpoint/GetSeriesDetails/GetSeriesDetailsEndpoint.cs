using CorvoBianco.Data;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Endpoints.SeriesEndpoint.GetSeriesDetails
{
	public class GetSeriesDetailsEndpoint : MyBaseEndpoint<int, GetSeriesDetailsResponse>
	{
		private readonly DataContext _dataContext;

		public GetSeriesDetailsEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}

		[HttpGet("GetSeriesDetails{id}")]
		public override async Task<GetSeriesDetailsResponse> Obradi(int id, CancellationToken cancellationToken)
		{
			var seriesDetails = await _dataContext.Series
				.Select(x => new GetSeriesDetailsResponse()
				{
					Id = x.Id,
					SeriesName = x.SeriesName,
					Books = x.Books
				}).SingleAsync(x => x.Id == id, cancellationToken: cancellationToken);
			return seriesDetails;
		}
	}
}
