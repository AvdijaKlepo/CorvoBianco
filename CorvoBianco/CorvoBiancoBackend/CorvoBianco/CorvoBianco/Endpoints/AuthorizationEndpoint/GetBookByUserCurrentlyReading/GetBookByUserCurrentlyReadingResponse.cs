namespace CorvoBianco.Endpoints.AuthorizationEndpoint.GetBookByUserCurrentlyReading
{
    public class GetBookByUserCurrentlyReadingResponse
    {
        public ICollection<GetBookByUserCurrentlyReadingResponseModel>? UserCurrentlyReading { get; set; }

    }
    public class GetBookByUserCurrentlyReadingResponseModel
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Author { get; set; } = null!;
        public string? Series { get; set; } = "N/A";
        public float? Rating { get; set; } = 0;
        public float? RatingCount { get; set; } = 0;
        public string? BookCover { get; set; }
        public string Genre { get; set; } = null!;
    }
}
