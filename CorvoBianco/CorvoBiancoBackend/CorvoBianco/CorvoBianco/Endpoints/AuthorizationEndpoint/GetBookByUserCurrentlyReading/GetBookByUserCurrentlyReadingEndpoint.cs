using CorvoBianco.Data;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Endpoints.AuthorizationEndpoint.GetBookByUserCurrentlyReading
{
    public class GetBookByUserCurrentlyReadingEndpoint : MyBaseEndpoint<int, GetBookByUserCurrentlyReadingResponse>
    {
        private readonly DataContext _dataContext;

        public GetBookByUserCurrentlyReadingEndpoint(DataContext dataContext)
        {
            _dataContext = dataContext;
        }
        [HttpGet("CurrentlyReading{id}")]
        public override async Task<GetBookByUserCurrentlyReadingResponse> Obradi(int id, CancellationToken cancellationToken)
        {
            var books = await _dataContext.CurrentlyReading
                .Where(w => w.UserId == id)
                .OrderByDescending(w => w.Id)
                .Select(w => new GetBookByUserCurrentlyReadingResponseModel
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

            return new GetBookByUserCurrentlyReadingResponse { UserCurrentlyReading = books };
        }
    }
}
