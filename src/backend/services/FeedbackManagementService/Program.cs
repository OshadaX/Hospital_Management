using Microsoft.EntityFrameworkCore;
using FeedbackManagementService.Data;
using FeedbackManagementService.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddHttpLogging(o => { });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "FeedbackManagementService API", Version = "v1" });
});

// EF Core InMemory
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseInMemoryDatabase("FeedbackDb"));

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
    if (!context.Feedbacks.Any())
    {
        context.Feedbacks.AddRange(
            new Feedback { PatientId = 1, ServiceType = "OPD", Rating = 5, Comment = "Excellent service", CreatedAt = DateTime.UtcNow },
            new Feedback { PatientId = 2, ServiceType = "Lab", Rating = 4, Comment = "Good, but wait time was long", CreatedAt = DateTime.UtcNow },
            new Feedback { PatientId = 3, ServiceType = "Pharmacy", Rating = 5, Comment = "Very helpful staff", CreatedAt = DateTime.UtcNow }
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

app.Run("http://localhost:5006");
