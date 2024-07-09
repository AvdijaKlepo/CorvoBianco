using CorvoBianco.Data.Models;

namespace CorvoBianco.Endpoints.ArticleEndpoint.GetArticleDetail
{
	public class GetArticleDetailResponse
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public string ArticlePreview { get; set; }
		public DateTime Posted { get; set; }
		public string ArticleImage { get; set; }
		public string ArticleDescription { get; set; }
		public List<Book> Books { get; set; }
		public string Author { get; set; }

	}
}
