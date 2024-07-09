using CorvoBianco.Data;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Endpoints.AuthorEndpoints.GetAuthor
{
	public class GetAuthorEndpoint:MyBaseEndpoint<GetAuthorRequest,GetAuthorResponse>
	{
		private readonly DataContext _dataContext;

		public GetAuthorEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}
		[HttpGet("GetAuthors")]
		public override async Task<GetAuthorResponse> Obradi([FromQuery]GetAuthorRequest request, CancellationToken cancellationToken)
		{
			var author = await _dataContext.Authors
				.OrderByDescending(x => x.Id)
				.Include(a => a.Books)
				.Select(x => new GetAuthorResponseModel()
				{
					Id = x.Id,
					FirstName = x.FirstName,
					LastName = x.LastName,
					Bio = x.Bio,
					Born = x.Born,
					ProfilePicture = x.ProfilePicture,
					Books = x.Books
				})
				.ToListAsync(cancellationToken: cancellationToken);

			return new GetAuthorResponse()
			{
				Authors = author
			};
		}
	}
}
