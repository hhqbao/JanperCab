using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformMiscComponentConfig : IEntityTypeConfiguration<DuraformMiscComponent>
    {
        public void Configure(EntityTypeBuilder<DuraformMiscComponent> builder)
        {
            builder.ToTable("DuraformMiscComponents");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.UnitPrice)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.SubTotal)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.TotalDiscount)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.TotalPrice)
                .HasColumnType("decimal(18,2)");

            builder.HasOne(x => x.DuraformEnquiry)
                .WithMany(y => y.MiscComponents)
                .HasForeignKey(x => x.DuraformEnquiryId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}