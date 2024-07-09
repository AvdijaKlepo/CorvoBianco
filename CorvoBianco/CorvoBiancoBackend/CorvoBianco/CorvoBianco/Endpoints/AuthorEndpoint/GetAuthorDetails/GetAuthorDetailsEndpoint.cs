using CorvoBianco.Data;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Endpoints.AuthorEndpoint.GetAuthorDetails
{
	public class GetAuthorDetailsEndpoint : MyBaseEndpoint<int, GetAuthorDetailsResponse>
	{
		private readonly DataContext _dataContext;

		public GetAuthorDetailsEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}
		[HttpGet("GetAuthorDetails{id}")]
		public override async Task<GetAuthorDetailsResponse> Obradi(int id, CancellationToken cancellationToken)
		{
			var authorDetails = await _dataContext.Authors
				.Include(author => author.Books)
				.Select(x => new GetAuthorDetailsResponse()
				{
					Id = x.Id,
					FirstName = x.FirstName,
					LastName = x.LastName,
					Bio = x.Bio,
					Born = x.Born,
					ProfilePicture = x.ProfilePicture,
					Books = x.Books
				})
				.SingleAsync(x => x.Id == id, cancellationToken: cancellationToken);
			return authorDetails;
		}
	}
}
