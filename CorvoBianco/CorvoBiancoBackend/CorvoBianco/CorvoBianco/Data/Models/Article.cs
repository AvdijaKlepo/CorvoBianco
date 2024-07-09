using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CorvoBianco.Data.Models
{
	[Table("Article")]
	public class Article
	{
		[Key]
		public int Id { get; set; }
		public string Title { get; set; }
		public string ArticlePreview { get; set; }
		public DateTime Posted { get; set; }
		public string ArticleImage { get; set; }
		public string ArticleDescription { get; set; }
		public List<Book> Books { get; set; } = new List<Book>();


	}
}
