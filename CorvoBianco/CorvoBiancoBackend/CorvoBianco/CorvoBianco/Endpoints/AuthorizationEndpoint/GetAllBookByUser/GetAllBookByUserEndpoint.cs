using CorvoBianco.Data;
using CorvoBianco.Endpoints.AuthorizationEndpoint.GetBookByUser;
using CorvoBianco.Endpoints.AuthorizationEndpoint.GetBookByUserCurrentlyReading;
using CorvoBianco.Endpoints.AuthorizationEndpoint.GetBookByUserRead;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Endpoints.AuthorizationEndpoint.GetAllBookByUser
{
	public class GetAllBookByUserEndpoint:MyBaseEndpoint<int,GetAllBookByUserResponse>
	{
		private readonly DataContext _dataContext;

		public GetAllBookByUserEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}
		[HttpGet("GetAllBooksUser{id}")]
		public override async Task<GetAllBookByUserResponse> Obradi(int id, CancellationToken cancellationToken)
		{
			var wantToReadBooks = await _dataContext.WantToRead
				.Where(w => w.UserId == id)
				.OrderByDescending(w => w.Id)
				.Select(w => new GetAllBookByUserResponseModel
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

			var currentlyReadingBooks = await _dataContext.CurrentlyReading
				.Where(w => w.UserId == id)
				.OrderByDescending(w => w.Id)
				.Select(w => new GetAllBookByUserResponseModel
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

			var readBooks = await _dataContext.Read
				.Where(w => w.UserId == id)
				.OrderByDescending(w => w.Id)
				.Select(w => new GetAllBookByUserResponseModel()
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

			var allBooks = new List<GetAllBookByUserResponseModel>();
			allBooks.AddRange(wantToReadBooks);
			allBooks.AddRange(readBooks);
			allBooks.AddRange(currentlyReadingBooks);
			return new GetAllBookByUserResponse() { AllUserBooks = allBooks };
		}
	}
}
