using CorvoBianco.Data;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Endpoints.GenreEndpoint.GetGenre
{
	[Route("Genre")]
	public class GetGenreEndpoint : MyBaseEndpoint<GetGenreRequest, GetGenreResponse>
	{
		private readonly DataContext _dataContext;

		public GetGenreEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}




		[HttpGet("GetGenres")]
		public override async Task<GetGenreResponse> Obradi([FromQuery] GetGenreRequest request, CancellationToken cancellationToken)
		{
			var genre = await _dataContext.Genres
				.OrderByDescending(g => g.Id)
				.Select(g => new GetGenreResponseModel()
				{
					Id = g.Id,
					Genre = g.GenreName,
					Books = g.Books
				})
				.ToListAsync(cancellationToken: cancellationToken);


			return new GetGenreResponse()
			{
				Genres = genre
			};
		}
	}
}
