using CorvoBianco.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace CorvoBianco.Data
{
	public class DataContext:DbContext
	{
		public DbSet<Book> Books { get; set; }
		public DbSet<Author> Authors { get; set; }
		public DbSet<Genre> Genres { get; set; }
		public DbSet<Series> Series { get; set; }
		public DbSet<Article> Articles { get; set; }
		public DbSet<AuthenticationToken> AuthenticationToken { get; set; }
		public DbSet<UserCertificate> UserCertificate { get; set; }
		public DbSet<User> Users { get; set; }
		public DbSet<Admin> Admins { get; set; }
		public DbSet<SystemLog> SystemLog { get; set; }
		public DbSet<WantToRead> WantToRead { get; set; }
		public DbSet<CurrentlyReading> CurrentlyReading { get; set; }
		public DbSet<Read> Read { get; set; }
		public DbSet<BookStatus> BookStatus { get; set; }
		public DbSet<UserRating> UserRatings { get; set; }
		public DbSet<Purchase> Purchases { get; set; }
		public DbSet<PurchaseInfo> PurchaseInfo { get; set; }

		public DataContext(DbContextOptions options) : base(options)
		{

		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{

			base.OnModelCreating(modelBuilder);

			foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
			{
				relationship.DeleteBehavior = DeleteBehavior.Restrict;
			}
		}
	}
}
