using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AppointmentManagementService.Data;
using AppointmentManagementService.DTOs;
using AppointmentManagementService.Models;

namespace AppointmentManagementService.Controllers
{
    [ApiController]
    [Route("api/appointments")]
    public class AppointmentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AppointmentController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [ProducesResponseType(typeof(Appointment), 201)]
        public async Task<IActionResult> Create(CreateAppointmentDto dto)
        {
            var appointment = new Appointment
            {
                PatientId = dto.PatientId,
                DoctorId = dto.DoctorId,
                AppointmentDate = dto.AppointmentDate,
                Status = dto.Status,
                Notes = dto.Notes
            };
            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = appointment.Id }, appointment);
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Appointment>), 200)]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _context.Appointments.ToListAsync());
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Appointment), 200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetById(int id)
        {
            var appointment = await _context.Appointments.FindAsync(id);
            if (appointment == null) return NotFound(new { message = "Not found" });
            return Ok(appointment);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(typeof(Appointment), 200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Update(int id, UpdateAppointmentDto dto)
        {
            var appointment = await _context.Appointments.FindAsync(id);
            if (appointment == null) return NotFound(new { message = "Not found" });

            appointment.PatientId = dto.PatientId;
            appointment.DoctorId = dto.DoctorId;
            appointment.AppointmentDate = dto.AppointmentDate;
            appointment.Status = dto.Status;
            appointment.Notes = dto.Notes;

            await _context.SaveChangesAsync();
            return Ok(appointment);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(24)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Delete(int id)
        {
            var appointment = await _context.Appointments.FindAsync(id);
            if (appointment == null) return NotFound(new { message = "Not found" });

            _context.Appointments.Remove(appointment);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
