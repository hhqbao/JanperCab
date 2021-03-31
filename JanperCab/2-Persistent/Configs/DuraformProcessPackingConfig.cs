using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformProcessPackingConfig : IEntityTypeConfiguration<DuraformProcessPacking>
    {
        public void Configure(EntityTypeBuilder<DuraformProcessPacking> builder)
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