using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformMiscFingerPullConfig : IEntityTypeConfiguration<DuraformMiscFingerPull>
    {
        public void Configure(EntityTypeBuilder<DuraformMiscFingerPull> builder)
        {
            builder.Property(x => x.Type)
                .HasColumnName("Type");

            builder.Property(x => x.IsRaw)
                .HasColumnName("IsRaw");
        }
    }
}