using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class CabinetMakerConfig : IEntityTypeConfiguration<CabinetMaker>
    {
        public void Configure(EntityTypeBuilder<CabinetMaker> builder)
        {
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

            builder.Property(x => x.SecondPhone)
                .HasColumnType("varchar(255)");

            builder.Property(x => x.ThirdPhone)
                .HasColumnType("varchar(255)");

            builder.Property(x => x.DeliveryFee)
                .HasColumnType("decimal(18,2)");
        }
    }
}