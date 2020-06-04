using _1_Domain;
using _3_Application.Dtos.DuraformEdgeProfile;
using _3_Application.Interfaces.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _5_JanperCab.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DuraformEdgeProfilesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public DuraformEdgeProfilesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var profiles = await _unitOfWork.DuraformEdgeProfiles.GetAllAsync();

            return Ok(_mapper.Map<List<DuraformEdgeProfile>, List<DuraformEdgeProfileForList>>(profiles));
        }
    }
}
