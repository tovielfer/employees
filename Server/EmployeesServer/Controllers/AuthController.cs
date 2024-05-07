using AutoMapper;
using EmployeesServer.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Solid.Core.Entities;
using Solid.Core.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly ILoginService _loginService;
    private readonly IMapper _mapper;

    public AuthController(IConfiguration configuration,ILoginService loginService,IMapper mapper)
    {
        _configuration = configuration;
        _loginService = loginService;
        _mapper = mapper;
    }

    [HttpPost]
    public IActionResult Login([FromBody] LoginPostModel loginModel)
    {
        var login=_mapper.Map<Login>(loginModel);
        if (_loginService.Login(login)!=null)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, loginModel.UserName),
                new Claim(ClaimTypes.Role, "manager"),
            };

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("JWT:Key")));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokeOptions = new JwtSecurityToken(
                issuer: _configuration.GetValue<string>("JWT:Issuer"),
                audience: _configuration.GetValue<string>("JWT:Audience"),
                claims: claims,
                expires: DateTime.Now.AddHours(5),
                signingCredentials: signinCredentials
            );
            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return Ok(new { Token = tokenString });
        }
        return Unauthorized();
    }
}
