using _1_Domain;
using _3_Application.Dtos.DuraformPriceGrid;
using _3_Application.Interfaces.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace _5_JanperCab.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DuraformPricesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public DuraformPricesController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet("{finishId}/{serieId}")]
        public async Task<IActionResult> GetPressPrice(int finishId, int serieId)
        {
            if (!await _unitOfWork.DuraformWrapTypes.AnyAsync(x => x.Id == finishId))
                return BadRequest("Duraform Finish Not Found! Invalid Finish Id");

            if (!await _unitOfWork.DuraformSeries.AnyAsync(x => x.Id == serieId))
                return BadRequest("Duraform Serie Not Found! Invalid Serie Id");

            var prices = await _unitOfWork.DuraformPrices.GetPressPriceGridAsync(finishId, serieId);

            return Ok(_mapper.Map<List<DuraformWrapPriceGrid>, List<DuraformWrapPriceGridDto>>(prices));
        }

        [HttpGet("{serieId}")]
        public async Task<IActionResult> GetRouteOnlyPrice(int serieId)
        {
            if (!await _unitOfWork.DuraformSeries.AnyAsync(x => x.Id == serieId))
                return BadRequest("Duraform Serie Not Found! Invalid Serie Id");

            var prices = await _unitOfWork.DuraformPrices.GetRouteOnlyPriceGridAsync(serieId);

            return Ok(_mapper.Map<List<DuraformRouteOnlyPriceGrid>, List<DuraformRouteOnlyPriceGridDto>>(prices));
        }

        [HttpPost("SavePriceGrids")]
        public async Task<IActionResult> SavePriceGrids(List<DuraformPriceGridDto> priceGridDtos)
        {
            try
            {
                var priceGrids = _mapper.Map<List<DuraformPriceGridDto>, List<DuraformPriceGrid>>(priceGridDtos);

                await _unitOfWork.DuraformPrices.SavePriceGridsAsync(priceGrids);

                await _unitOfWork.CompleteAsync();

                return Ok(_mapper.Map<List<DuraformPriceGrid>, List<DuraformPriceGridDto>>(priceGrids));
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }

        }
    }
}
