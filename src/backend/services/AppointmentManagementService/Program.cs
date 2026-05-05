using Microsoft.EntityFrameworkCore;
using AppointmentManagementService.Data;
using AppointmentManagementService.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddHttpLogging(o => { });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "AppointmentManagementService API", Version = "v1" });
});

// EF Core InMemory
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("AppointmentDb"));

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
    if (!context.Appointments.Any())
    {
        context.Appointments.AddRange(
            new Appointment { PatientId = 1, DoctorId = 1, AppointmentDate = DateTime.UtcNow.AddDays(1), Status = "Scheduled", Notes = "Routine checkup" },
            new Appointment { PatientId = 2, DoctorId = 2, AppointmentDate = DateTime.UtcNow.AddDays(2), Status = "Scheduled", Notes = "Follow up" },
            new Appointment { PatientId = 3, DoctorId = 3, AppointmentDate = DateTime.UtcNow.AddDays(3), Status = "Scheduled", Notes = "Urgent consultation" }
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

app.Run("http://localhost:5003");
