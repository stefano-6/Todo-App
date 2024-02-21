using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Rockfast.ApiDatabase.DomainModels;
using Rockfast.ServiceInterfaces;
using Rockfast.ViewModels;

namespace Rockfast.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private readonly ITodoService<Todo> _todoService;
        private readonly ITodoService<User> _userService;
        private ILogger<TodosController> _logger;
        public TodosController(ITodoService<Todo> todoService, ITodoService<User> userService, ILogger<TodosController> logger)
        {
            this._todoService = todoService;
            this._userService = userService;
            this._logger = logger;
        }

        [HttpGet]
        public async Task<IEnumerable<TodoVM>> Get()
        {
            try
            {
                // Variables
                List<TodoVM> todoVMs = new List<TodoVM>();

                // GET all tasks from the databace
                IEnumerable<Todo> tasks = await _todoService.GetAll();
                
        
                // GET user of the task and build the list of TodoVM
                foreach (var t in tasks)
                {
                    TodoVM todoVm = new TodoVM();
                    todoVm.Task = t;

                    User user = await _userService.GetSingle(u => u.Id == t.UserId);
                    todoVm.User = user;

                    todoVMs.Add(todoVm);
                }

                return todoVMs;
            }
            catch (System.Exception ex)
            {
                throw ex;
            }
            
        }

        [HttpPost]
        public async Task<TodoVM> Post(TodoVM model)
        {
            try
            {
                // Check if VM is not null and save the data in the database
                if (model.Task != null)
                {
                    await _todoService.Create(model.Task);
                    return model;
                }
            }
            catch (System.Exception ex)
            {
                throw ex;
            };

            return null;
        }

        [HttpPut]
        public async Task<TodoVM> Put(TodoVM model)
        {
            try
            {
                // Check if VM is not null and update the data in the database
                if (model != null)
                {
                    await _todoService.Update(model.Task);
                    return model;
                }
            }
            catch (System.Exception ex)
            {
                throw ex;
            };

            return null;
        }

        [HttpDelete]
        public async Task Delete(int id)
        {
            try
            {
                // Delete the data from the database
                Todo todo = await _todoService.GetSingle(t => t.Id == id);
                await _todoService.Remove(todo);
            }
            catch (System.Exception ex)
            {
                
                throw ex;
            }
        }
    }
}
