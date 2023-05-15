using Microsoft.EntityFrameworkCore;
using RecipeApi.Models;
using Microsoft.Data.Sqlite;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// RelationalDatabaseFacadeExtensions.SetDbConnection(Microsoft.EntityFrameworkCore.Sqlite, System.Data.Common.DbConnection)
// RelationalDatabaseFacadeExtensions.SetConnectionString(Microsoft.EntityFrameworkCore.Infrastructure.DatabaseFacade, string)

// SqliteConnection conn = new SqliteConnection();
// var connectionString = new SqliteConnectionStringBuilder(conn.ConnectionString)
// {
//     DataSource = "db.db",
//     Cache = SqliteCacheMode.Shared,
//     Mode = SqliteOpenMode.ReadWriteCreate,
// }.ToString();
// conn.ConnectionString = connectionString;
// RelationalDatabaseFacadeExtensions.SetDbConnection(Microsoft.EntityFrameworkCore.Sqlite, conn);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddDbContext<RecipeContext>(opt => opt.UseSqlite("Data Source=db.db"));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHttpsRedirection();
}

app.UseAuthorization();

app.UseHttpLogging();

app.MapControllers();

app.Run();
