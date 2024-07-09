using CorvoBianco.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Endpoints.AuthorizationEndpoint.AddBookReview
{
	public class AddBookReviewEndpoint:ControllerBase
	{
		private readonly DataContext _dataContext;

		public AddBookReviewEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}
		[HttpPost("{bookId}/add/{userId}/review")]
		public async Task<IActionResult> SubmitReview(int bookId, int userId, [FromBody] ReviewRequest reviewRequest)
		{
			var userRating = await _dataContext.UserRatings.FirstOrDefaultAsync(ur => ur.BookId == bookId && ur.UserId == userId);

			if (userRating == null)
			{
				return NotFound("Rating not found");
			}

			userRating.Review = reviewRequest.Review;
			await _dataContext.SaveChangesAsync();

			return Ok();
		}

		public class ReviewRequest
		{
			public string Review { get; set; }
		}
	}
}
