using CorvoBianco.Data;
using CorvoBianco.Data.Models;
using CorvoBianco.Helper;
using CorvoBianco.Helper.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SkiaSharp;

namespace CorvoBianco.Endpoints.ArticleEndpoint.AddArticle
{
	public class AddArticleEndpoint : MyBaseEndpoint<AddArticleRequest, int>
	{
		private readonly DataContext _dataContext;

		public AddArticleEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}
		[HttpPost("AddArticle")]
		public override async Task<int> Obradi([FromBody] AddArticleRequest request, CancellationToken cancellationToken)
		{
			Article? article;
			if (request.Id == 0)
			{
				article = new Article();
				_dataContext.Add(article);
				article.Title = request.Title;
				article.ArticleDescription = request.ArticleDescription;
				article.ArticlePreview = request.Preview;
				article.Posted = request.Posted;
				article.ArticleImage = Config.NoCoverImage;
			}
			else
			{
				article = await _dataContext.Articles.Include(a => a.Books).FirstOrDefaultAsync(b => b.Id == request.Id);

				if (article == null)
				{
					throw new Exception("Pogresan ID");
				}
			}

			article.Title = request.Title;
			article.ArticleDescription = request.ArticleDescription;
			article.ArticlePreview = request.Preview;
			article.Posted = request.Posted;

			// Handle book associations
			article.Books.Clear();
			var books = await _dataContext.Books.Where(b => request.BookIds.Contains(b.Id)).ToListAsync();
			article.Books.AddRange(books);

			if (!string.IsNullOrEmpty(request.ArticleImage))
			{
				byte[]? slika_bajtovi = request.ArticleImage?.ParsirajBase64();

				if (slika_bajtovi == null)
					throw new Exception("pogresan base64 format");

				byte[]? slika_bajtovi_resized_velika = resize(slika_bajtovi, 1000);
				if (slika_bajtovi_resized_velika == null)
					throw new Exception("pogresan format slike");

				var folderPath = "ArticleImages";
				if (!Directory.Exists(folderPath))
				{
					Directory.CreateDirectory(folderPath);
				}

				await System.IO.File.WriteAllBytesAsync($"{folderPath}/ArticleId{request.Id}.jpg", slika_bajtovi_resized_velika, cancellationToken);
			}

			await _dataContext.SaveChangesAsync(cancellationToken);

			return article.Id;
		}
	
		public static byte[]? resize(byte[] slikaBajtovi, int size, int quality = 75)
		{
			using var input = new MemoryStream(slikaBajtovi);
			using var inputStream = new SKManagedStream(input);
			using var original = SKBitmap.Decode(inputStream);
			int width, height;
			if (original.Width > original.Height)
			{
				width = size;
				height = original.Height * size / original.Width;
			}
			else
			{
				width = original.Width * size / original.Height;
				height = size;
			}

			using var resized = original
				.Resize(new SKImageInfo(width, height), SKBitmapResizeMethod.Lanczos3);
			if (resized == null) return null;

			using var image = SKImage.FromBitmap(resized);
			return image.Encode(SKEncodedImageFormat.Jpeg, quality)
				.ToArray();
		}
	}
}
