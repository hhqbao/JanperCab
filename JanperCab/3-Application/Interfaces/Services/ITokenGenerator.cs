using _1_Domain;
using System.Collections.Generic;

namespace _3_Application.Interfaces.Services
{
    public interface ITokenGenerator
    {
        string Create(ApplicationUser user, List<string> roles);
    }
}