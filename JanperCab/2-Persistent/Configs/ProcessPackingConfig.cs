using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class ProcessPackingConfig : IEntityTypeConfiguration<ProcessPacking>
    {
        public void Configure(EntityTypeBuilder<ProcessPacking> builder)
        {
            builder.Property(x => x.MachineId)
                .HasColumnName("MachineId");

            builder.HasOne(x => x.MachinePacking)
                .WithMany(y => y.DuraformProcessPackings)
                .HasForeignKey(x => x.MachineId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}