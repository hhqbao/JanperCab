using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformOptionFoldBackConfig : IEntityTypeConfiguration<DuraformOptionFoldBack>
    {
        public void Configure(EntityTypeBuilder<DuraformOptionFoldBack> builder)
        {
            builder.Property(x => x.HasProfile)
                .HasColumnName("HasProfile");

            builder.Property(x => x.LeftLength)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.RightLength)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.Thickness)
                .HasColumnType("decimal(18,2)");
        }
    }
}