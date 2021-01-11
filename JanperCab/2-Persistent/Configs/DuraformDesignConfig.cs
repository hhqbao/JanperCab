using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformDesignConfig : IEntityTypeConfiguration<DuraformDesign>
    {
        public void Configure(EntityTypeBuilder<DuraformDesign> builder)
        {
            builder.ToTable("DuraformDesigns");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Name)
                .IsRequired()
                .HasColumnType("varchar(255)");

            builder.Property(x => x.ImageUrl)
                .HasColumnType("varchar(1000)");

            builder.Property(x => x.Thickness)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.ICB_EXTERNAL_SHAPE_FILE)
                .HasColumnType("varchar(1000)");

            builder.Property(x => x.ICB_TOOLING)
                .IsRequired()
                .HasColumnType("varchar(1000)");

            builder.Property(x => x.ICB_GLASS_TOOLING)
                .IsRequired()
                .HasColumnType("varchar(1000)");

            builder.Property(x => x.DrawerBorderOffset)
                .HasColumnType("decimal(18,2)");

            builder.HasOne(x => x.DuraformSerie)
                .WithMany(y => y.DuraformDesigns)
                .HasForeignKey(x => x.DuraformSerieId)
                .OnDelete(DeleteBehavior.Restrict)
                .IsRequired();

            builder.HasOne(x => x.DefaultEdgeProfile)
                .WithMany(y => y.DuraformDesignsWithDefault)
                .HasForeignKey(x => x.DefaultEdgeProfileId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}