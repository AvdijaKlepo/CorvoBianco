using CorvoBianco.Data;
using CorvoBianco.Data.Models;
using CorvoBianco.Endpoints.BookEndpoint.GetBook;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Endpoints.AuthorizationEndpoint.GetBookByUser
{
	public class GetBookByUserEndpoint:MyBaseEndpoint<int,GetBookByUserResponse>
	{
		private readonly DataContext _dataContext;

		public GetBookByUserEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}
		[HttpGet("GetBookByUser{id}")]
		public override async Task<GetBookByUserResponse> Obradi(int id, CancellationToken cancellationToken)
		{
			var books = await _dataContext.WantToRead
				.Where(w => w.UserId == id)
				.OrderByDescending(w => w.Id)
				.Select(w => new GetBookByUserResponseModel
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

			return new GetBookByUserResponse { UserWantToRead = books };

		}
	}
}
