using _3_Application.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace _4_Infrastructure.Repositories
{
    public abstract class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        protected readonly DbContext _dbContext;
        protected readonly DbSet<T> _dbSet;

        protected BaseRepository(DbContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = dbContext.Set<T>();
        }

        public virtual async Task<bool> AnyAsync(Expression<Func<T, bool>> condition = null)
        {
            if (condition != null)
                return await _dbSet.AnyAsync(condition);

            return await _dbSet.AnyAsync();
        }

        public virtual async Task<T> GetAsync(object key)
        {
            return await _dbSet.FindAsync(key);
        }

        public virtual async Task<List<T>> GetAllAsync(Expression<Func<T, bool>> condition = null)
        {
            if (condition != null)
                return await _dbSet.Where(condition).ToListAsync();

            return await _dbSet.ToListAsync();
        }

        public virtual void Add(T entity)
        {
            _dbSet.Add(entity);
        }

        public virtual void AddRange(List<T> entities)
        {
            _dbSet.AddRange(entities);
        }

        public virtual void Remove(T entity)
        {
            _dbSet.Remove(entity);
        }

        public virtual void RemoveRange(List<T> entities)
        {
            _dbSet.RemoveRange(entities);
        }
    }
}