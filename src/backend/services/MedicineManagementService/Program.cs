using Microsoft.EntityFrameworkCore;
using MedicineManagementService.Data;
using MedicineManagementService.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddHttpLogging(o => { });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "MedicineManagementService API", Version = "v1" });
});

// EF Core InMemory
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("MedicineDb"));

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();

// Seed Data
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    if (!context.Medicines.Any())
    {
        context.Medicines.AddRange(
            new Medicine { Name = "Paracetamol", Category = "Analgesic", Quantity = 100, Price = 5.50m, ExpiryDate = DateTime.UtcNow.AddYears(2) },
            new Medicine { Name = "Amoxicillin", Category = "Antibiotic", Quantity = 50, Price = 12.00m, ExpiryDate = DateTime.UtcNow.AddYears(1) },
            new Medicine { Name = "Ibuprofen", Category = "Anti-inflammatory", Quantity = 80, Price = 8.75m, ExpiryDate = DateTime.UtcNow.AddYears(2) }
        );
        context.SaveChanges();
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || true)
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseHttpLogging();
app.UseAuthorization();
app.MapControllers();

app.Run("http://localhost:5005");
