using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformMiscCapMouldConfig : IEntityTypeConfiguration<DuraformMiscCapMould>
    {
        public void Configure(EntityTypeBuilder<DuraformMiscCapMould> builder)
        {
            builder.Property(x => x.Size)
                .HasColumnName("Size");

            builder.Property(x => x.IsRaw)
                .HasColumnName("IsRaw");
        }
    }
}