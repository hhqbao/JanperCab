using _1_Domain;
using _1_Domain.Enum;
using _3_Application.Dtos.DuraformMiscPrice;
using _3_Application.Dtos.DuraformPriceGrid;
using _3_Application.Interfaces.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
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

        [HttpGet("Grids")]
        public async Task<IActionResult> GetAllGrids()
        {
            var prices = await _unitOfWork.DuraformPrices.GetAllAsync();

            var model = new DuraformAllPriceModel<DuraformPriceGridDto> { Prices = _mapper.Map<List<DuraformPriceGrid>, List<DuraformPriceGridDto>>(prices) };

            return Ok(model);
        }

        [HttpGet("Miscs")]
        public async Task<IActionResult> GetAllMiscs()
        {
            var prices = await _unitOfWork.DuraformMiscPrices.GetAllAsync();

            var model = new DuraformAllPriceModel<DuraformMiscPriceDto> { Prices = _mapper.Map<List<DuraformMiscPrice>, List<DuraformMiscPriceDto>>(prices) };

            return Ok(model);
        }

        [HttpGet("Grids/{finishId}/{serieTypeEnum}")]
        public async Task<IActionResult> GetPressPrice(int finishId, DuraformSerieTypeEnum serieTypeEnum)
        {
            if (!await _unitOfWork.DuraformWrapTypes.AnyAsync(x => x.Id == finishId))
                return BadRequest("Duraform Finish Not Found! Invalid Finish Id");

            var series = await _unitOfWork.DuraformSeries.GetAllAsync(x => x.SerieTypeEnum == serieTypeEnum);

            if (series.FirstOrDefault() == null)
                return BadRequest("Duraform Serie Not Found! Invalid Serie Type");

            var prices = await _unitOfWork.DuraformPrices.GetPressPriceGridAsync(finishId, series.First().Id);

            return Ok(_mapper.Map<List<DuraformWrapPriceGrid>, List<DuraformWrapPriceGridDto>>(prices));
        }

        [HttpGet("Grids/{serieTypeEnum}")]
        public async Task<IActionResult> GetRouteOnlyPrice(DuraformSerieTypeEnum serieTypeEnum)
        {
            var series = await _unitOfWork.DuraformSeries.GetAllAsync(x => x.SerieTypeEnum == serieTypeEnum);

            if (series.FirstOrDefault() == null)
                return BadRequest("Duraform Serie Not Found! Invalid Serie Type");

            var prices = await _unitOfWork.DuraformPrices.GetRouteOnlyPriceGridAsync(series.First().Id);

            return Ok(_mapper.Map<List<DuraformRouteOnlyPriceGrid>, List<DuraformRouteOnlyPriceGridDto>>(prices));
        }

        [Authorize(Roles = "Sale")]
        [HttpPut("Grids")]
        public async Task<IActionResult> SavePriceGrids(List<DuraformPriceGridDto> priceGridDtos)
        {
            var priceGrids = _mapper.Map<List<DuraformPriceGridDto>, List<DuraformPriceGrid>>(priceGridDtos);

            await _unitOfWork.DuraformPrices.SavePriceGridsAsync(priceGrids);

            await _unitOfWork.CompleteAsync();

            return Ok(_mapper.Map<List<DuraformPriceGrid>, List<DuraformPriceGridDto>>(priceGrids));
        }
    }
}
