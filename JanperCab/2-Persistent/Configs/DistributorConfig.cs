using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DistributorConfig : IEntityTypeConfiguration<Distributor>
    {
        public void Configure(EntityTypeBuilder<Distributor> builder)
        {
            builder.HasMany(x => x.CabinetMakers)
                .WithOne(y => y.Distributor)
                .IsRequired()
                .HasForeignKey(y => y.DistributorId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}