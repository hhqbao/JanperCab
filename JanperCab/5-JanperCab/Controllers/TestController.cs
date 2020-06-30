using _1_Domain;
using _3_Application.Dtos.DuraformOption;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace _5_JanperCab.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [HttpGet("GetType/{typeKey}")]
        public IActionResult GetType(DuraformOptionType.DuraformOptionTypeKey typeKey)
        {
            switch (typeKey)
            {
                case DuraformOptionType.DuraformOptionTypeKey.NoFaceRoute:
                    return Ok(typeof(DuraformOptionNoFaceDto).AssemblyQualifiedName);
                case DuraformOptionType.DuraformOptionTypeKey.DoubleSided:
                    return Ok(typeof(DuraformOptionDoubleSidedDto).AssemblyQualifiedName);
                case DuraformOptionType.DuraformOptionTypeKey.FoldBack:
                    return Ok(typeof(DuraformOptionFoldBackDto).AssemblyQualifiedName);
                case DuraformOptionType.DuraformOptionTypeKey.PaneFrame:
                    return Ok(typeof(DuraformOptionPaneFrameDto).AssemblyQualifiedName);
                default:
                    throw new ArgumentOutOfRangeException(nameof(typeKey), typeKey, null);
            }
        }

        [HttpPost("CreateOption")]
        public async Task<IActionResult> CreateOption(DuraformOptionDto option)
        {
            return Ok();
        }
    }
}
