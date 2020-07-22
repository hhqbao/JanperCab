using _1_Domain;
using _3_Application.Dtos.Auth;
using _3_Application.Dtos.Customer;
using _3_Application.Interfaces.Repositories;
using _3_Application.Interfaces.Services;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace _4_Infrastructure.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ITokenGenerator _tokenGenerator;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AuthService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, ITokenGenerator tokenGenerator, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenGenerator = tokenGenerator;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<UserTokenDto> Login(string email, string password)
        {
            const string message = "There was a problem logging in. Check your email and password or create an account.";
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
                throw new Exception(message);

            var result = await _signInManager.CheckPasswordSignInAsync(user, password, false);

            if (!result.Succeeded)
                throw new Exception(message);

            var roles = await _userManager.GetRolesAsync(user);

            return new UserTokenDto
            {
                Token = _tokenGenerator.Create(user, roles.ToList()),
                Customer = _mapper.Map<Customer, CustomerDto>(user.Customer)
            };
        }

        public async Task<ApplicationUser> Register(UserForRegister modelDto)
        {
            var user = new ApplicationUser
            {
                UserName = modelDto.Email,
                Email = modelDto.Email
            };

            var result = await _userManager.CreateAsync(user, modelDto.Password);

            if (!result.Succeeded)
                throw new Exception(result.Errors.SingleOrDefault()?.Description);

            return user;
        }
    }
}