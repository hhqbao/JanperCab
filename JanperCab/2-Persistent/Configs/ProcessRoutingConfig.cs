using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class ProcessRoutingConfig : IEntityTypeConfiguration<ProcessRouting>
    {
        public void Configure(EntityTypeBuilder<ProcessRouting> builder)
        {
            builder.Property(x => x.MachineId)
                .HasColumnName("MachineId");

            builder.HasOne(x => x.MachineRouter)
                .WithMany(y => y.DuraformProcessRoutings)
                .HasForeignKey(x => x.MachineId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}