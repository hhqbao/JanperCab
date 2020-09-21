using System.ComponentModel.DataAnnotations;

namespace _3_Application.Dtos.Auth
{
    public class UserForLogin
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(3, ErrorMessage = "Password must have minimum 3 characters.")]

        public string Password { get; set; }
    }
}