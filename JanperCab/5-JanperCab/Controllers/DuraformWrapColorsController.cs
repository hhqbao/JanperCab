using _1_Domain;
using _3_Application.Dtos.DuraformWrapColor;
using _3_Application.Interfaces.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _5_JanperCab.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DuraformWrapColorsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public DuraformWrapColorsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var colors = await _unitOfWork.DuraformWrapColors.GetAllAsync();

            return Ok(_mapper.Map<List<DuraformWrapColor>, List<DuraformWrapColorForSelection>>(colors));
        }

        [HttpGet("ForDesign/{designId}")]
        public async Task<IActionResult> ForDoor(int designId)
        {
            var colors = await _unitOfWork.DuraformWrapColors.GetForDesignAsync(designId);

            return Ok(_mapper.Map<List<DuraformWrapColor>, List<DuraformWrapColorForSelection>>(colors));
        }
    }
}
