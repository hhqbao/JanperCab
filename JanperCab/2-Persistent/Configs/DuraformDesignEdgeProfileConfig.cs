using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformDesignEdgeProfileConfig : IEntityTypeConfiguration<DuraformDesignEdgeProfile>
    {
        public void Configure(EntityTypeBuilder<DuraformDesignEdgeProfile> builder)
        {
            builder.ToTable("DuraformDesignEdgeProfiles");

            builder.HasKey(x => new { x.DuraformDesignId, x.DuraformEdgeProfileId });

            builder.HasOne(x => x.DuraformDesign)
                .WithMany(y => y.AllowedEdgeProfiles)
                .HasForeignKey(x => x.DuraformDesignId)
                .IsRequired();

            builder.HasOne(x => x.DuraformEdgeProfile)
                .WithMany(y => y.DuraformDesignEdgeProfiles)
                .HasForeignKey(x => x.DuraformEdgeProfileId)
                .IsRequired();
        }
    }
}