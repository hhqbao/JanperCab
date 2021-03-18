using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformProcessRoutingConfig : IEntityTypeConfiguration<DuraformProcessRouting>
    {
        public void Configure(EntityTypeBuilder<DuraformProcessRouting> builder)
        {
            builder.HasOne(x => x.Machine)
                .WithMany(y => y.DuraformProcessRoutings)
                .HasForeignKey(x => x.MachineId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}