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
        public DbSet<DuraformDoor> DuraformDoors { get; set; }

        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfiguration(new DuraformSerieConfig());
            builder.ApplyConfiguration(new DuraformDoorConfig());

            base.OnModelCreating(builder);
        }
    }
}
