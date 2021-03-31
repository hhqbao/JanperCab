using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class MachineRouterConfig : IEntityTypeConfiguration<MachineRouter>
    {
        public void Configure(EntityTypeBuilder<MachineRouter> builder)
        {

        }
    }
}