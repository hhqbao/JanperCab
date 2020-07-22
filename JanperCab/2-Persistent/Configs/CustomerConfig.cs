using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class CustomerConfig : IEntityTypeConfiguration<Customer>
    {
        public void Configure(EntityTypeBuilder<Customer> builder)
        {
            builder.ToTable("Customers");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Name)
                .IsRequired()
                .HasColumnType("varchar(255)");

            builder.Property(x => x.ImageUrl)
                .HasColumnType("varchar(MAX)");

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

            builder.HasMany(x => x.ApplicationUsers)
                .WithOne(y => y.Customer)
                .IsRequired()
                .HasForeignKey(y => y.CustomerId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(x => x.DuraformForms)
                .WithOne(y => y.Customer)
                .IsRequired()
                .HasForeignKey(y => y.CustomerId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}