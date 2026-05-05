namespace LabTestManagementService.DTOs
{
    public class CreateLabTestDto
    {
        public int PatientId { get; set; }
        public string TestName { get; set; } = string.Empty;
        public string Status { get; set; } = "Pending";
        public string Result { get; set; } = string.Empty;
    }

    public class UpdateLabTestDto
    {
        public int PatientId { get; set; }
        public string TestName { get; set; } = string.Empty;
        public string Status { get; set; } = "Pending";
        public string Result { get; set; } = string.Empty;
    }
}
