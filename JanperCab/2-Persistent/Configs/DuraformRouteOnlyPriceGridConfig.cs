using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformRouteOnlyPriceGridConfig : IEntityTypeConfiguration<DuraformRouteOnlyPriceGrid>
    {
        public void Configure(EntityTypeBuilder<DuraformRouteOnlyPriceGrid> builder)
        {

        }
    }
}