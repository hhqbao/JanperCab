﻿using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class HingeHoleOptionDrawConfig : IEntityTypeConfiguration<HingeHoleOptionDraw>
    {
        public void Configure(EntityTypeBuilder<HingeHoleOptionDraw> builder)
        {

        }
    }
}