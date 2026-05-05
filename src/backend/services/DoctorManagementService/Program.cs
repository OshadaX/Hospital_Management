using Microsoft.EntityFrameworkCore;
using DoctorManagementService.Data;
using DoctorManagementService.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddHttpLogging(o => { });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "DoctorManagementService API", Version = "v1" });
});

// EF Core InMemory
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("DoctorDb"));

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
    if (!context.Doctors.Any())
    {
        context.Doctors.AddRange(
            new Doctor { FullName = "Dr. Alice Smith", Specialization = "Cardiology", Email = "alice.smith@hospital.com", PhoneNumber = "1112223333", IsAvailable = true },
            new Doctor { FullName = "Dr. Bob Jones", Specialization = "Neurology", Email = "bob.jones@hospital.com", PhoneNumber = "4445556666", IsAvailable = true },
            new Doctor { FullName = "Dr. Charlie Williams", Specialization = "Pediatrics", Email = "charlie.williams@hospital.com", PhoneNumber = "7778889999", IsAvailable = false }
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

app.Run("http://localhost:5002");
