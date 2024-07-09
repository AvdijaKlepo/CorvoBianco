using CorvoBianco.Data;
using CorvoBianco.Data.Models;
using CorvoBianco.Helper;
using CorvoBianco.Helper.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkiaSharp;

namespace CorvoBianco.Endpoints.AuthorizationEndpoint.Register
{
	public class RegisterEndpoint:MyBaseEndpoint<RegisterRequest,int>
	{
		private readonly DataContext _dataContexte;

		public RegisterEndpoint(DataContext dataContexte)
		{
			_dataContexte = dataContexte;
		}

		[HttpPost("Register")]
		public override async Task<int> Obradi(RegisterRequest request, CancellationToken cancellationToken)
		{
			User? newUser;
			if (request.Id == 0)
			{
				newUser = new User();
				_dataContexte.Add(newUser);
				newUser.Name = request.Name;
				newUser.LastName = request.LastName;
				newUser.BirthDate = request.BirthDate;
				newUser.ProfileImage = Config.NoAuthorImage;
				newUser.Password = request.Password;
				newUser.Username = request.Username;
			}
			else
			{
				newUser = _dataContexte.Users.FirstOrDefault(a => a.Id == request.Id);
				if (newUser == null)
				{
					throw new Exception("Wrong Id");
				}
			}
			newUser.Name = request.Name;
			newUser.LastName = request.LastName;
			newUser.BirthDate = request.BirthDate;
			newUser.Password = request.Password;
			newUser.Username = request.Username;
			if (!string.IsNullOrEmpty(request.ProfileImage))
			{
				byte[]? slika_bajtovi = request.ProfileImage?.ParsirajBase64();

				if (slika_bajtovi == null)
					throw new Exception("pogresan base64 format");

				byte[]? slika_bajtovi_resized_velika = resize(slika_bajtovi, 1000);
				if (slika_bajtovi_resized_velika == null)
					throw new Exception("pogresan format slike");


				var folderPath = "ProfilePicture";
				if (!Directory.Exists(folderPath))
				{
					// Create the folder if it does not exist
					Directory.CreateDirectory(folderPath);
				}

				await System.IO.File.WriteAllBytesAsync($"{folderPath}/ProfilePicture{request.Id}.jpg", slika_bajtovi_resized_velika, cancellationToken);


				//1- file system od web servera ili neki treci servis kao sto je azure blob store ili aws 
			}


			await _dataContexte.SaveChangesAsync(cancellationToken);


			return newUser.Id;
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
