using CorvoBianco.Data;
using CorvoBianco.Data.Models;
using CorvoBianco.Helper;
using Microsoft.AspNetCore.Mvc;
using SkiaSharp;

namespace CorvoBianco.Endpoints.AuthorEndpoints.AddAuthor
{
    public class AddAuthorEndpoint:MyBaseEndpoint<AddAuthorRequest,int>
	{
		private readonly DataContext _dataContext;

		public AddAuthorEndpoint(DataContext dataContext)
		{
			_dataContext = dataContext;
		}
		[HttpPost("AddAuthor")]
		public override async Task<int> Obradi(AddAuthorRequest request, CancellationToken cancellationToken)
		{
			Author? author;
			if (request.Id == 0)
			{
				author = new Author();
				_dataContext.Add(author);
				author.FirstName = request.FirstName;
				author.LastName = request.LastName;
				author.Bio = request.Bio;
				author.ProfilePicture = Config.NoAuthorImage;
				author.Born = request.Born;
			}
			else
			{
				author = _dataContext.Authors.FirstOrDefault(a => a.Id == request.Id);
				if (author == null)
				{
					throw new Exception("Wrong Id");
				}
			}
			author.FirstName = request.FirstName;
			author.LastName = request.LastName;
			author.Bio = request.Bio;
			author.Born = request.Born;
			if (!string.IsNullOrEmpty(request.ProfilePicture))
			{
				byte[]? slika_bajtovi = request.ProfilePicture?.ParsirajBase64();

				if (slika_bajtovi == null)
					throw new Exception("pogresan base64 format");

				byte[]? slikaBajtoviResizedVelika = resize(slika_bajtovi, 1000);
				if (slikaBajtoviResizedVelika == null)
					throw new Exception("pogresan format slike");


				var folderPath = "AuthorImages";
				if (!Directory.Exists(folderPath))
				{
					// Create the folder if it does not exist
					Directory.CreateDirectory(folderPath);
				}

				await System.IO.File.WriteAllBytesAsync($"{folderPath}/AuthorId{request.Id}.jpg", slikaBajtoviResizedVelika, cancellationToken);


				//1- file system od web servera ili neki treci servis kao sto je azure blob store ili aws 
			}
			await _dataContext.SaveChangesAsync(cancellationToken);


			return author.Id;
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
