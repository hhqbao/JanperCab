using _3_Application.Dtos.Auth;
using _3_Application.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace _5_JanperCab.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserForLogin modelDto)
        {
            var userToken = await _authService.Login(modelDto.Email, modelDto.Password);

            return Ok(userToken);
        }

        //[HttpPost("Register")]
        //public async Task<IActionResult> Register(UserForRegister modelDto)
        //{
        //    var user = await _authService.Register(modelDto);

        //    var userToken = await _authService.Login(user.Email, modelDto.Password);

        //    return Ok(userToken);
        //}
    }
}
