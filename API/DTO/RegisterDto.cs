using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class RegisterDto : AccountControllerDto
    {
        public string Email { get; set; }
    }
}