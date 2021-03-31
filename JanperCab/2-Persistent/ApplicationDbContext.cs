using _1_Domain;
using _2_Persistent.Configs;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace _2_Persistent
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public DbSet<DuraformSerie> DuraformSeries { get; set; }
        public DbSet<DuraformDesign> DuraformDesigns { get; set; }
        public DbSet<DuraformWrapType> DuraformWrapTypes { get; set; }
        public DbSet<DuraformWrapColor> DuraformWrapColors { get; set; }
        public DbSet<DuraformEdgeProfile> DuraformEdgeProfiles { set; get; }
        public DbSet<DuraformArch> DuraformArches { get; set; }
        public DbSet<NotAvailableDesignWrapType> NotAvailableDesignWrapTypes { get; set; }
        public DbSet<PantryDoorChairRailType> PantryDoorChairRailTypes { get; set; }
        public DbSet<DuraformDrawerType> DuraformDrawerTypes { get; set; }
        public DbSet<DuraformOptionType> DuraformOptionTypes { get; set; }
        public DbSet<DuraformOption> DuraformOptions { get; set; }
        public DbSet<HingeHoleType> HingeHoleTypes { get; set; }
        public DbSet<HingeHoleOption> HingeHoleOptions { get; set; }
        public DbSet<HingeHoleStyle> HingeHoleStyle { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<DuraformDesignEdgeProfile> DuraformDesignEdgeProfiles { get; set; }
        public DbSet<DuraformPriceGrid> DuraformPriceGrids { get; set; }
        public DbSet<Machine> Machines { get; set; }

        public DbSet<Enquiry> Enquiries { get; set; }
        public DbSet<Process> Processes { get; set; }

        public DbSet<DuraformComponent> DuraformComponents { get; set; }
        public DbSet<DuraformMiscComponent> DuraformMiscComponents { get; set; }
        public DbSet<ApplicationFile> ApplicationFiles { get; set; }

        public DbSet<DuraformMiscPrice> DuraformMiscPrices { get; set; }

        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new DuraformSerieConfig());
            builder.ApplyConfiguration(new DuraformDesignConfig());
            builder.ApplyConfiguration(new DuraformWrapTypeConfig());
            builder.ApplyConfiguration(new DuraformWrapColorConfig());
            builder.ApplyConfiguration(new DuraformEdgeProfileConfig());
            builder.ApplyConfiguration(new DuraformArchConfig());
            builder.ApplyConfiguration(new NotAvailableDesignWrapTypeConfig());
            builder.ApplyConfiguration(new PantryDoorChairRailTypeConfig());
            builder.ApplyConfiguration(new DuraformDrawerTypeConfig());
            builder.ApplyConfiguration(new DuraformOptionTypeConfig());
            builder.ApplyConfiguration(new MachineConfig());
            builder.ApplyConfiguration(new MachineRouterConfig());
            builder.ApplyConfiguration(new MachinePresserConfig());
            builder.ApplyConfiguration(new MachineCutterConfig());
            builder.ApplyConfiguration(new MachineCleaningConfig());
            builder.ApplyConfiguration(new MachinePackingConfig());

            builder.ApplyConfiguration(new HingeHoleTypeConfig());
            builder.ApplyConfiguration(new HingeHoleOptionConfig());
            builder.ApplyConfiguration(new HingeHoleStyleConfig());

            builder.ApplyConfiguration(new DuraformOptionConfig());
            builder.ApplyConfiguration(new DuraformOptionNoFaceConfig());
            builder.ApplyConfiguration(new DuraformOptionDoubleSidedConfig());
            builder.ApplyConfiguration(new DuraformOptionFoldBackConfig());
            builder.ApplyConfiguration(new DuraformOptionPaneFrameConfig());
            builder.ApplyConfiguration(new DuraformOptionRollerShutterFrameConfig());
            builder.ApplyConfiguration(new DuraformOptionMicrowaveFrameConfig());
            builder.ApplyConfiguration(new DuraformOptionAngledShelfConfig());

            builder.ApplyConfiguration(new CustomerConfig());
            builder.ApplyConfiguration(new ManufacturerConfig());
            builder.ApplyConfiguration(new DistributorConfig());
            builder.ApplyConfiguration(new CabinetMakerConfig());

            builder.ApplyConfiguration(new DuraformDesignEdgeProfileConfig());
            builder.ApplyConfiguration(new DuraformPriceGridConfig());
            builder.ApplyConfiguration(new DuraformWrapPriceGridConfig());
            builder.ApplyConfiguration(new DuraformRouteOnlyPriceGridConfig());

            builder.ApplyConfiguration(new EnquiryConfig());
            builder.ApplyConfiguration(new DuraformEnquiryConfig());

            builder.ApplyConfiguration(new DuraformComponentConfig());
            builder.ApplyConfiguration(new DuraformDoorConfig());
            builder.ApplyConfiguration(new DuraformPantryDoorConfig());
            builder.ApplyConfiguration(new DuraformEndPanelConfig());
            builder.ApplyConfiguration(new DuraformDrawerConfig());

            builder.ApplyConfiguration(new DuraformMiscComponentConfig());
            builder.ApplyConfiguration(new DuraformMiscLooseFoilConfig());
            builder.ApplyConfiguration(new DuraformMiscFingerPullConfig());
            builder.ApplyConfiguration(new DuraformMiscCapMouldConfig());
            builder.ApplyConfiguration(new DuraformMiscHeatStripConfig());

            builder.ApplyConfiguration(new ApplicationFileConfig());
            builder.ApplyConfiguration(new DuraformFileConfig());

            builder.ApplyConfiguration(new DuraformMiscPriceConfig());
            builder.ApplyConfiguration(new DuraformMiscPriceLooseFoilConfig());
            builder.ApplyConfiguration(new DuraformMiscPriceCapMouldConfig());
            builder.ApplyConfiguration(new DuraformMiscPriceFingerPullConfig());
            builder.ApplyConfiguration(new DuraformMiscPriceHeatStripConfig());

            builder.ApplyConfiguration(new ProcessConfig());
            builder.ApplyConfiguration(new DuraformProcessConfig());
            builder.ApplyConfiguration(new DuraformProcessPreRouteConfig());
            builder.ApplyConfiguration(new DuraformProcessRoutingConfig());
            builder.ApplyConfiguration(new DuraformProcessPressingConfig());
            builder.ApplyConfiguration(new DuraformProcessCleaningConfig());
            builder.ApplyConfiguration(new DuraformProcessPackingConfig());
            builder.ApplyConfiguration(new DuraformProcessPickingUpConfig());
            builder.ApplyConfiguration(new DuraformProcessDeliveringConfig());

            base.OnModelCreating(builder);
        }
    }
}
