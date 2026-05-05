using Microsoft.EntityFrameworkCore;
using LabTestManagementService.Models;

namespace LabTestManagementService.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<LabTest> LabTests { get; set; } = null!;
    }
}
