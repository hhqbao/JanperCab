using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class InvoiceComponentConfig : IEntityTypeConfiguration<InvoiceComponent>
    {
        public void Configure(EntityTypeBuilder<InvoiceComponent> builder)
        {
            builder.ToTable("InvoiceComponents");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Description)
                .IsRequired()
                .HasColumnType("varchar(1000)");

            builder.Property(x => x.UnitPrice)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.SubTotal)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.TotalDiscount)
                .HasColumnType("decimal(18,2)");

            builder.Property(x => x.TotalPrice)
                .HasColumnType("decimal(18,2)");

            builder.HasOne(x => x.Invoice)
                .WithMany(y => y.InvoiceComponents)
                .HasForeignKey(x => x.InvoiceId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}