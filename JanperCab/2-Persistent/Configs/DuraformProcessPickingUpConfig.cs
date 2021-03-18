using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformProcessPickingUpConfig : IEntityTypeConfiguration<DuraformProcessPickingUp>
    {
        public void Configure(EntityTypeBuilder<DuraformProcessPickingUp> builder)
        {

        }
    }
}