using CorvoBianco.Data;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;

namespace CorvoBianco.Endpoints.SeriesEndpoint.DeleteSeries
{
	public class DeleteSeriesEndpoint : MyBaseEndpoint<DeleteSeriesRequest, DeleteSeriesResponse>
	{
		private readonly DataContext _dataContext;

		public DeleteSeriesEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}
		[HttpDelete("DeleteSeries")]
		public override async Task<DeleteSeriesResponse> Obradi([FromQuery] DeleteSeriesRequest request, CancellationToken cancellationToken)
		{
			var series = _dataContext.Series.Find(request.SeriesId);
			if (series != null)
			{
				_dataContext.Remove(series);
				await _dataContext.SaveChangesAsync(cancellationToken);

				return new DeleteSeriesResponse()
				{
				};
			}

			throw new Exception("No Book was found with id = " + request.SeriesId);
		}
	}
}
