using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add Ocelot configuration
builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);

builder.Services.AddOcelot(builder.Configuration);
builder.Services.AddHttpLogging(o => { });

// Add Swagger services (required for UI and internal dependencies)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS for the Gateway itself
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();

// Enable Swagger UI and aggregate downstream services via Gateway proxy
app.UseSwaggerUI(c =>
{
    // These paths are now PROXIED via Ocelot in ocelot.json to avoid CORS issues
    c.SwaggerEndpoint("/api/doctors/swagger/v1/swagger.json", "Doctor Service");
    c.SwaggerEndpoint("/api/patients/swagger/v1/swagger.json", "Patient Service");
    c.SwaggerEndpoint("/api/appointments/swagger/v1/swagger.json", "Appointment Service");
    c.SwaggerEndpoint("/api/labtests/swagger/v1/swagger.json", "Lab Test Service");
    c.SwaggerEndpoint("/api/medicines/swagger/v1/swagger.json", "Medicine Service");
    c.SwaggerEndpoint("/api/feedback/swagger/v1/swagger.json", "Feedback Service");
    
    c.RoutePrefix = "swagger"; 
    c.DocumentTitle = "Hospital Management System - API Gateway";
});

// Redirect root to swagger
app.MapGet("/", () => Results.Redirect("/swagger"));

app.UseCors("AllowAll");
app.UseHttpLogging();

// Note: Ocelot middleware must be after Swagger/Redirects
// Using wait to ensure it's handled correctly in this pipeline
app.UseOcelot().Wait();

app.Run("http://localhost:5000");
