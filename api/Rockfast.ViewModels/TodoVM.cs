using Rockfast.ApiDatabase;
using Rockfast.ApiDatabase.DomainModels;

namespace Rockfast.ViewModels
{
    public class TodoVM
    {
        public Todo Task { get; set; }
        public User User { get; set; }
    }
}