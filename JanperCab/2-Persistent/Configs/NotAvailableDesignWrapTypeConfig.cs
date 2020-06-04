using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class NotAvailableDesignWrapTypeConfig : IEntityTypeConfiguration<NotAvailableDesignWrapType>
    {
        public void Configure(EntityTypeBuilder<NotAvailableDesignWrapType> builder)
        {
            builder.ToTable("NotAvailableDesignWrapTypes");

            builder.HasKey(x => new { x.DuraformDesignId, x.DuraformWrapTypeId });

            builder.HasOne(x => x.DuraformDesign)
                .WithMany(y => y.NotAvailableDesignWrapTypes)
                .HasForeignKey(x => x.DuraformDesignId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(x => x.DuraformWrapType)
                .WithMany(y => y.NotAvailableDesignWrapTypes)
                .HasForeignKey(x => x.DuraformWrapTypeId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}