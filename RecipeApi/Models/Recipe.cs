using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RecipeApi.Models;

public class RecipeWithVotes
{
    public RecipeItem Recipe { get; set; }
    public int VoteCount { get; set; }

    public RecipeWithVotes(RecipeItem _recipe, int _count) => (Recipe, VoteCount) = (_recipe, _count);
}

public class Vote
{
    public long Id { get; set; }
    [ForeignKey("RecipeItem")]
    public RecipeItem Recipe { get; set; }
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
}