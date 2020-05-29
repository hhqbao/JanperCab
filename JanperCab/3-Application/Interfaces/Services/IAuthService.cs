using _1_Domain;
using _3_Application.Dtos.Auth;
using System.Threading.Tasks;

namespace _3_Application.Interfaces.Services
{
    public interface IAuthService
    {
        Task<UserTokenDto> Login(string email, string password);

        Task<ApplicationUser> Register(UserForRegister modelDto);
    }
}