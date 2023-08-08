namespace DeloitteServerSide.Interface
{
    public interface IMongoDBSettings
    {
        string ConnectionString { get; set; }
        string CollectionName { get; set; }
        string DatabaseName { get; set; }
    }
}
