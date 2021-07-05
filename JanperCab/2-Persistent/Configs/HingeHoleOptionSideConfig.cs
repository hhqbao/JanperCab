using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class HingeHoleOptionSideConfig : IEntityTypeConfiguration<HingeHoleOptionSide>
    {
        public void Configure(EntityTypeBuilder<HingeHoleOptionSide> builder)
        {
            builder.Property(x => x.Top)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.TopCenter)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.MiddleOne)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.BottomCenter)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.Bottom)
                .HasColumnType("decimal(18,2)");
        }
    }
}