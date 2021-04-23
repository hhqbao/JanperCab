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

            builder.Property(x => x.CustomerReference)
                .IsRequired()
                .HasColumnType("varchar(500)");

            builder.Property(x => x.DoorType)
                .IsRequired()
                .HasColumnType("varchar(1000)");

            builder.Property(x => x.DoorColor)
                .IsRequired()
                .HasColumnType("varchar(1000)");

            builder.Property(x => x.InvoiceTo)
                .IsRequired()
                .HasColumnType("varchar(255)");

            builder.Property(x => x.InvoiceAddress)
                .IsRequired()
                .HasColumnType("varchar(255)");

            builder.Property(x => x.InvoiceSuburb)
                .IsRequired()
                .HasColumnType("varchar(255)");

            builder.Property(x => x.InvoiceState)
                .IsRequired()
                .HasColumnType("varchar(255)");

            builder.Property(x => x.InvoicePostcode)
                .IsRequired()
                .HasColumnType("varchar(255)");

            builder.Property(x => x.DeliveryTo)
                .IsRequired()
                .HasColumnType("varchar(255)");

            builder.Property(x => x.DeliveryAddress)
                .IsRequired()
                .HasColumnType("varchar(255)");

            builder.Property(x => x.DeliverySuburb)
                .IsRequired()
                .HasColumnType("varchar(255)");

            builder.Property(x => x.DeliveryState)
                .IsRequired()
                .HasColumnType("varchar(255)");

            builder.Property(x => x.DeliveryPostcode)
                .IsRequired()
                .HasColumnType("varchar(255)");

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

            builder.HasOne(x => x.CabinetMaker)
                .WithMany(y => y.Invoices)
                .HasForeignKey(x => x.CabinetMakerId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.Distributor)
                .WithMany(y => y.Invoices)
                .HasForeignKey(x => x.DistributorId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}