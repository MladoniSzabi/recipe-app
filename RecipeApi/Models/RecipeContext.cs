using Microsoft.EntityFrameworkCore;

namespace RecipeApi.Models;

public class RecipeContext : DbContext
{
    public RecipeContext(DbContextOptions<RecipeContext> options) : base(options) { }

    public DbSet<RecipeItem> RecipeItems { get; set; } = null!;
    public DbSet<Vote> Votes { get; set; } = null!;
}