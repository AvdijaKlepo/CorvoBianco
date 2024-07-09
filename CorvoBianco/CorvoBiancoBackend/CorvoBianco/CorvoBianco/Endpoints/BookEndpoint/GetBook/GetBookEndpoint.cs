using CorvoBianco.Data;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Endpoints.BookEndpoint.GetBook
{
	public class GetBookEndpoint:MyBaseEndpoint<GetBookRequest,GetBookResponse>
	{
		private readonly DataContext _dataContext;

		public GetBookEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}
		[HttpGet("GetBook")]
		public override async Task<GetBookResponse> Obradi([FromQuery]GetBookRequest request, CancellationToken cancellationToken)
		{
			var book = await _dataContext.Books
				.OrderByDescending(x => x.Id)
				.Select(x => new GetBookResponseModel()
				{
					Id = x.Id,
					Title = x.Title,
					Author = x.Author.FirstName + " " + x.Author.LastName,
					Series = x.Series.SeriesName,
					Rating = x.Rating,
					RatingCount = x.RatingCount,
					BookCover = x.BookCover,
					Genre = x.Genre.GenreName



				})
				.ToListAsync(cancellationToken: cancellationToken);
			return new GetBookResponse()
			{
				Books = book
			};
		}
	}
}
