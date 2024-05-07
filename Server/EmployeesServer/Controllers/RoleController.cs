using AutoMapper;
using EmployeesServer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Solid.Core.DTOs;
using Solid.Core.Entities;
using Solid.Core.Services;
using Solid.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace RolesServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;
        private readonly IMapper _mapper;
        public RoleController(IRoleService RoleService, IMapper mapper)
        {
            _roleService = RoleService;
            _mapper = mapper;
        }
        // GET: api/<RoleController>
        [HttpGet]
        public IActionResult GetAll()
        {
            var list =  _roleService.GetAll();
            var listDto = _mapper.Map<IEnumerable<RoleDto>>(list);
            return Ok(listDto);
        }

        // GET api/<RoleController>/5
        [HttpGet("{id}")]
        public ActionResult<Role> GetById(int id)
        {
            var role = _roleService.GetById(id);
            if (role == null)
                return NotFound("תפקיד לא קים");
            var roleDto = _mapper.Map<RoleDto>(role);
            return Ok(roleDto);
        }

        // POST api/<RoleController>
        [HttpPost]
        public async Task<ActionResult<Role>> Post([FromBody] RolePostModel role)
        {
            try
            {
                var roleToAdd = _mapper.Map<Role>(role);
                var addedRole = await _roleService.AddRoleAsync(roleToAdd);
                var newRole = _roleService.GetById(addedRole.Id);
                var roleDto = _mapper.Map<RoleDto>(newRole);
                return Ok(roleDto);
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }

        // PUT api/<RoleController>/5
        [HttpPut("{id}")]
        public  async Task<ActionResult<Role>> Put(int id, [FromBody] RolePostModel role)
        {
            try
            {
                var roleToUpdate = _mapper.Map<Role>(role);
                var updatedRole = await _roleService.UpdateRoleAsync(id, roleToUpdate);
                var newRole = _roleService.GetById(updatedRole.Id);
                var roleDto = _mapper.Map<RoleDto>(newRole);
                return Ok(roleDto);
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }

        // DELETE api/<RoleController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Role>> Delete(int id)
        {
            var deletedRole = await _roleService.DeleteRoleAsync(id);
            if (deletedRole == null)
                return NotFound("תפקיד לא קים במערכת");
            var roleDto = _mapper.Map<RoleDto>(deletedRole);
            return Ok(roleDto);
        }
    }
}
