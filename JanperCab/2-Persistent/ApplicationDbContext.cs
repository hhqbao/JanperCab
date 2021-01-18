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
        public DbSet<HingeHoleType> HingeHoleTypes { get; set; }
        public DbSet<DuraformOption> DuraformOptions { get; set; }
        public DbSet<DuraformForm> DuraformForms { get; set; }
        public DbSet<DuraformComponent> DuraformComponents { get; set; }
        public DbSet<HingeHoleOption> HingeHoleOptions { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<ApplicationFile> ApplicationFiles { get; set; }
        public DbSet<MiscItem> MiscItems { get; set; }
        public DbSet<DuraformMisc> DuraformMiscs { get; set; }
        public DbSet<DuraformDesignEdgeProfile> DuraformDesignEdgeProfiles { get; set; }

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
            builder.ApplyConfiguration(new MiscItemConfig());
            builder.ApplyConfiguration(new DuraformMiscConfig());

            builder.ApplyConfiguration(new HingeHoleTypeConfig());
            builder.ApplyConfiguration(new HingeHoleOptionConfig());

            builder.ApplyConfiguration(new DuraformOptionConfig());
            builder.ApplyConfiguration(new DuraformOptionNoFaceConfig());
            builder.ApplyConfiguration(new DuraformOptionDoubleSidedConfig());
            builder.ApplyConfiguration(new DuraformOptionFoldBackConfig());
            builder.ApplyConfiguration(new DuraformOptionPaneFrameConfig());
            builder.ApplyConfiguration(new DuraformOptionRollerShutterFrameConfig());
            builder.ApplyConfiguration(new DuraformOptionMicrowaveFrameConfig());
            builder.ApplyConfiguration(new DuraformOptionAngledShelfConfig());

            builder.ApplyConfiguration(new DuraformFormConfig());
            builder.ApplyConfiguration(new DuraformDraftConfig());
            builder.ApplyConfiguration(new DuraformQuoteConfig());
            builder.ApplyConfiguration(new DuraformOrderConfig());

            builder.ApplyConfiguration(new DuraformComponentConfig());
            builder.ApplyConfiguration(new DuraformDoorConfig());
            builder.ApplyConfiguration(new DuraformPantryDoorConfig());
            builder.ApplyConfiguration(new DuraformEndPanelConfig());
            builder.ApplyConfiguration(new DuraformDrawerConfig());

            builder.ApplyConfiguration(new CustomerConfig());
            builder.ApplyConfiguration(new ManufacturerConfig());
            builder.ApplyConfiguration(new DistributorConfig());
            builder.ApplyConfiguration(new CabinetMakerConfig());

            builder.ApplyConfiguration(new ApplicationFileConfig());
            builder.ApplyConfiguration(new DuraformFileConfig());
            builder.ApplyConfiguration(new DuraformDesignEdgeProfileConfig());

            base.OnModelCreating(builder);
        }
    }
}
