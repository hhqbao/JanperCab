using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class CustomerCategoryCBDConfig : IEntityTypeConfiguration<CustomerCategoryCBD>
    {
        public void Configure(EntityTypeBuilder<CustomerCategoryCBD> builder)
        {

        }
    }
}