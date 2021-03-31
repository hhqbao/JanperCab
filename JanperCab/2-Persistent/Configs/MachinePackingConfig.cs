using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class MachinePackingConfig : IEntityTypeConfiguration<MachinePacking>
    {
        public void Configure(EntityTypeBuilder<MachinePacking> builder)
        {

        }
    }
}