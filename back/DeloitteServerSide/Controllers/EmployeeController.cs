
using DeloitteServerSide.Interface;
using DeloitteServerSide.Models;
using DeloitteServerSide.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DeloitteServerSide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search(string? q)
        {
            
            //if (q is null)
            //{
            //    var allEmployees = await _employeeService.SearchAsync("");
            //    Ok(allEmployees);
            //}
            var selectEmployees = await _employeeService.SearchAsync(q);
            if (selectEmployees.Any())
            {
                return Ok(selectEmployees);
            }
            return NotFound("Error : No employees were found in the database");
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            
                var allEmployees = await _employeeService.GetAllAsync();
                if (allEmployees.Any())
                {
                    return Ok(allEmployees);
                }
                return BadRequest("Error : Not receiving a response from the database");
            
            
        }

        // GET api/<EmployeeController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            
                var employees = await _employeeService.GetAsync(id);
                if (employees is null)
                {
                    return NotFound("Error : The employee's ID number was not found");
                }
                return Ok(employees);
            
            
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Employee employee)
        {
            await _employeeService.CreateAsync(employee);
            return CreatedAtAction(nameof(Get), new { id = employee.Id }, employee);
        }

        // PUT api/<EmployeeController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] Employee employee)
        {
            var existingEmployee=await _employeeService.GetAsync(id);

            if (existingEmployee is null)
            {
                return NotFound("Error : The employee's ID number was not found");
            }
            employee.Id= existingEmployee.Id;
            await _employeeService.UpdateAsync(employee);
            return NoContent();
        }

        // DELETE api/<EmployeeController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var employee = await _employeeService.GetAsync(id);
            if (employee is null)
            {
                return NotFound("Error : The employee's ID number was not found");
            }

            await _employeeService.DeleteAsync(id);

            return NoContent();
        }
    }
}
