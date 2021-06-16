using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class ProcessConfig : IEntityTypeConfiguration<Process>
    {
        public void Configure(EntityTypeBuilder<Process> builder)
        {
            builder.ToTable("Processes");

            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id)
                .ValueGeneratedOnAdd();

            builder.HasOne(x => x.Enquiry)
                .WithMany(y => y.Processes)
                .HasForeignKey(x => x.EnquiryId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}