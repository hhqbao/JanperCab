using _1_Domain;
using _3_Application.Dtos.ApplicationFile;
using _3_Application.Dtos.CashOrderPayment;
using _3_Application.Dtos.Customer;
using _3_Application.Dtos.CustomerCategory;
using _3_Application.Dtos.DeliveryDocket;
using _3_Application.Dtos.DeliverySheet;
using _3_Application.Dtos.Driver;
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
using _3_Application.Dtos.Invoice;
using _3_Application.Dtos.Machine;
using _3_Application.Dtos.OnHoldComponent;
using _3_Application.Dtos.PantryDoorChairRailType;
using _3_Application.Dtos.Process;
using _3_Application.Dtos.Truck;
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
                .ForMember(x => x.Id, opt => opt.Ignore())
                .ForMember(x => x.CustomerCategory, opt => opt.Ignore())
                .ForMember(x => x.Manager, opt => opt.Ignore());

            CreateMap<Manufacturer, ManufacturerDto>();
            CreateMap<ManufacturerDto, Manufacturer>();

            CreateMap<Distributor, DistributorDto>();
            CreateMap<DistributorDto, Distributor>();

            CreateMap<CabinetMaker, CabinetMakerDto>();
            CreateMap<CabinetMakerDto, CabinetMaker>();

            CreateMap<CustomerCategory, CustomerCategoryDto>()
                .Include<CustomerCategoryAccount, CustomerCategoryAccountDto>()
                .Include<CustomerCategoryCBD, CustomerCategoryCBDDto>();
            CreateMap<CustomerCategoryDto, CustomerCategory>()
                .Include<CustomerCategoryAccountDto, CustomerCategoryAccount>()
                .Include<CustomerCategoryCBDDto, CustomerCategoryCBD>();

            CreateMap<CustomerCategoryAccount, CustomerCategoryAccountDto>();
            CreateMap<CustomerCategoryAccountDto, CustomerCategoryAccount>();

            CreateMap<CustomerCategoryCBD, CustomerCategoryCBDDto>();
            CreateMap<CustomerCategoryCBDDto, CustomerCategoryCBD>();

            CreateMap<DuraformSerie, DuraformSerieDto>();

            CreateMap<DuraformDesign, DuraformDesignDto>();

            CreateMap<DuraformWrapType, DuraformWrapTypeDto>();

            CreateMap<DuraformWrapColor, DuraformWrapColorDto>();

            CreateMap<DuraformEdgeProfile, DuraformEdgeProfileDto>();

            CreateMap<DuraformArch, DuraformArchDto>();

            CreateMap<PantryDoorChairRailType, PantryDoorChairRailTypeDto>();

            CreateMap<DuraformDrawerType, DuraformDrawerTypeDto>();

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

            CreateMap<HingeHoleStyle, HingeHoleStyleDto>();
            CreateMap<HingeHoleStyleDto, HingeHoleStyle>();

            CreateMap<HingeHoleOption, HingeHoleOptionDto>()
                .Include<HingeHoleOptionSide, HingeHoleOptionSideDto>()
                .Include<HingeHoleOptionDraw, HingeHoleOptionDrawDto>()
                .Include<HingeHoleOptionCornerDoor, HingeHoleOptionCornerDoorDto>()
                .Include<HingeHoleOptionCornerBlank, HingeHoleOptionCornerBlankDto>();
            CreateMap<HingeHoleOptionDto, HingeHoleOption>()
                .Include<HingeHoleOptionSideDto, HingeHoleOptionSide>()
                .Include<HingeHoleOptionDrawDto, HingeHoleOptionDraw>()
                .Include<HingeHoleOptionCornerDoorDto, HingeHoleOptionCornerDoor>()
                .Include<HingeHoleOptionCornerBlankDto, HingeHoleOptionCornerBlank>()
                .ForMember(x => x.HingeHoleStyle, opt => opt.Ignore());

            CreateMap<HingeHoleOptionSide, HingeHoleOptionSideDto>();
            CreateMap<HingeHoleOptionSideDto, HingeHoleOptionSide>();

            CreateMap<HingeHoleOptionDraw, HingeHoleOptionDrawDto>();
            CreateMap<HingeHoleOptionDrawDto, HingeHoleOptionDraw>();

            CreateMap<HingeHoleOptionCornerDoor, HingeHoleOptionCornerDoorDto>();
            CreateMap<HingeHoleOptionCornerDoorDto, HingeHoleOptionCornerDoor>();

            CreateMap<HingeHoleOptionCornerBlank, HingeHoleOptionCornerBlankDto>();
            CreateMap<HingeHoleOptionCornerBlankDto, HingeHoleOptionCornerBlank>();

            CreateMap<DuraformComponent, DuraformComponentDto>()
                .Include<DuraformComponentWithOption, DuraformComponentWithOptionDto>()
                .Include<DuraformDrawer, DuraformDrawerDto>();
            CreateMap<DuraformComponentDto, DuraformComponent>()
                .Include<DuraformComponentWithOptionDto, DuraformComponentWithOption>()
                .Include<DuraformDrawerDto, DuraformDrawer>()
                .ForMember(x => x.DuraformEdgeProfile, opt => opt.Ignore())
                .EqualityComparison((dto, x) => dto.Id == x.Id);

            CreateMap<DuraformComponentPriceDto, DuraformComponent>()
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
            CreateMap<DuraformPantryDoorDto, DuraformPantryDoor>()
                .ForMember(x => x.ChairRailType, opt => opt.Ignore());

            CreateMap<DuraformEndPanel, DuraformEndPanelDto>();
            CreateMap<DuraformEndPanelDto, DuraformEndPanel>();

            CreateMap<DuraformDrawer, DuraformDrawerDto>();
            CreateMap<DuraformDrawerDto, DuraformDrawer>()
                .ForMember(x => x.DuraformDrawerType, opt => opt.Ignore());

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

            CreateMap<DuraformMiscComponentPriceDto, DuraformMiscComponent>()
                .EqualityComparison((dto, x) => dto.Id == x.Id);

            CreateMap<DuraformMiscLooseFoil, DuraformMiscLooseFoilDto>();
            CreateMap<DuraformMiscLooseFoilDto, DuraformMiscLooseFoil>();

            CreateMap<DuraformMiscCapMould, DuraformMiscCapMouldDto>();
            CreateMap<DuraformMiscCapMouldDto, DuraformMiscCapMould>();

            CreateMap<DuraformMiscFingerPull, DuraformMiscFingerPullDto>();
            CreateMap<DuraformMiscFingerPullDto, DuraformMiscFingerPull>();

            CreateMap<DuraformMiscHeatStrip, DuraformMiscHeatStripDto>();
            CreateMap<DuraformMiscHeatStripDto, DuraformMiscHeatStrip>();

            CreateMap<OnHoldComponent, OnHoldComponentDto>();
            CreateMap<OnHoldComponentDto, OnHoldComponent>()
                .ForMember(x => x.CreatedDate, opt => opt.Ignore());

            CreateMap<Machine, MachineDto>()
                .Include<MachineRouter, MachineRouterDto>()
                .Include<MachinePresser, MachinePresserDto>()
                .Include<MachineCutter, MachineCutterDto>()
                .Include<MachineCleaning, MachineCleaningDto>()
                .Include<MachinePacking, MachinePackingDto>();
            CreateMap<Machine, MachineProductionListDto>()
                .ForMember(x => x.CurrentProcesses, opt => opt.MapFrom<MachineProductionListCurrentProcessesResolver>());
            CreateMap<MachineDto, Machine>()
                .Include<MachineRouterDto, MachineRouter>()
                .Include<MachinePresserDto, MachinePresser>()
                .Include<MachineCutterDto, MachineCutter>()
                .Include<MachineCleaningDto, MachineCleaning>()
                .Include<MachinePackingDto, MachinePacking>();

            CreateMap<MachineRouter, MachineRouterDto>();
            CreateMap<MachineRouterDto, MachineRouter>();

            CreateMap<MachinePresser, MachinePresserDto>();
            CreateMap<MachinePresserDto, MachinePresser>();

            CreateMap<MachineCutter, MachineCutterDto>();
            CreateMap<MachineCutterDto, MachineCutter>();

            CreateMap<MachineCleaning, MachineCleaningDto>();
            CreateMap<MachineCleaningDto, MachineCleaning>();

            CreateMap<MachinePacking, MachinePackingDto>();
            CreateMap<MachinePackingDto, MachinePacking>();

            CreateMap<Process, ProcessDto>()
                .Include<ProcessPreRoute, ProcessPreRouteDto>()
                .Include<ProcessRouting, ProcessRoutingDto>()
                .Include<ProcessPressing, ProcessPressingDto>()
                .Include<ProcessCleaning, ProcessCleaningDto>()
                .Include<ProcessPacking, ProcessPackingDto>()
                .Include<ProcessDelivering, ProcessDeliveringDto>();
            CreateMap<ProcessDto, Process>()
                .Include<ProcessPreRouteDto, ProcessPreRoute>()
                .Include<ProcessRoutingDto, ProcessRouting>()
                .Include<ProcessPressingDto, ProcessPressing>()
                .Include<ProcessCleaningDto, ProcessCleaning>()
                .Include<ProcessPackingDto, ProcessPacking>()
                .Include<ProcessDeliveringDto, ProcessDelivering>();

            CreateMap<ProcessPreRoute, ProcessPreRouteDto>();
            CreateMap<ProcessPreRouteDto, ProcessPreRoute>();

            CreateMap<ProcessRouting, ProcessRoutingDto>();
            CreateMap<ProcessRoutingDto, ProcessRouting>();

            CreateMap<ProcessPressing, ProcessPressingDto>();
            CreateMap<ProcessPressingDto, ProcessPressing>();

            CreateMap<ProcessCleaning, ProcessCleaningDto>();
            CreateMap<ProcessCleaningDto, ProcessCleaning>();

            CreateMap<ProcessPacking, ProcessPackingDto>();
            CreateMap<ProcessPackingDto, ProcessPacking>();

            CreateMap<ProcessDelivering, ProcessDeliveringDto>();
            CreateMap<ProcessDeliveringDto, ProcessDelivering>();

            CreateMap<Enquiry, EnquiryDto>()
                .Include<DuraformEnquiry, DuraformEnquiryDto>();
            CreateMap<EnquiryDto, Enquiry>()
                .Include<DuraformEnquiryDto, DuraformEnquiry>()
                .ForMember(x => x.CreatedDate, opt => opt.Ignore())
                .ForMember(x => x.Invoice, opt => opt.Ignore())
                .ForMember(x => x.Customer, opt => opt.Ignore())
                .ForMember(x => x.Manager, opt => opt.Ignore())
                .ForMember(x => x.Processes, opt => opt.Ignore())
                .ForMember(x => x.CashOrderPayments, opt => opt.Ignore());

            CreateMap<EnquiryPriceDto, Enquiry>()
                .Include<DuraformEnquiryPriceDto, DuraformEnquiry>();

            CreateMap<Enquiry, EnquiryForInvoicingDto>()
                .ForMember(x => x.CustomerName, opt => opt.MapFrom(x => x.Customer.Name));

            CreateMap<DuraformEnquiry, DuraformEnquiryDto>();
            CreateMap<DuraformEnquiryDto, DuraformEnquiry>()
                .ForMember(x => x.DuraformDesign, opt => opt.Ignore())
                .ForMember(x => x.DuraformSerie, opt => opt.Ignore())
                .ForMember(x => x.DuraformWrapType, opt => opt.Ignore())
                .ForMember(x => x.DuraformWrapColor, opt => opt.Ignore())
                .ForMember(x => x.DuraformEdgeProfile, opt => opt.Ignore())
                .ForMember(x => x.HingeHoleType, opt => opt.Ignore())
                .ForMember(x => x.DuraformArch, opt => opt.Ignore());

            CreateMap<DuraformEnquiryPriceDto, DuraformEnquiry>();

            CreateMap<Enquiry, DeliveryDocketDto>()
                .Include<DuraformEnquiry, DeliveryDocketDuraformDto>()
                .ForMember(x => x.DeliveryDocketType, opt => opt.MapFrom<DeliveryDocketTypeResolver>());

            CreateMap<DuraformEnquiry, DeliveryDocketDuraformDto>();

            CreateMap<Enquiry, EnquiryListDto>()
                .Include<DuraformEnquiry, EnquiryListDto>();

            CreateMap<DuraformEnquiry, EnquiryListDto>();

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

            CreateMap<Driver, DriverDto>();
            CreateMap<DriverDto, Driver>();

            CreateMap<Truck, TruckDto>();
            CreateMap<TruckDto, Truck>();

            CreateMap<DeliverySheet, DeliverySheetDto>()
                .Include<ShippingSheet, ShippingSheetDto>()
                .Include<PickUpSheet, PickUpSheetDto>()
                .ForMember(x => x.EnquiriesForSheet, opt => opt.MapFrom<EnquiriesForSheetResolver>());
            CreateMap<DeliverySheetDto, DeliverySheet>()
                .Include<ShippingSheetDto, ShippingSheet>()
                .Include<PickUpSheetDto, PickUpSheet>()
                .ForMember(x => x.CreatedDate, opt => opt.Ignore())
                .ForMember(x => x.LockedDate, opt => opt.Ignore())
                .ForMember(x => x.CompletedDate, opt => opt.Ignore())
                .ForMember(x => x.ProcessDeliverings, opt => opt.Ignore());

            CreateMap<ShippingSheet, ShippingSheetDto>();
            CreateMap<ShippingSheetDto, ShippingSheet>()
                .ForMember(x => x.Driver, opt => opt.Ignore())
                .ForMember(x => x.Truck, opt => opt.Ignore());

            CreateMap<PickUpSheet, PickUpSheetDto>();
            CreateMap<PickUpSheetDto, PickUpSheet>()
                .ForMember(x => x.Customer, opt => opt.Ignore());

            CreateMap<InvoiceComponent, InvoiceComponentDto>();
            CreateMap<InvoiceComponentDto, InvoiceComponent>();

            CreateMap<Invoice, InvoiceDto>();
            CreateMap<InvoiceDto, Invoice>();

            CreateMap<CashOrderPayment, CashOrderPaymentDto>();
            CreateMap<CashOrderPaymentDto, CashOrderPayment>()
                .ForMember(x => x.CreatedDate, opt => opt.Ignore());
        }
    }
}