using CorvoBianco.Data;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Endpoints.BookEndpoint.GetBookDetails
{
	[Microsoft.AspNetCore.Components.Route("Book")]
	public class GetBookDetailPageEndpoint : MyBaseEndpoint<int, GetBookDetailPageResponse>
	{
		private readonly DataContext _dataContext;

		public GetBookDetailPageEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}


		[HttpGet("GetBookDetails{id}")]
		public override async Task<GetBookDetailPageResponse> Obradi(int id, CancellationToken cancellationToken)
		{
			var bookDetails = await _dataContext.Books
				.Select(x => new GetBookDetailPageResponse()
				{
					Id = x.Id,
					Title = x.Title,
					AuthorId = x.AuthorId,
					Author = x.Author.FirstName + " " + x.Author.LastName,
					Rating = x.Rating,
					RatingCount = x.RatingCount,
					GenresId = x.GenreId,
					Genres = x.Genre.GenreName,
					Description = x.Description,
					PageCount = x.PageCount,
					SeriesId = x.SeriesId,
					Series = x.Series.SeriesName,
					Published = x.Published,
					BookCover = x.BookCover,
					AuthorBooks = x.Author.Books,
					AuthorBio = x.Author.Bio
				})
				.SingleAsync(x => x.Id == id, cancellationToken: cancellationToken);

			return bookDetails;
		}
	}
}
