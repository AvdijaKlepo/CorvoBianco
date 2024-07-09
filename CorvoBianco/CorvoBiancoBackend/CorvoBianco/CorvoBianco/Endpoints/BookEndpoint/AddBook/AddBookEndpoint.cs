using CorvoBianco.Data;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;
using SkiaSharp;

namespace CorvoBianco.Endpoints.BookEndpoint.AddBook
{
	public class AddBookEndpoint:MyBaseEndpoint<AddBookRequest,int>
	{
		private readonly DataContext _dataContext;

		public AddBookEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}
		[HttpPost("AddBook")]
		public override async Task<int> Obradi(AddBookRequest request, CancellationToken cancellationToken)
		{
			Data.Models.Book? book;
			if (request.Id == 0)
			{
				book = new Data.Models.Book();
				_dataContext.Add(book);
				book.BookCover = Config.NoCoverImage;
			}
			else
			{
				book = _dataContext.Books.FirstOrDefault(b => b.Id == request.Id);
				if (book == null)
				{
					throw new Exception("Pogresan ID");
				}
			}

			book.Title = request.Title;
			book.AuthorId = request.AuthorId;
			book.SeriesId = request.Series;
			book.Description = request.Description;
			book.GenreId = request.GenreId;
			book.PageCount = request.PageCount;
			book.Published = request.Published;
			//book.BookCover = Config.NoCoverImage;
			if (!string.IsNullOrEmpty(request.BookCover))
			{
				byte[]? slika_bajtovi = request.BookCover?.ParsirajBase64();

				if (slika_bajtovi == null)
					throw new Exception("pogresan base64 format");

				byte[]? slika_bajtovi_resized_velika = resize(slika_bajtovi, 1000);
				if (slika_bajtovi_resized_velika == null)
					throw new Exception("pogresan format slike");


				var folderPath = "BookCovers";
				if (!Directory.Exists(folderPath))
				{
					// Create the folder if it does not exist
					Directory.CreateDirectory(folderPath);
				}

				await System.IO.File.WriteAllBytesAsync($"{folderPath}/BookId{request.Id}.jpg", slika_bajtovi_resized_velika, cancellationToken);


				//1- file system od web servera ili neki treci servis kao sto je azure blob store ili aws 
			}


			await _dataContext.SaveChangesAsync(cancellationToken);


			return book.Id;
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
