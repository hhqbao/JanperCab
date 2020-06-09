﻿using _2_Persistent;
using _3_Application.Interfaces.Repositories;
using System.Threading.Tasks;

namespace _4_Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _dbContext;

        public IDuraformSerieRepo DuraformSeries { get; }

        public IDuraformDesignRepo DuraformDesigns { get; }

        public IDuraformWrapTypeRepo DuraformWrapTypes { get; }

        public IDuraformWrapColorRepo DuraformWrapColors { get; }

        public IDuraformEdgeProfileRepo DuraformEdgeProfiles { get; }

        public IDuraformArchRepo DuraformArches { get; }

        public IDuraformDoorOptionRepo DuraformDoorOptions { get; }

        public IPantryDoorChairRailTypeRepo PantryDoorChairRailTypes { get; }

        public UnitOfWork(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;

            DuraformSeries = new DuraformSerieRepo(_dbContext);
            DuraformDesigns = new DuraformDesignRepo(_dbContext);
            DuraformWrapTypes = new DuraformWrapTypeRepo(_dbContext);
            DuraformWrapColors = new DuraformWrapColorRepo(_dbContext);
            DuraformEdgeProfiles = new DuraformEdgeProfileRepo(_dbContext);
            DuraformArches = new DuraformArchRepo(_dbContext);
            DuraformDoorOptions = new DuraformDoorOptionRepo(_dbContext);
            PantryDoorChairRailTypes = new PantryDoorChairRailTypeRepo(_dbContext);
        }

        public async Task<int> CompleteAsync()
        {
            return await _dbContext.SaveChangesAsync();
        }
    }
}