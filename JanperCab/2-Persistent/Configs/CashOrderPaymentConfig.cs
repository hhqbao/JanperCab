using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class CashOrderPaymentConfig : IEntityTypeConfiguration<CashOrderPayment>
    {
        public void Configure(EntityTypeBuilder<CashOrderPayment> builder)
        {
            builder.ToTable("CashOrderPayments");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.Property(x => x.Amount)
                .HasColumnType("decimal(18,2)");

            builder.HasOne(x => x.Enquiry)
                .WithMany(y => y.CashOrderPayments)
                .HasForeignKey(x => x.EnquiryId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}