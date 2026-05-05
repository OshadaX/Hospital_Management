using System;

namespace FeedbackManagementService.Models
{
    public class Feedback
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public string ServiceType { get; set; } = string.Empty;
        public int Rating { get; set; }
        public string Comment { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
