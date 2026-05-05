using Microsoft.EntityFrameworkCore;
using FeedbackManagementService.Models;

namespace FeedbackManagementService.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Feedback> Feedbacks { get; set; } = null!;
    }
}
