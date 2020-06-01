using _1_Domain;
using _3_Application.Dtos.DuraformDoor;
using _3_Application.Dtos.DuraformSerie;
using AutoMapper;

namespace _5_JanperCab.Helpers
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<DuraformSerie, DuraformSerieForList>();

            CreateMap<DuraformDoor, DuraformDoorForOrderMenu>();
        }
    }
}