using DeloitteServerSide.Models;

namespace DeloitteServerSide.Interface
{
    public interface IEmployeeService
    {
        Task<List<Employee>> GetAllAsync();
        Task<Employee> GetAsync(string id);
        Task CreateAsync(Employee employee);
        Task UpdateAsync(Employee employee);
        Task DeleteAsync(string id);
        Task<List<Employee>> SearchAsync(string? q);
    }
}
