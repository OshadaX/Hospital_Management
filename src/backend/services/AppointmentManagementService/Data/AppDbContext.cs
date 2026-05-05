using Microsoft.EntityFrameworkCore;
using AppointmentManagementService.Models;

namespace AppointmentManagementService.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Appointment> Appointments { get; set; } = null!;
    }
}
