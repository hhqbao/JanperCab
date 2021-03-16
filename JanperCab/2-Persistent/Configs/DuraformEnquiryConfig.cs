using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformEnquiryConfig : IEntityTypeConfiguration<DuraformEnquiry>
    {
        public void Configure(EntityTypeBuilder<DuraformEnquiry> builder)
        {
            builder.HasOne(x => x.DuraformDesign)
                .WithMany(y => y.DuraformEnquiries)
                .HasForeignKey(x => x.DuraformDesignId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.DuraformSerie)
                .WithMany(y => y.DuraformEnquiries)
                .HasForeignKey(x => x.DuraformSerieId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.DuraformWrapType)
                .WithMany(y => y.DuraformEnquiries)
                .HasForeignKey(x => x.DuraformWrapTypeId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.DuraformWrapColor)
                .WithMany(y => y.DuraformEnquiries)
                .HasForeignKey(x => x.DuraformWrapColorId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.DuraformEdgeProfile)
                .WithMany(y => y.DuraformEnquiries)
                .HasForeignKey(x => x.DuraformEdgeProfileId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.HingeHoleType)
                .WithMany(y => y.DuraformEnquiries)
                .HasForeignKey(x => x.HingeHoleTypeId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(x => x.DuraformArch)
                .WithMany(y => y.DuraformEnquiries)
                .HasForeignKey(x => x.DuraformArchId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}