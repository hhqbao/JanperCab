using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class EnquiryConfig : IEntityTypeConfiguration<Enquiry>
    {
        public void Configure(EntityTypeBuilder<Enquiry> builder)
        {
            builder.ToTable("Enquiries");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.CustomerReference)
                .IsRequired()
                .HasColumnType("varchar(500)");

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

            builder.Property(x => x.DeliveryNote)
                .HasColumnType("varchar(2000)");

            builder.Property(x => x.GstRate)
                .HasColumnName("GstRate")
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.DiscountRate)
                .HasColumnName("DiscountRate")
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.SubTotal)
                .HasColumnName("SubTotal")
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.DeliveryFee)
                .HasColumnName("DeliveryFee")
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.TotalGst)
                .HasColumnName("TotalGst")
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.TotalPrice)
                .HasColumnName("TotalPrice")
                .HasColumnType("decimal(18,2)");

            builder.HasOne(x => x.Creator)
                .WithMany(y => y.Enquiries)
                .HasForeignKey(x => x.CreatorId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.Distributor)
                .WithMany(y => y.Enquiries)
                .IsRequired()
                .HasForeignKey(x => x.DistributorId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.CabinetMaker)
                .WithMany(y => y.Enquiries)
                .IsRequired()
                .HasForeignKey(x => x.CabinetMakerId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.DeliveryRunSheet)
                .WithMany(y => y.Enquiries)
                .HasForeignKey(x => x.DeliveryRunSheetId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}