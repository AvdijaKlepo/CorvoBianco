using CorvoBianco.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Endpoints.AuthorizationEndpoint.GetUserRating
{
	public class GetUserRatingEndpoint:ControllerBase
	{
		private readonly DataContext _dataContext;

		public GetUserRatingEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}
		[HttpGet("{bookId}/user-rating/{userId}")]
		public async Task<IActionResult> GetUserRating(int bookId, int userId)
		{
			var userRating = await _dataContext.UserRatings.FirstOrDefaultAsync(ur => ur.BookId == bookId && ur.UserId == userId);

			if (userRating == null)
			{
				return NotFound(new { message = "Rating not found" });
			}

			return Ok(new { rating = userRating.Rating });
		}
	}
}
