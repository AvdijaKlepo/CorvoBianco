using CorvoBianco.Data;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Endpoints.AuthorizationEndpoint.GetReviews
{
	public class GetReviewEndpoint:MyBaseEndpoint<NoRequest,GetReviewResponse>
	{
		private readonly DataContext _dataContext;

		public GetReviewEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}


		[HttpGet("GetReviews")]
		public override async Task<GetReviewResponse> Obradi([FromQuery]NoRequest request, CancellationToken cancellationToken)
		{
			var reviews = await _dataContext.UserRatings
				.Include(ur => ur.User)
				.Where(ur => ur.Review != null)
				.Select(ur => new GetReviewResponseModel()
				{
					Id = ur.Id,
					UserName = ur.User.Name,
					UserLastName = ur.User.LastName,
					Rating = ur.Rating,
					Review = ur.Review,
					User = ur.User,
					Book = ur.Book,
					BookSeries=ur.Book.Series.SeriesName,
					AuthorName = ur.Book.Author.FirstName+ " " +ur.Book.Author.LastName
				})
				.ToListAsync(cancellationToken);

			return new GetReviewResponse { Reviews = reviews };
		}
	}
}
