using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class HingeHoleOptionCornerDoorConfig : IEntityTypeConfiguration<HingeHoleOptionCornerDoor>
    {
        public void Configure(EntityTypeBuilder<HingeHoleOptionCornerDoor> builder)
        {
            builder.Property(x => x.LeftTop)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.LeftBottom)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.RightTop)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.RightBottom)
                .HasColumnType("decimal(18,2)");
        }
    }
}