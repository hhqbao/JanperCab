using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class MachinePresserConfig : IEntityTypeConfiguration<MachinePresser>
    {
        public void Configure(EntityTypeBuilder<MachinePresser> builder)
        {

        }
    }
}