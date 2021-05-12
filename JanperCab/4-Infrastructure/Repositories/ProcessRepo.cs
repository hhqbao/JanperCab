﻿using _1_Domain;
using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace _4_Infrastructure.Repositories
{
    public class ProcessRepo : BaseRepository<Process>, IProcessRepo
    {
        public ProcessRepo(DbContext dbContext) : base(dbContext)
        {
        }
    }
}