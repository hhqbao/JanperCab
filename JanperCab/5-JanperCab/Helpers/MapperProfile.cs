using _1_Domain;
using _3_Application.Dtos.ApplicationFile;
using _3_Application.Dtos.Customer;
using _3_Application.Dtos.DuraformArch;
using _3_Application.Dtos.DuraformComponent;
using _3_Application.Dtos.DuraformDesign;
using _3_Application.Dtos.DuraformDrawerType;
using _3_Application.Dtos.DuraformEdgeProfile;
using _3_Application.Dtos.DuraformMiscComponent;
using _3_Application.Dtos.DuraformMiscPrice;
using _3_Application.Dtos.DuraformOption;
using _3_Application.Dtos.DuraformOptionType;
using _3_Application.Dtos.DuraformPriceGrid;
using _3_Application.Dtos.DuraformSerie;
using _3_Application.Dtos.DuraformWrapColor;
using _3_Application.Dtos.DuraformWrapType;
using _3_Application.Dtos.Enquiry;
using _3_Application.Dtos.HingeHoleOption;
using _3_Application.Dtos.HingeHoleType;
using _3_Application.Dtos.Machine;
using _3_Application.Dtos.PantryDoorChairRailType;
using _3_Application.Dtos.Process;
using _3_Application.Dtos.UploadFile;
using _5_JanperCab.Helpers.Resolvers;
using AutoMapper;
using AutoMapper.EquivalencyExpression;

namespace _5_JanperCab.Helpers
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<Customer, CustomerDto>()
                .Include<Manufacturer, ManufacturerDto>()
                .Include<Distributor, DistributorDto>()
                .Include<CabinetMaker, CabinetMakerDto>();
            CreateMap<CustomerDto, Customer>()
                .Include<ManufacturerDto, Manufacturer>()
                .Include<DistributorDto, Distributor>()
                .Include<CabinetMakerDto, CabinetMaker>()
                .ForMember(x => x.Id, opt => opt.Ignore());

            CreateMap<Manufacturer, ManufacturerDto>();
            CreateMap<ManufacturerDto, Manufacturer>();

            CreateMap<Distributor, DistributorDto>();
            CreateMap<DistributorDto, Distributor>();

            CreateMap<CabinetMaker, CabinetMakerDto>();
            CreateMap<CabinetMakerDto, CabinetMaker>();

            CreateMap<DuraformSerie, DuraformSerieForList>();

            CreateMap<DuraformDesign, DuraformDesignForOrderMenu>()
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
            CreateMap<DuraformEdgeProfile, DuraformEdgeProfileDto>();

            CreateMap<DuraformArch, DuraformArchForList>();
            CreateMap<PantryDoorChairRailType, PantryDoorChairRailTypeForList>();
            CreateMap<DuraformDrawerType, DuraformDrawerTypeForList>();

            CreateMap<DuraformOptionType, DuraformOptionTypeDto>();
            CreateMap<DuraformOptionTypeDto, DuraformOptionType>();

            CreateMap<DuraformOption, DuraformOptionDto>()
                .Include<DuraformOptionNoFace, DuraformOptionNoFaceDto>()
                .Include<DuraformOptionDoubleSided, DuraformOptionDoubleSidedDto>()
                .Include<DuraformOptionFoldBack, DuraformOptionFoldBackDto>()
                .Include<DuraformOptionPaneFrame, DuraformOptionPaneFrameDto>()
                .Include<DuraformOptionRollerShutterFrame, DuraformOptionRollerShutterFrameDto>()
                .Include<DuraformOptionMicrowaveFrame, DuraformOptionMicrowaveFrameDto>()
                .Include<DuraformOptionAngledShelf, DuraformOptionAngledShelfDto>();
            CreateMap<DuraformOptionDto, DuraformOption>()
                .Include<DuraformOptionNoFaceDto, DuraformOptionNoFace>()
                .Include<DuraformOptionDoubleSidedDto, DuraformOptionDoubleSided>()
                .Include<DuraformOptionFoldBackDto, DuraformOptionFoldBack>()
                .Include<DuraformOptionPaneFrameDto, DuraformOptionPaneFrame>()
                .Include<DuraformOptionRollerShutterFrameDto, DuraformOptionRollerShutterFrame>()
                .Include<DuraformOptionMicrowaveFrameDto, DuraformOptionMicrowaveFrame>()
                .Include<DuraformOptionAngledShelfDto, DuraformOptionAngledShelf>();

            CreateMap<DuraformOptionNoFace, DuraformOptionNoFaceDto>();
            CreateMap<DuraformOptionNoFaceDto, DuraformOptionNoFace>();

            CreateMap<DuraformOptionDoubleSided, DuraformOptionDoubleSidedDto>();
            CreateMap<DuraformOptionDoubleSidedDto, DuraformOptionDoubleSided>();

            CreateMap<DuraformOptionFoldBack, DuraformOptionFoldBackDto>();
            CreateMap<DuraformOptionFoldBackDto, DuraformOptionFoldBack>();

            CreateMap<DuraformOptionPaneFrame, DuraformOptionPaneFrameDto>();
            CreateMap<DuraformOptionPaneFrameDto, DuraformOptionPaneFrame>();

            CreateMap<DuraformOptionRollerShutterFrame, DuraformOptionRollerShutterFrameDto>();
            CreateMap<DuraformOptionRollerShutterFrameDto, DuraformOptionRollerShutterFrame>();

            CreateMap<DuraformOptionMicrowaveFrame, DuraformOptionMicrowaveFrameDto>();
            CreateMap<DuraformOptionMicrowaveFrameDto, DuraformOptionMicrowaveFrame>();

            CreateMap<DuraformOptionAngledShelf, DuraformOptionAngledShelfDto>();
            CreateMap<DuraformOptionAngledShelfDto, DuraformOptionAngledShelf>();

            CreateMap<HingeHoleType, HingeHoleTypeDto>();
            CreateMap<HingeHoleTypeDto, HingeHoleType>();

            CreateMap<HingeHoleOption, HingeHoleOptionDto>();
            CreateMap<HingeHoleOptionDto, HingeHoleOption>();

            CreateMap<HingeHoleStyle, HingeHoleStyleDto>();
            CreateMap<HingeHoleStyleDto, HingeHoleStyle>();

            CreateMap<DuraformComponent, DuraformComponentDto>()
                .Include<DuraformComponentWithOption, DuraformComponentWithOptionDto>()
                .Include<DuraformDrawer, DuraformDrawerDto>();
            CreateMap<DuraformComponentDto, DuraformComponent>()
                .Include<DuraformComponentWithOptionDto, DuraformComponentWithOption>()
                .Include<DuraformDrawerDto, DuraformDrawer>()
                .EqualityComparison((dto, x) => dto.Id == x.Id);

            CreateMap<DuraformComponentWithOption, DuraformComponentWithOptionDto>()
                .Include<DuraformComponentWithOptionAndHingeHole, DuraformComponentWithOptionAndHingeHoleDto>()
                .Include<DuraformEndPanel, DuraformEndPanelDto>();
            CreateMap<DuraformComponentWithOptionDto, DuraformComponentWithOption>()
                .Include<DuraformComponentWithOptionAndHingeHoleDto, DuraformComponentWithOptionAndHingeHole>()
                .Include<DuraformEndPanelDto, DuraformEndPanel>()
                .ForMember(x => x.DuraformOption, opt => opt.MapFrom<DuraformOptionResolver>());

            CreateMap<DuraformComponentWithOptionAndHingeHole, DuraformComponentWithOptionAndHingeHoleDto>()
                .Include<DuraformDoor, DuraformDoorDto>()
                .Include<DuraformPantryDoor, DuraformPantryDoorDto>();
            CreateMap<DuraformComponentWithOptionAndHingeHoleDto, DuraformComponentWithOptionAndHingeHole>()
                .Include<DuraformDoorDto, DuraformDoor>()
                .Include<DuraformPantryDoorDto, DuraformPantryDoor>()
                .ForMember(x => x.HingeHoleOption, opt => opt.MapFrom<HingeHoleOptionResolver>());

            CreateMap<DuraformDoor, DuraformDoorDto>();
            CreateMap<DuraformDoorDto, DuraformDoor>();

            CreateMap<DuraformPantryDoor, DuraformPantryDoorDto>();
            CreateMap<DuraformPantryDoorDto, DuraformPantryDoor>();

            CreateMap<DuraformEndPanel, DuraformEndPanelDto>();
            CreateMap<DuraformEndPanelDto, DuraformEndPanel>();

            CreateMap<DuraformDrawer, DuraformDrawerDto>();
            CreateMap<DuraformDrawerDto, DuraformDrawer>();

            CreateMap<DuraformMiscComponent, DuraformMiscComponentDto>()
                .Include<DuraformMiscLooseFoil, DuraformMiscLooseFoilDto>()
                .Include<DuraformMiscCapMould, DuraformMiscCapMouldDto>()
                .Include<DuraformMiscFingerPull, DuraformMiscFingerPullDto>()
                .Include<DuraformMiscHeatStrip, DuraformMiscHeatStripDto>();
            CreateMap<DuraformMiscComponentDto, DuraformMiscComponent>()
                .Include<DuraformMiscLooseFoilDto, DuraformMiscLooseFoil>()
                .Include<DuraformMiscCapMouldDto, DuraformMiscCapMould>()
                .Include<DuraformMiscFingerPullDto, DuraformMiscFingerPull>()
                .Include<DuraformMiscHeatStripDto, DuraformMiscHeatStrip>()
                .EqualityComparison((dto, x) => dto.Id == x.Id);

            CreateMap<DuraformMiscLooseFoil, DuraformMiscLooseFoilDto>();
            CreateMap<DuraformMiscLooseFoilDto, DuraformMiscLooseFoil>();

            CreateMap<DuraformMiscCapMould, DuraformMiscCapMouldDto>();
            CreateMap<DuraformMiscCapMouldDto, DuraformMiscCapMould>();

            CreateMap<DuraformMiscFingerPull, DuraformMiscFingerPullDto>();
            CreateMap<DuraformMiscFingerPullDto, DuraformMiscFingerPull>();

            CreateMap<DuraformMiscHeatStrip, DuraformMiscHeatStripDto>();
            CreateMap<DuraformMiscHeatStripDto, DuraformMiscHeatStrip>();

            CreateMap<Machine, MachineDto>()
                .Include<MachineRouter, MachineRouterDto>()
                .Include<MachinePresser, MachinePresserDto>()
                .Include<MachineCutter, MachineCutterDto>();
            CreateMap<Machine, MachineProductionListDto>()
                .ForMember(x => x.CurrentProcesses, opt => opt.MapFrom<MachineProductionListCurrentProcessesResolver>());
            CreateMap<MachineDto, Machine>()
                .Include<MachineRouterDto, MachineRouter>()
                .Include<MachinePresserDto, MachinePresser>()
                .Include<MachineCutterDto, MachineCutter>();

            CreateMap<MachineRouter, MachineRouterDto>();
            CreateMap<MachineRouterDto, MachineRouter>();

            CreateMap<MachinePresser, MachinePresserDto>();
            CreateMap<MachinePresserDto, MachinePresser>();

            CreateMap<MachineCutter, MachineCutterDto>();
            CreateMap<MachineCutterDto, MachineCutter>();

            CreateMap<Process, ProcessDto>()
                .Include<DuraformProcess, DuraformProcessDto>();
            CreateMap<ProcessDto, Process>()
                .Include<DuraformProcessDto, DuraformProcess>();

            CreateMap<DuraformProcess, DuraformProcessDto>()
                .Include<DuraformProcessPreRoute, DuraformProcessPreRouteDto>()
                .Include<DuraformProcessRouting, DuraformProcessRoutingDto>()
                .Include<DuraformProcessPressing, DuraformProcessPressingDto>()
                .Include<DuraformProcessCleaning, DuraformProcessCleaningDto>()
                .Include<DuraformProcessPacking, DuraformProcessPackingDto>()
                .Include<DuraformProcessPickingUp, DuraformProcessPickingUpDto>()
                .Include<DuraformProcessDelivering, DuraformProcessDeliveringDto>();
            CreateMap<DuraformProcessDto, DuraformProcess>()
                .Include<DuraformProcessPreRouteDto, DuraformProcessPreRoute>()
                .Include<DuraformProcessRoutingDto, DuraformProcessRouting>()
                .Include<DuraformProcessPressingDto, DuraformProcessPressing>()
                .Include<DuraformProcessCleaningDto, DuraformProcessCleaning>()
                .Include<DuraformProcessPackingDto, DuraformProcessPacking>()
                .Include<DuraformProcessPickingUpDto, DuraformProcessPickingUp>()
                .Include<DuraformProcessDeliveringDto, DuraformProcessDelivering>();

            CreateMap<DuraformProcessPreRoute, DuraformProcessPreRouteDto>();
            CreateMap<DuraformProcessPreRouteDto, DuraformProcessPreRoute>();

            CreateMap<DuraformProcessRouting, DuraformProcessRoutingDto>();
            CreateMap<DuraformProcessRoutingDto, DuraformProcessRouting>();

            CreateMap<DuraformProcessPressing, DuraformProcessPressingDto>();
            CreateMap<DuraformProcessPressingDto, DuraformProcessPressing>();

            CreateMap<DuraformProcessCleaning, DuraformProcessCleaningDto>();
            CreateMap<DuraformProcessCleaningDto, DuraformProcessCleaning>();

            CreateMap<DuraformProcessPacking, DuraformProcessPackingDto>();
            CreateMap<DuraformProcessPackingDto, DuraformProcessPacking>();

            CreateMap<DuraformProcessPickingUp, DuraformProcessPickingUpDto>();
            CreateMap<DuraformProcessPickingUpDto, DuraformProcessPickingUp>();

            CreateMap<DuraformProcessDelivering, DuraformProcessDeliveringDto>();
            CreateMap<DuraformProcessDeliveringDto, DuraformProcessDelivering>();

            CreateMap<Enquiry, EnquiryDto>()
                .Include<DuraformEnquiry, DuraformEnquiryDto>();
            CreateMap<EnquiryDto, Enquiry>()
                .Include<DuraformEnquiryDto, DuraformEnquiry>()
                .ForMember(x => x.CreatedDate, opt => opt.Ignore());

            CreateMap<DuraformEnquiry, DuraformEnquiryDto>();
            CreateMap<DuraformEnquiry, DuraformEnquiryListDto>();
            CreateMap<DuraformEnquiryDto, DuraformEnquiry>();

            CreateMap<UploadFileDto, ApplicationFile>()
                .Include<UploadDuraformFileDto, DuraformFile>();

            CreateMap<UploadDuraformFileDto, DuraformFile>();

            CreateMap<ApplicationFile, ApplicationFileDto>()
                .Include<DuraformFile, DuraformFileDto>();
            CreateMap<ApplicationFileDto, ApplicationFile>()
                .Include<DuraformFileDto, DuraformFile>();

            CreateMap<DuraformFile, DuraformFileDto>();
            CreateMap<DuraformFileDto, DuraformFile>();

            CreateMap<DuraformDesignEdgeProfile, DuraformDesignEdgeProfileDto>();
            CreateMap<DuraformDesignEdgeProfileDto, DuraformDesignEdgeProfile>();

            CreateMap<DuraformPriceGrid, DuraformPriceGridDto>()
                .Include<DuraformWrapPriceGrid, DuraformWrapPriceGridDto>()
                .Include<DuraformRouteOnlyPriceGrid, DuraformRouteOnlyPriceGridDto>();
            CreateMap<DuraformPriceGridDto, DuraformPriceGrid>()
                .Include<DuraformWrapPriceGridDto, DuraformWrapPriceGrid>()
                .Include<DuraformRouteOnlyPriceGridDto, DuraformRouteOnlyPriceGrid>();

            CreateMap<DuraformWrapPriceGrid, DuraformWrapPriceGridDto>();
            CreateMap<DuraformWrapPriceGridDto, DuraformWrapPriceGrid>();

            CreateMap<DuraformRouteOnlyPriceGrid, DuraformRouteOnlyPriceGridDto>();
            CreateMap<DuraformRouteOnlyPriceGridDto, DuraformRouteOnlyPriceGrid>();

            CreateMap<DuraformMiscPrice, DuraformMiscPriceDto>()
                .Include<DuraformMiscPriceLooseFoil, DuraformMiscPriceLooseFoilDto>()
                .Include<DuraformMiscPriceCapMould, DuraformMiscPriceCapMouldDto>()
                .Include<DuraformMiscPriceFingerPull, DuraformMiscPriceFingerPullDto>()
                .Include<DuraformMiscPriceHeatStrip, DuraformMiscPriceHeatStripDto>();
            CreateMap<DuraformMiscPriceDto, DuraformMiscPrice>()
                .Include<DuraformMiscPriceLooseFoilDto, DuraformMiscPriceLooseFoil>()
                .Include<DuraformMiscPriceCapMouldDto, DuraformMiscPriceCapMould>()
                .Include<DuraformMiscPriceFingerPullDto, DuraformMiscPriceFingerPull>()
                .Include<DuraformMiscPriceHeatStripDto, DuraformMiscPriceHeatStrip>();

            CreateMap<DuraformMiscPriceLooseFoil, DuraformMiscPriceLooseFoilDto>();
            CreateMap<DuraformMiscPriceLooseFoilDto, DuraformMiscPriceLooseFoil>();

            CreateMap<DuraformMiscPriceFingerPull, DuraformMiscPriceFingerPullDto>();
            CreateMap<DuraformMiscPriceFingerPullDto, DuraformMiscPriceFingerPull>();

            CreateMap<DuraformMiscPriceCapMould, DuraformMiscPriceCapMouldDto>();
            CreateMap<DuraformMiscPriceCapMouldDto, DuraformMiscPriceCapMould>();

            CreateMap<DuraformMiscPriceHeatStrip, DuraformMiscPriceHeatStripDto>();
            CreateMap<DuraformMiscPriceHeatStripDto, DuraformMiscPriceHeatStrip>();
        }
    }
}