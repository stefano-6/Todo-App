using Microsoft.EntityFrameworkCore;
using Rockfast.ApiDatabase;
using Rockfast.ServiceInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Rockfast.Dependencies
{
    public class TodoService<T> : ITodoService<T> where T : class
    {
        private readonly ApiDbContext _database;
        private DbSet<T> _dbSet;
        public TodoService(ApiDbContext db)
        {
            this._database = db;
            this._dbSet = _database.Set<T>();
        }

        // Add data into database
        public async Task<int> Create(T entity)
        {
            _dbSet.Add(entity);
            return await _database.SaveChangesAsync();
        }

        // Get all data from database
        public async Task<IEnumerable<T>> GetAll()
        {
            return await _dbSet.ToListAsync();
        }

        // Get single record from database
        public async Task<T> GetSingle(Expression<Func<T, bool>> predicate)
        {
            return await _database.Set<T>().FirstOrDefaultAsync<T>(predicate);
        }

        // Update record into database
        public async Task<int> Update(T entity)
        {
            _dbSet.Update(entity);
            return await _database.SaveChangesAsync();
        }

        // Remove record from database
        public async Task Remove(T entity)
        {
            _dbSet.Remove(entity);
            await _database.SaveChangesAsync();
        }
    }
}
