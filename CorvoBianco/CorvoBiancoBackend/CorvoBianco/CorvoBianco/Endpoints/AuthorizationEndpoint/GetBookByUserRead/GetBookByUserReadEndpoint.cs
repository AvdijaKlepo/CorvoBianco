using CorvoBianco.Data;
using CorvoBianco.Endpoints.AuthorizationEndpoint.GetBookByUserCurrentlyReading;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Endpoints.AuthorizationEndpoint.GetBookByUserRead
{
	public class GetBookByUserReadEndpoint:MyBaseEndpoint<int,GetBookByUserReadResponse>
	{
		private readonly DataContext _dataContext;

		public GetBookByUserReadEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}
		[HttpGet("Read{id}")]
		public override async Task<GetBookByUserReadResponse> Obradi(int id, CancellationToken cancellationToken)
		{
			var books = await _dataContext.Read
				.Where(w => w.UserId == id)
				.OrderByDescending(w => w.Id)
				.Select(w => new GetBookByUserReadResponseModel()
				{
					Id = w.Book.Id,
					Title = w.Book.Title,
					Author = $"{w.Book.Author.FirstName} {w.Book.Author.LastName}",
					BookCover = w.Book.BookCover,
					Genre = w.Book.Genre.GenreName,
					Rating = w.Book.Rating,
					RatingCount = w.Book.RatingCount,
					Series = w.Book.Series.SeriesName
				})
				.ToListAsync(cancellationToken);

			return new GetBookByUserReadResponse { UserRead = books };
		}
	}
}
