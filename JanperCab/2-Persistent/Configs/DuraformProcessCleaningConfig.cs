using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformProcessCleaningConfig : IEntityTypeConfiguration<DuraformProcessCleaning>
    {
        public void Configure(EntityTypeBuilder<DuraformProcessCleaning> builder)
        {
            builder.Property(x => x.MachineId)
                .HasColumnName("MachineId");

            builder.HasOne(x => x.MachineCleaning)
                .WithMany(y => y.DuraformProcessCleanings)
                .HasForeignKey(x => x.MachineId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}