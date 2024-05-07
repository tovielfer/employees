using AutoMapper;
using EmployeesServer.Models;
using Solid.Core.DTOs;
using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<EmployeePostModel, Employee>().ForMember(dest => dest.Status, opt => opt.MapFrom(src => true));
            CreateMap<RolePostModel, Role>();
            CreateMap<LoginPostModel, Login>();
            CreateMap<EmployeeRolePostModel, EmployeeRole>();
            CreateMap<Employee, EmployeeDto>().ReverseMap();
            CreateMap<RoleDto,Role>().ReverseMap();
            CreateMap<EmployeeRole, EmployeeRoleDto>();
        }
    }
}
