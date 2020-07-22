using _3_Application.Dtos.Customer;

namespace _3_Application.Dtos.Auth
{
    public class UserTokenDto
    {
        public string Token { get; set; }

        public CustomerDto Customer { get; set; }
    }
}