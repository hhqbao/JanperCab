using _1_Domain;
using _3_Application.Dtos.Auth;
using _3_Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace _5_JanperCab.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly UserManager<ApplicationUser> _userManager;

        public AuthController(IAuthService authService, UserManager<ApplicationUser> userManager)
        {
            _authService = authService;
            _userManager = userManager;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserForLogin modelDto)
        {
            try
            {
                var userToken = await _authService.Login(modelDto.Email, modelDto.Password);

                return Ok(userToken);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [Authorize]
        [HttpPut("ChangePassword")]
        public async Task<IActionResult> ChangePassword(ChangePasswordViewModel model)
        {
            var user = await _userManager.FindByEmailAsync(User.Identity.Name);

            if (user == null)
                return BadRequest("user Not Found");

            var result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);

            if (!result.Succeeded) return BadRequest("Change Password Failed");

            var userToken = await _authService.Login(user.Email, model.NewPassword);

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
