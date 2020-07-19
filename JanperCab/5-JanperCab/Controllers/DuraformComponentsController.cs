using _3_Application.Dtos.DuraformComponent;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace _5_JanperCab.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DuraformComponentsController : ControllerBase
    {
        [HttpGet("GetTypes")]
        public IActionResult GetTypes()
        {
            var types = new List<DuraformComponentTypeDto>
            {
                new DuraformComponentTypeDto{Id = ComponentType.DuraformDoor, Type = typeof(DuraformDoorDto).AssemblyQualifiedName},
                new DuraformComponentTypeDto{Id = ComponentType.DuraformPantryDoor, Type = typeof(DuraformPantryDoorDto).AssemblyQualifiedName},
                new DuraformComponentTypeDto{Id = ComponentType.DuraformEndPanel, Type = typeof(DuraformEndPanelDto).AssemblyQualifiedName},
                new DuraformComponentTypeDto{Id = ComponentType.DuraformDrawer, Type = typeof(DuraformDrawerDto).AssemblyQualifiedName},
            };

            return Ok(types);
        }
    }
}
