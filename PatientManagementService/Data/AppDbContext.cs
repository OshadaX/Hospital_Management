using Microsoft.EntityFrameworkCore;
using PatientManagementService.Models;

namespace PatientManagementService.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Patient> Patients { get; set; } = null!;
    }
}
