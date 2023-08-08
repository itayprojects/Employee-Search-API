using DeloitteServerSide.Interface;

namespace DeloitteServerSide.Models
{
    public class MongoDBSettings: IMongoDBSettings
    {
        public string ConnectionString { get; set; }=null!;
        public string CollectionName { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
    }
}
