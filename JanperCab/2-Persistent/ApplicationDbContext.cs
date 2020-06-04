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
        public DbSet<NotAvailableDesignWrapType> NotAvailableDesignWrapTypes { get; set; }

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
            builder.ApplyConfiguration(new NotAvailableDesignWrapTypeConfig());

            base.OnModelCreating(builder);
        }
    }
}
