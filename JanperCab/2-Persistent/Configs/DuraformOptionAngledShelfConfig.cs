using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformOptionAngledShelfConfig : IEntityTypeConfiguration<DuraformOptionAngledShelf>
    {
        public void Configure(EntityTypeBuilder<DuraformOptionAngledShelf> builder)
        {
            builder.Property(x => x.SideOne)
                .HasColumnName("SideOne")
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.SideTwo)
                .HasColumnName("SideTwo")
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.IsDoubleSided)
                .HasColumnName("IsDoubleSided");
        }
    }
}