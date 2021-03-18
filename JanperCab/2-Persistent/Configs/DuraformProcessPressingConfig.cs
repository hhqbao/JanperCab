using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class DuraformProcessPressingConfig : IEntityTypeConfiguration<DuraformProcessPressing>
    {
        public void Configure(EntityTypeBuilder<DuraformProcessPressing> builder)
        {

        }
    }
}