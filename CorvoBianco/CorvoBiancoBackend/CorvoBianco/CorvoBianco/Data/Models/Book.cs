using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CorvoBianco.Data.Models
{
	[Table("Book")]
	public class Book
	{
		[Key] public int Id { get; set; }
		public string Title { get; set; } = null!;
		[ForeignKey(nameof(Author))]
		[InverseProperty("Books")]
		public int AuthorId { get; set; }

		public Author Author { get; set; }

		public float? Rating { get; set; } = 0;
		public float? RatingCount { get; set; } = 0;
		public string Description { get; set; } = null!;
		public int PageCount { get; set; } = 0;
		public DateTime Published { get; set; }
		public string? BookCover { get; set; }
		[ForeignKey(nameof(Genre))]
		[InverseProperty("Books")]
		public int GenreId { get; set; }
		public Genre Genre { get; set; }
		[ForeignKey(nameof(Series))]
		[InverseProperty("Books")]
		public int? SeriesId { get; set; }
		public Series? Series { get; set; }
		public ICollection<WantToRead>? UserWantToRead { get; set; } = new List<WantToRead>();
		public ICollection<CurrentlyReading>? UserCurrentlyReading { get; set; } = new List<CurrentlyReading>();
		public ICollection<Read>? UserRead { get; set; } = new List<Read>();
		public ICollection<UserRating>? UserRatings { get; set; } = new List<UserRating>();
		public bool? IsPurchased { get; set; } = false;
		public void AddRating(float rating)
		{
			Rating = ((Rating * RatingCount) + rating) / (RatingCount + 1);
			RatingCount++;
		}

	}
}
