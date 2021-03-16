using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformMiscHeatStripConfig : IEntityTypeConfiguration<DuraformMiscHeatStrip>
    {
        public void Configure(EntityTypeBuilder<DuraformMiscHeatStrip> builder)
        {
            builder.Property(x => x.Size)
                .HasColumnName("Size");

            builder.Property(x => x.Type)
                .HasColumnName("Type");
        }
    }
}