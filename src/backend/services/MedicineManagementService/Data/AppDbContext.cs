using Microsoft.EntityFrameworkCore;
using MedicineManagementService.Models;

namespace MedicineManagementService.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Medicine> Medicines { get; set; } = null!;
    }
}
