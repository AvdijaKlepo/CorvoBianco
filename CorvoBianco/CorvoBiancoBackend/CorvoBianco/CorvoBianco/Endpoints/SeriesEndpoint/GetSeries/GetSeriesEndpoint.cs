using CorvoBianco.Data;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Endpoints.SeriesEndpoint.GetSeries
{
	public class GetSeriesEndpoint : MyBaseEndpoint<GetSeriesRequest, GetSeriesResponse>
	{
		private readonly DataContext _dataContext;

		public GetSeriesEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}

		[HttpGet("GetSeries")]
		public override async Task<GetSeriesResponse> Obradi([FromQuery] GetSeriesRequest request, CancellationToken cancellationToken)
		{
			var series = await _dataContext.Series
				.OrderByDescending(s => s.Id)
				.Select(s => new GetSeriesResponseModel()
				{
					Id = s.Id,
					SeriesName = s.SeriesName,
					Books = s.Books,
					

				})
				.ToListAsync(cancellationToken: cancellationToken);

			return new GetSeriesResponse()
			{
				Series = series
			};
		}
	}
}
