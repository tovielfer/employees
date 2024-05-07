using Microsoft.AspNetCore.Mvc;
using Solid.Core.Services;
using AutoMapper;
using Solid.Core.Entities;
using Solid.Core.DTOs;
using EmployeesServer.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeesServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;
        public EmployeeController(IEmployeeService employeeService, IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper = mapper;
        }

        // GET: api/<EmployeeController>
        [HttpGet]
        public ActionResult<IEnumerable<Employee>> GetAll()
        {
            var list = _employeeService.GetAll();
            var listDto = _mapper.Map<IEnumerable<EmployeeDto>>(list);
            return Ok(listDto);
        }

        // GET api/<EmployeeController>/5
        [HttpGet("{id}")]
        public ActionResult<Employee> GetById(int id)
        {
            var emp = _employeeService.GetById(id);
            if (emp == null)
                return NotFound("עובד לא קים");
            var empDto = _mapper.Map<EmployeeDto>(emp);
            return Ok(empDto);
        }

        // POST api/<EmployeeController>
        [Authorize]
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] EmployeePostModel employee)
        {
            try
            {
                var empToAdd = _mapper.Map<Employee>(employee);
                var addedEmployee = await _employeeService.AddEmployeeAsync(empToAdd);
                var newEmployee = _employeeService.GetById(addedEmployee.Id);
                var empDto = _mapper.Map<EmployeeDto>(newEmployee);
                return Ok(empDto);
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }

        // PUT api/<EmployeeController>/5
        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<Employee>> Put(int id, [FromBody] EmployeePostModel emp)
        {
            try
            {
                var empToUpdate = _mapper.Map<Employee>(emp);
                var updateedEmployee = await _employeeService.UpdateEmployeeAsync(id, empToUpdate);
                var newEmployee = _employeeService.GetById(updateedEmployee.Id);
                var empDto = _mapper.Map<EmployeeDto>(newEmployee);
                return Ok(empDto);
            }
            catch (Exception ex) { return BadRequest(ex); }
        }

        // DELETE api/<EmployeeController>/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Employee>> Delete(int id)
        {
            var deletedEmployee = await _employeeService.DeleteEmployeeAsync(id);
            if (deletedEmployee == null)
                return NotFound("עובד לא קים במערכת");
            var empDto = _mapper.Map<EmployeeDto>(deletedEmployee);
            return Ok(empDto);
        }
    }


}
