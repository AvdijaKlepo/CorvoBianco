namespace CorvoBianco.Data.Models
{
	public class User:UserCertificate
	{
		public string Name { get; set; }
		public string LastName { get; set; }
		public DateTime BirthDate { get; set; }
		public string? ProfileImage { get; set; }
		public ICollection<WantToRead>? WantToReadBooks { get; set; } = new List<WantToRead>();
		public ICollection<CurrentlyReading>? CurrentlyReadingBooks { get; set; } = new List<CurrentlyReading>();
		public ICollection<Read>? ReadBooks { get; set; } = new List<Read>();
		public ICollection<BookStatus>? BookStatuses { get; set; } = new List<BookStatus>();
		public ICollection<UserRating> UserRatings { get; set; } = new List<UserRating>();

	}
}
