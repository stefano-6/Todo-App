using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Rockfast.ServiceInterfaces
{
    public interface ITodoService<T>
    {
        Task<IEnumerable<T>> GetAll();
        Task<int> Create(T entity);
        Task<T> GetSingle(Expression<Func<T, bool>> predicate);
        // IEnumerable<T> Query(Expression<Func<T, bool>> predicate);
        Task<int> Update(T entity);
        Task Remove(T entity);
    }
}
