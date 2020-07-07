using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformOptionDoubleSidedConfig : IEntityTypeConfiguration<DuraformOptionDoubleSided>
    {
        public void Configure(EntityTypeBuilder<DuraformOptionDoubleSided> builder)
        {
            builder.Property(x => x.HasProfile)
                .HasColumnName("HasProfile");
        }
    }
}