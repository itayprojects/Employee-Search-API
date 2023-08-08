using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace DeloitteServerSide.Models
{
    [BsonIgnoreExtraElements]
    public class Employee
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("imageUrl")]
        [JsonPropertyName("imageUrl")]
        public string ImageUrl { get; set; } = null!;

        [BsonElement("workTitle")]
        [JsonPropertyName("workTitle")]
        public string WorkTitle { get; set; } = null!;

        [BsonElement("name")]
        [JsonPropertyName("name")]
        public string Name { get; set; } = null!;
    }
}
