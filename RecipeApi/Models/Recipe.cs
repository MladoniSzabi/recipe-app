using System.ComponentModel.DataAnnotations.Schema;

namespace RecipeApi.Models;

public class Ingerdient
{
    public int Id { get; set; }
    public String Name { get; set; }
    public String Quantity { get; set; }

    [ForeignKey("RecipeItem")]
    public RecipeItem Recipe { get; set; }

}

public class RecipeItem
{
    public long Id { get; set; }
    public String Name { get; set; }
    public String Ingredient { get; set; }
    public String Method { get; set; }
}