using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecipeApi.Models;

public class RecipeWithVotes
{
    public long RecipeId { get; set; }
    [Required(AllowEmptyStrings = false)]
    public String Name { get; set; }
    [Required(AllowEmptyStrings = false)]
    public String Ingredient { get; set; }
    [Required(AllowEmptyStrings = false)]
    public String Method { get; set; }
    public int VoteCount { get; set; }

    public RecipeWithVotes(RecipeItem _recipe, int _count)
    {
        RecipeId = _recipe.Id;
        Name = _recipe.Name;
        Ingredient = _recipe.Ingredient;
        Method = _recipe.Method;
        VoteCount = _count;
    }
}

public class Vote
{
    public long Id { get; set; }
    [ForeignKey("RecipeItem")]
    public RecipeItem Recipe { get; set; }
    public String User { get; set; }
    public DateTime Created
    {
        get
        {
            return this.created.HasValue
               ? this.created.Value
               : DateTime.Now;
        }

        set { this.created = value; }
    }

    private DateTime? created = null;
}

public class RecipeItem
{
    public long Id { get; set; }
    [Required(AllowEmptyStrings = false)]
    public String Name { get; set; }
    [Required(AllowEmptyStrings = false)]
    public String Ingredient { get; set; }
    [Required(AllowEmptyStrings = false)]
    public String Method { get; set; }
    public byte[]? Image { get; set; }
}

public class RecipeItemCreate
{
    public long Id { get; set; }
    [Required(AllowEmptyStrings = false)]
    public String Name { get; set; }
    [Required(AllowEmptyStrings = false)]
    public String Ingredient { get; set; }
    [Required(AllowEmptyStrings = false)]
    public String Method { get; set; }
    public IFormFile? Image { get; set; }

}