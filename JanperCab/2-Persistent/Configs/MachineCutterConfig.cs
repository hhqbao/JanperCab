﻿using _1_Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace _2_Persistent.Configs
{
    public class MachineCutterConfig : IEntityTypeConfiguration<MachineCutter>
    {
        public void Configure(EntityTypeBuilder<MachineCutter> builder)
        {

        }
    }
}