using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class CabinetMakerConfig : IEntityTypeConfiguration<CabinetMaker>
    {
        public void Configure(EntityTypeBuilder<CabinetMaker> builder)
        {

        }
    }
}