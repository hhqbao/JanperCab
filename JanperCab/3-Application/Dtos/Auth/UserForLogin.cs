using System.ComponentModel.DataAnnotations;

namespace _3_Application.Dtos.Auth
{
    public class UserForLogin
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(6, ErrorMessage = "Password must have minimum 6 characters.")]

        public string Password { get; set; }
    }
}