﻿using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DeloitteServerSide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ErrorsController : ControllerBase
    {
        [HttpGet]
        [Route("/error-development")]
        public IActionResult HandleErrorDevelopment(
    [FromServices] IHostEnvironment hostEnvironment)
        {
            if (!hostEnvironment.IsDevelopment())
            {
                return NotFound();
            }

            var exceptionHandlerFeature =
                HttpContext.Features.Get<IExceptionHandlerFeature>()!;

            return Problem(
                //detail: exceptionHandlerFeature.Error.StackTrace,
                title: exceptionHandlerFeature.Error.Message);
        }
        [HttpGet]
        [Route("/error")]
        public IActionResult Error()
        {
            return Problem();
        }
    }
}
