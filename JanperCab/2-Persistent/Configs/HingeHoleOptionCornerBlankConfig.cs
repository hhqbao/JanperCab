using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class HingeHoleOptionCornerBlankConfig : IEntityTypeConfiguration<HingeHoleOptionCornerBlank>
    {
        public void Configure(EntityTypeBuilder<HingeHoleOptionCornerBlank> builder)
        {

        }
    }
}