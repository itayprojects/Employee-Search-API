using DeloitteServerSide.Interface;
using DeloitteServerSide.Models;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace DeloitteServerSide.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IMongoCollection<Employee> _employeesCollection;
        public EmployeeService(IOptions<MongoDBSettings> mongoDBSettings)
        {
            var client= new MongoClient(mongoDBSettings.Value.ConnectionString);
            var database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
            _employeesCollection=database.GetCollection<Employee>(mongoDBSettings.Value.CollectionName);
        }

        public async Task CreateAsync(Employee employee)
        {
            await _employeesCollection.InsertOneAsync(employee);
            return;
        }

        public async Task DeleteAsync(string id)
        {
            await _employeesCollection.DeleteOneAsync(e => e.Id == id);
            return;
        }
        public async Task<List<Employee>> SearchAsync(string? query)
        {
            if (query !=null)
            {
                return await _employeesCollection.Find(q => (q.Name.ToLower().Contains(query.ToLower()) || q.WorkTitle.ToLower().Contains(query.ToLower()))).ToListAsync();
            }
            return await _employeesCollection.Find(new BsonDocument()).ToListAsync();

        }

        public async Task<List<Employee>> GetAllAsync()
        {
            return await _employeesCollection.Find(new BsonDocument()).ToListAsync();
        }

        public async Task<Employee> GetAsync(string id)
        {
            return await _employeesCollection.Find(e => e.Id == id).FirstOrDefaultAsync();
        }

        public async Task UpdateAsync(Employee employee)
        {
            await _employeesCollection.ReplaceOneAsync(e => e.Id == employee.Id, employee);
            return;
        }
    }
}
