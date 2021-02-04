using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformPriceGridConfig : IEntityTypeConfiguration<DuraformPriceGrid>
    {
        public void Configure(EntityTypeBuilder<DuraformPriceGrid> builder)
        {
            builder.ToTable("DuraformPriceGrids");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.MinHeight)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.MaxHeight)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.MinWidth)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.MaxWidth)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.Price)
                .HasColumnType("decimal(18,2)");

            builder.HasOne(x => x.DuraformSerie)
                .WithMany(y => y.DuraformPriceGrids)
                .HasForeignKey(x => x.DuraformSerieId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.DuraformWrapType)
                .WithMany(y => y.DuraformPriceGrids)
                .HasForeignKey(x => x.DuraformWrapTypeId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}