namespace FeedbackManagementService.DTOs
{
    public class CreateFeedbackDto
    {
        public int PatientId { get; set; }
        public string ServiceType { get; set; } = string.Empty;
        public int Rating { get; set; }
        public string Comment { get; set; } = string.Empty;
    }

    public class UpdateFeedbackDto
    {
        public int PatientId { get; set; }
        public string ServiceType { get; set; } = string.Empty;
        public int Rating { get; set; }
        public string Comment { get; set; } = string.Empty;
    }
}
