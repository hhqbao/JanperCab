using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace _3_Application.Interfaces.Repositories
{
    public interface IBaseRepository<T> where T : class
    {
        Task<bool> AnyAsync(Expression<Func<T, bool>> condition = null);

        Task<T> GetAsync(object key);

        Task<List<T>> GetAllAsync(Expression<Func<T, bool>> condition = null);

        void Add(T entity);

        void AddRange(List<T> entities);

        void Remove(T entity);

        void RemoveRange(List<T> entities);
    }
}