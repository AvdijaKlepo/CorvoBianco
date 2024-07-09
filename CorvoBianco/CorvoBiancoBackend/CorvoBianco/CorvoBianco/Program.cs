using CorvoBianco.Data;
using CorvoBianco.SignalR;
using Microsoft.EntityFrameworkCore;


var config = new ConfigurationBuilder()
	.AddJsonFile("appsettings.json", false)
	.Build();

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<DataContext>(options =>
	options.UseSqlServer(config.GetConnectionString("DefaultConnection")));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseCors(
	options => options
		.WithOrigins("http://localhost:4200")
		.SetIsOriginAllowed(x => _ = true)
		.AllowAnyMethod()
		.AllowAnyHeader()
		.AllowCredentials()
);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.MapHub<SignalR>("/hub-putanja");

app.Run();
