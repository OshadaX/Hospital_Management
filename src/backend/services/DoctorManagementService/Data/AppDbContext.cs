using Microsoft.EntityFrameworkCore;
using DoctorManagementService.Models;

namespace DoctorManagementService.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Doctor> Doctors { get; set; } = null!;
    }
}
