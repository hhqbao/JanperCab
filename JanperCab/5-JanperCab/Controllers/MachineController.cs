using _1_Domain;
using _3_Application.Interfaces.Repositories;
using _3_Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;

namespace _5_JanperCab.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MachineController : ControllerBase
    {
        private readonly IMachineFileGenerator _fileGenerator;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _config;

        public MachineController(IMachineFileGenerator fileGenerator, IUnitOfWork unitOfWork, UserManager<ApplicationUser> userManager, IConfiguration config)
        {
            _fileGenerator = fileGenerator;
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _config = config;
        }

        [Authorize(Roles = "Manufacturer")]
        [HttpPost("ExportIcb/{id}")]
        public async Task<IActionResult> ExportIcb(Guid id)
        {
            var currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);

            var order = await _unitOfWork.DuraformOrders.GetOrderAsync(id, currentUser.Customer);

            if (order == null)
                return BadRequest("Order Not Found!");

            await _fileGenerator.ExportICBFileAsync(order, _config.GetSection("AppSettings:IcbFileLocation").Value);

            return Ok();
        }
    }
}
