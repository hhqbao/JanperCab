using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class InvoiceConfig : IEntityTypeConfiguration<Invoice>
    {
        public void Configure(EntityTypeBuilder<Invoice> builder)
        {
            builder.ToTable("Invoices");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedNever();

            builder.HasIndex(x => x.EnquiryId)
                .IsUnique();

            builder.Property(x => x.GstRate)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.DiscountRate)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.SubTotal)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.DeliveryFee)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.TotalGst)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.TotalPrice)
                .HasColumnType("decimal(18,2)");

            builder.HasOne(x => x.Enquiry)
                .WithOne(y => y.Invoice)
                .HasForeignKey<Invoice>(x => x.EnquiryId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}