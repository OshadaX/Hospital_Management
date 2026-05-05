using System;

namespace LabTestManagementService.Models
{
    public class LabTest
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public string TestName { get; set; } = string.Empty;
        public string Status { get; set; } = "Pending";
        public string Result { get; set; } = string.Empty;
        public DateTime RequestedAt { get; set; } = DateTime.UtcNow;
    }
}
