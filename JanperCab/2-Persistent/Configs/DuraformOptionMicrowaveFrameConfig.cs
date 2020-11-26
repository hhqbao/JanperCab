using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformOptionMicrowaveFrameConfig : IEntityTypeConfiguration<DuraformOptionMicrowaveFrame>
    {
        public void Configure(EntityTypeBuilder<DuraformOptionMicrowaveFrame> builder)
        {
            builder.Property(x => x.TopSize)
                .HasColumnName("TopSize")
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.BottomSize)
                .HasColumnName("BottomSize")
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.LeftSize)
                .HasColumnName("LeftSize")
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.RightSize)
                .HasColumnName("RightSize")
                .HasColumnType("decimal(18,2)");
        }
    }
}