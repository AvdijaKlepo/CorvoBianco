using CorvoBianco.Data.Models;
using CorvoBianco.Data;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;

namespace CorvoBianco.Endpoints.GenreEndpoint.AddGenre
{
	public class AddGenreEndpoint : MyBaseEndpoint<AddGenreRequest, int>
	{
		private readonly DataContext _dataContext;

		public AddGenreEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}


		[HttpPost("AddGenre")]
		public override async Task<int> Obradi([FromBody] AddGenreRequest request, CancellationToken cancellationToken)
		{
			var genre = new Genre()
			{
				GenreName = request.GenreName
			};
			await _dataContext.AddAsync(genre);
			await _dataContext.SaveChangesAsync(cancellationToken);

			return genre.Id;




		}
	}
}
