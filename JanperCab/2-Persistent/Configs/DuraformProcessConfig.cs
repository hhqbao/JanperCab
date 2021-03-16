using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformProcessConfig : IEntityTypeConfiguration<DuraformProcess>
    {
        public void Configure(EntityTypeBuilder<DuraformProcess> builder)
        {
            builder.ToTable("DuraformProcesses");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.HasOne(x => x.DuraformEnquiry)
                .WithMany(y => y.DuraformProcesses)
                .HasForeignKey(x => x.DuraformEnquiryId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}