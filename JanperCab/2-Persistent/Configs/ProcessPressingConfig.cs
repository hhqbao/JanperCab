using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class ProcessPressingConfig : IEntityTypeConfiguration<ProcessPressing>
    {
        public void Configure(EntityTypeBuilder<ProcessPressing> builder)
        {
            builder.Property(x => x.MachineId)
                .HasColumnName("MachineId");

            builder.HasOne(x => x.MachinePresser)
                .WithMany(y => y.DuraformProcessPressings)
                .HasForeignKey(x => x.MachineId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}