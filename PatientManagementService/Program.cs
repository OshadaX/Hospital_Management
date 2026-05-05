using Microsoft.EntityFrameworkCore;
using PatientManagementService.Data;
using PatientManagementService.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddHttpLogging(o => { });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "PatientManagementService API", Version = "v1" });
});

// EF Core InMemory
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("PatientDb"));

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
    if (!context.Patients.Any())
    {
        context.Patients.AddRange(
            new Patient { FullName = "John Doe", DateOfBirth = new DateTime(1985, 5, 20), Gender = "Male", Email = "john@example.com", PhoneNumber = "1234567890", Address = "123 Main St" },
            new Patient { FullName = "Jane Smith", DateOfBirth = new DateTime(1992, 8, 15), Gender = "Female", Email = "jane@example.com", PhoneNumber = "0987654321", Address = "456 Oak Ave" },
            new Patient { FullName = "Robert Brown", DateOfBirth = new DateTime(1978, 11, 30), Gender = "Male", Email = "robert@example.com", PhoneNumber = "5556667777", Address = "789 Pine Rd" }
        );
        context.SaveChanges();
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || true) // Always enable Swagger for testing
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseHttpLogging();
app.UseAuthorization();
app.MapControllers();

app.Run("http://localhost:5001");
