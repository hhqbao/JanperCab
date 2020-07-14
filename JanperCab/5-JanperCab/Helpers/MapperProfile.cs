using _1_Domain;
using _3_Application.Dtos.DuraformArch;
using _3_Application.Dtos.DuraformComponent;
using _3_Application.Dtos.DuraformDesign;
using _3_Application.Dtos.DuraformDrawerType;
using _3_Application.Dtos.DuraformEdgeProfile;
using _3_Application.Dtos.DuraformOption;
using _3_Application.Dtos.DuraformOptionType;
using _3_Application.Dtos.DuraformOrder;
using _3_Application.Dtos.DuraformSerie;
using _3_Application.Dtos.DuraformWrapColor;
using _3_Application.Dtos.DuraformWrapType;
using _3_Application.Dtos.HingeHoleOption;
using _3_Application.Dtos.HingeHoleType;
using _3_Application.Dtos.PantryDoorChairRailType;
using AutoMapper;
using AutoMapper.EquivalencyExpression;

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
            CreateMap<DuraformOptionTypeDto, DuraformOptionType>();

            CreateMap<DuraformOption, DuraformOptionDto>()
                .Include<DuraformOptionNoFace, DuraformOptionNoFaceDto>()
                .Include<DuraformOptionDoubleSided, DuraformOptionDoubleSidedDto>()
                .Include<DuraformOptionFoldBack, DuraformOptionFoldBackDto>()
                .Include<DuraformOptionPaneFrame, DuraformOptionPaneFrameDto>();
            CreateMap<DuraformOptionDto, DuraformOption>()
                .Include<DuraformOptionNoFaceDto, DuraformOptionNoFace>()
                .Include<DuraformOptionDoubleSidedDto, DuraformOptionDoubleSided>()
                .Include<DuraformOptionFoldBackDto, DuraformOptionFoldBack>()
                .Include<DuraformOptionPaneFrameDto, DuraformOptionPaneFrame>();

            CreateMap<DuraformOptionNoFace, DuraformOptionNoFaceDto>();
            CreateMap<DuraformOptionNoFaceDto, DuraformOptionNoFace>();

            CreateMap<DuraformOptionDoubleSided, DuraformOptionDoubleSidedDto>();
            CreateMap<DuraformOptionDoubleSidedDto, DuraformOptionDoubleSided>();

            CreateMap<DuraformOptionFoldBack, DuraformOptionFoldBackDto>();
            CreateMap<DuraformOptionFoldBackDto, DuraformOptionFoldBack>();

            CreateMap<DuraformOptionPaneFrame, DuraformOptionPaneFrameDto>();
            CreateMap<DuraformOptionPaneFrameDto, DuraformOptionPaneFrame>();

            CreateMap<HingeHoleType, HingeHoleTypeDto>();
            CreateMap<HingeHoleTypeDto, HingeHoleType>();

            CreateMap<HingeHoleOption, HingeHoleOptionDto>();
            CreateMap<HingeHoleOptionDto, HingeHoleOption>();

            CreateMap<DuraformComponent, DuraformComponentDto>()
                .Include<DuraformDoor, DuraformDoorDto>()
                .Include<DuraformPantryDoor, DuraformPantryDoorDto>()
                .Include<DuraformEndPanel, DuraformEndPanelDto>()
                .Include<DuraformDrawer, DuraformDrawerDto>();
            CreateMap<DuraformComponentDto, DuraformComponent>()
                .Include<DuraformDoorDto, DuraformDoor>()
                .Include<DuraformPantryDoorDto, DuraformPantryDoor>()
                .Include<DuraformEndPanelDto, DuraformEndPanel>()
                .Include<DuraformDrawerDto, DuraformDrawer>()
                .EqualityComparison((dto, x) => dto.Id == x.Id);

            CreateMap<DuraformDoor, DuraformDoorDto>();
            CreateMap<DuraformDoorDto, DuraformDoor>();

            CreateMap<DuraformPantryDoor, DuraformPantryDoorDto>();
            CreateMap<DuraformPantryDoorDto, DuraformPantryDoor>();

            CreateMap<DuraformEndPanel, DuraformEndPanelDto>();
            CreateMap<DuraformEndPanelDto, DuraformEndPanel>();

            CreateMap<DuraformDrawer, DuraformDrawerDto>();
            CreateMap<DuraformDrawerDto, DuraformDrawer>();


            CreateMap<DuraformForm, DuraformFormDto>()
                .Include<DuraformDraft, DuraformDraftDto>();
            CreateMap<DuraformFormDto, DuraformForm>()
                .ForMember(x => x.Id, opt => opt.Ignore())
                .ForMember(x => x.OrderType, opt => opt.Ignore())
                .ForMember(x => x.CreatedDate, opt => opt.Ignore())
                .ForMember(x => x.LastUpdated, opt => opt.Ignore())
                .Include<DuraformDraftDto, DuraformDraft>();

            CreateMap<DuraformDraft, DuraformDraftDto>();
            CreateMap<DuraformDraftDto, DuraformDraft>();

        }
    }
}