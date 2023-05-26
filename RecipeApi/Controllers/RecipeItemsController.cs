using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RecipeApi.Models;
using System.Data;

class User
{
    public String? UserId { set; get; }
}

namespace RecipeApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class RecipeItemsController : ControllerBase
    {
        private readonly RecipeContext _context;

        public RecipeItemsController(RecipeContext context)
        {
            _context = context;
        }

        [HttpGet("votes/{userid}")]
        public async Task<ActionResult<IEnumerable<long>>> GetMyVotes(String userid)
        {
            var result = _context.Votes.Where<Vote>(vote => vote.User == userid).Where<Vote>(vote => vote.Created > DateTime.Now.Date).Select(vote => vote.Recipe.Id);
            return await result.ToListAsync();
        }

        [HttpPost("vote/{id}")]
        public async Task<ActionResult<Vote>> VoteForRecipe(long id)
        {
            var user = await Request.ReadFromJsonAsync<User>();
            if (user == null || user.UserId == null || user.UserId == "")
            {
                return this.BadRequest(new { message = "You must provide a User", user = user });
            }
            var recipeItem = await _context.RecipeItems.FindAsync(id);

            if (recipeItem == null)
            {
                return NotFound();
            }

            Vote v = new Vote();
            v.Recipe = recipeItem;
            v.User = user.UserId;
            v.Created = DateTime.Now;
            _context.Votes.Add(v);
            await _context.SaveChangesAsync();

            return await _context.Votes.FindAsync(v.Id);
        }

        // GET: api/RecipeItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RecipeWithVotes>>> GetRecipeItems()
        {
            var results = from recipe in _context.RecipeItems
                          join vote in _context.Votes on recipe equals vote.Recipe into votes
                          from vote in votes.DefaultIfEmpty()
                          group vote by recipe into recipeGroup
                          select new RecipeWithVotes(recipeGroup.Key, recipeGroup.Count(v => v != null));

            return await results.ToListAsync();
        }

        // GET: api/RecipeItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RecipeItem>> GetRecipeItem(long id)
        {
            var recipeItem = await _context.RecipeItems.FindAsync(id);

            if (recipeItem == null)
            {
                return NotFound();
            }

            return recipeItem;
        }

        // PUT: api/RecipeItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecipeItem(long id, RecipeItem recipeItem)
        {
            if (id != recipeItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(recipeItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecipeItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/RecipeItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RecipeItem>> PostRecipeItem(RecipeItem recipeItem)
        {
            _context.RecipeItems.Add(recipeItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRecipeItem), new { id = recipeItem.Id }, recipeItem);
        }

        // DELETE: api/RecipeItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecipeItem(long id)
        {
            var recipeItem = await _context.RecipeItems.FindAsync(id);
            if (recipeItem == null)
            {
                return NotFound();
            }

            _context.RecipeItems.Remove(recipeItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RecipeItemExists(long id)
        {
            return _context.RecipeItems.Any(e => e.Id == id);
        }
    }
}
