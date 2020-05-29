using _1_Domain;
using _3_Application.Interfaces.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace _4_Infrastructure.Services
{
    public class TokenGenerator : ITokenGenerator
    {
        private readonly IConfiguration _config;

        public TokenGenerator(IConfiguration config)
        {
            _config = config;
        }

        public string Create(ApplicationUser user, List<string> roles)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Email),
                new Claim(ClaimTypes.Name, user.Email)
            };

            if (roles.Any())
            {
                claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));
            }

            var tokenPhrase = _config.GetSection("AppSettings:SecretTokenKey").Value;
            var tokenExpiredInDays = _config.GetSection("AppSettings:TokenExpiredInDays").Value;

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenPhrase));
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(Convert.ToDouble(tokenExpiredInDays)),
                SigningCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512Signature)
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}