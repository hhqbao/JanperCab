using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformFormConfig : IEntityTypeConfiguration<DuraformForm>
    {
        public void Configure(EntityTypeBuilder<DuraformForm> builder)
        {
            builder.ToTable("DuraformForms");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.CustomerOrderNumber)
                .HasColumnType("varchar(500)")
                .IsRequired();

            builder.Property(x => x.InvoiceTo)
                .HasColumnType("varchar(255)");

            builder.Property(x => x.InvoiceAddress)
                .HasColumnType("varchar(255)");

            builder.Property(x => x.InvoiceSuburb)
                .HasColumnType("varchar(255)");

            builder.Property(x => x.InvoiceState)
                .HasColumnType("varchar(255)");

            builder.Property(x => x.InvoicePostcode)
                .HasColumnType("varchar(255)");

            builder.Property(x => x.DeliveryTo)
                .HasColumnType("varchar(255)");

            builder.Property(x => x.DeliveryAddress)
                .HasColumnType("varchar(255)");

            builder.Property(x => x.DeliverySuburb)
                .HasColumnType("varchar(255)");

            builder.Property(x => x.DeliveryState)
                .HasColumnType("varchar(255)");

            builder.Property(x => x.DeliveryPostcode)
                .HasColumnType("varchar(255)");

            builder.HasOne(x => x.DuraformDesign)
                .WithMany(y => y.DuraformForms)
                .HasForeignKey(x => x.DuraformDesignId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.DuraformSerie)
                .WithMany(y => y.DuraformForms)
                .HasForeignKey(x => x.DuraformSerieId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.DuraformWrapType)
                .WithMany(y => y.DuraformForms)
                .HasForeignKey(x => x.DuraformWrapTypeId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.DuraformWrapColor)
                .WithMany(y => y.DuraformForms)
                .HasForeignKey(x => x.DuraformWrapColorId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.DuraformEdgeProfile)
                .WithMany(y => y.DuraformForms)
                .HasForeignKey(x => x.DuraformEdgeProfileId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.HingeHoleType)
                .WithMany(y => y.DuraformForms)
                .HasForeignKey(x => x.HingeHoleTypeId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.DuraformArch)
                .WithMany(y => y.DuraformForms)
                .HasForeignKey(x => x.DuraformArchId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.CreatedByUser)
                .WithMany(y => y.DuraformForms)
                .HasForeignKey(x => x.CreatedByUserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}