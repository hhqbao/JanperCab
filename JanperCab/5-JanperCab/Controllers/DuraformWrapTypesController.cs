using _1_Domain;
using _3_Application.Dtos.DuraformWrapType;
using _3_Application.Interfaces.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _5_JanperCab.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DuraformWrapTypesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public DuraformWrapTypesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var types = await _unitOfWork.DuraformWrapTypes.GetAllAsync();

            return Ok(_mapper.Map<List<DuraformWrapType>, List<DuraformWrapTypeForSelection>>(types));
        }

        [HttpGet("ForDesign/{designId}")]
        public async Task<IActionResult> ForDesign(int designId)
        {
            var types = await _unitOfWork.DuraformWrapTypes.GetForDesignAsync(designId);

            return Ok(_mapper.Map<List<DuraformWrapType>, List<DuraformWrapTypeForSelection>>(types));
        }
    }
}
