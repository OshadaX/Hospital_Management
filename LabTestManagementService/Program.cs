using Microsoft.EntityFrameworkCore;
using LabTestManagementService.Data;
using LabTestManagementService.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddHttpLogging(o => { });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "LabTestManagementService API", Version = "v1" });
});

// EF Core InMemory
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("LabTestDb"));

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
    if (!context.LabTests.Any())
    {
        context.LabTests.AddRange(
            new LabTest { PatientId = 1, TestName = "Blood Count", Status = "Completed", Result = "Normal", RequestedAt = DateTime.UtcNow },
            new LabTest { PatientId = 2, TestName = "Urinalysis", Status = "Pending", Result = "", RequestedAt = DateTime.UtcNow },
            new LabTest { PatientId = 3, TestName = "X-Ray", Status = "Completed", Result = "No fracture", RequestedAt = DateTime.UtcNow }
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

app.Run("http://localhost:5004");
