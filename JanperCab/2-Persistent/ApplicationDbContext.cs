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
            builder.ApplyConfiguration(new HingeHoleTypeConfig());
            builder.ApplyConfiguration(new DuraformOptionConfig());
            builder.ApplyConfiguration(new DuraformOptionNoFaceConfig());
            builder.ApplyConfiguration(new DuraformOptionDoubleSidedConfig());
            builder.ApplyConfiguration(new DuraformOptionFoldBackConfig());
            builder.ApplyConfiguration(new DuraformOptionPaneFrameConfig());
            builder.ApplyConfiguration(new DuraformFormConfig());
            builder.ApplyConfiguration(new DuraformComponentConfig());
            builder.ApplyConfiguration(new DuraformDoorConfig());
            builder.ApplyConfiguration(new HingeHoleOptionConfig());
            builder.ApplyConfiguration(new DuraformDraftConfig());

            base.OnModelCreating(builder);
        }
    }


    //public class DuraformPantryDoor : DuraformComponentWithOptionAndHingeHole
    //{
    //    public decimal ChairRailHeight { get; set; }

    //    public int ChairRailTypeId { get; set; }

    //    public decimal ExtraRailBottom { get; set; }


    //    public virtual PantryDoorChairRailType ChairRailType { get; set; }
    //}

    //public class DuraformEndPanel : DuraformComponentWithOption
    //{
    //    public int NumberOfShields { get; set; }

    //    public decimal RailLeft { get; set; }

    //    public decimal RailCenter { get; set; }

    //    public decimal RailRight { get; set; }

    //    public decimal ExtraRailBottom { get; set; }

    //    public decimal ExtraRailTop { get; set; }
    //}

    //public class DuraformDrawer : DuraformComponent
    //{
    //    public int DuraformDrawerTypeId { get; set; }

    //    public decimal DrawerOne { get; set; }

    //    public decimal DrawerTwo { get; set; }

    //    public decimal DrawerThree { get; set; }

    //    public decimal DrawerFour { get; set; }

    //    public decimal DrawerFive { get; set; }
    //}
}
