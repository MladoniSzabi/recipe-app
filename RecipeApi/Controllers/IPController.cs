using Microsoft.AspNetCore.Mvc;

namespace IPApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IPController : ControllerBase
    {

        public IPController() { }



        [HttpGet("")]
        public async Task<String> getIp()
        {
            return HttpContext.Connection.RemoteIpAddress.ToString();
        }
    }
}