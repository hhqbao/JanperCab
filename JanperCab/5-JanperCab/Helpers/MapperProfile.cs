using _1_Domain;
using _3_Application.Dtos.DuraformArch;
using _3_Application.Dtos.DuraformDesign;
using _3_Application.Dtos.DuraformDrawerType;
using _3_Application.Dtos.DuraformEdgeProfile;
using _3_Application.Dtos.DuraformOptionType;
using _3_Application.Dtos.DuraformSerie;
using _3_Application.Dtos.DuraformWrapColor;
using _3_Application.Dtos.DuraformWrapType;
using _3_Application.Dtos.PantryDoorChairRailType;
using AutoMapper;

namespace _5_JanperCab.Helpers
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<DuraformSerie, DuraformSerieForList>();

            CreateMap<DuraformDesign, DuraformDesignForOrderMenu>()
                .ForMember(
                    dest => dest.FixedEdgeProfileName,
                    opt => opt.MapFrom(src => src.FixedEdgeProfile.Name)
                )
                .ForMember(
                    dest => dest.DefaultEdgeProfileName,
                    opt => opt.MapFrom(src => src.DefaultEdgeProfile.Name)
                );

            CreateMap<DuraformWrapType, DuraformWrapTypeForSelection>();

            CreateMap<DuraformWrapColor, DuraformWrapColorForSelection>()
                .ForMember(
                    dest => dest.DuraformWrapTypeName,
                    opt => opt.MapFrom(src => src.DuraformWrapType.Name)
                );

            CreateMap<DuraformEdgeProfile, DuraformEdgeProfileForList>();
            CreateMap<DuraformArch, DuraformArchForList>();
            CreateMap<PantryDoorChairRailType, PantryDoorChairRailTypeForList>();
            CreateMap<DuraformDrawerType, DuraformDrawerTypeForList>();
            CreateMap<DuraformOptionType, DuraformOptionTypeDto>();
        }
    }
}