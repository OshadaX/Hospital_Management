using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DoctorManagementService.Data;
using DoctorManagementService.DTOs;
using DoctorManagementService.Models;

namespace DoctorManagementService.Controllers
{
    [ApiController]
    [Route("api/doctors")]
    public class DoctorController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DoctorController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [ProducesResponseType(typeof(Doctor), 201)]
        public async Task<IActionResult> Create(CreateDoctorDto dto)
        {
            var doctor = new Doctor
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Specialization = dto.Specialization,
                Email = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                IsAvailable = dto.IsAvailable
            };
            _context.Doctors.Add(doctor);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = doctor.Id }, doctor);
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Doctor>), 200)]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _context.Doctors.ToListAsync());
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Doctor), 200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetById(int id)
        {
            var doctor = await _context.Doctors.FindAsync(id);
            if (doctor == null) return NotFound(new { message = "Not found" });
            return Ok(doctor);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(typeof(Doctor), 200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Update(int id, UpdateDoctorDto dto)
        {
            var doctor = await _context.Doctors.FindAsync(id);
            if (doctor == null) return NotFound(new { message = "Not found" });

            doctor.FirstName = dto.FirstName;
            doctor.LastName = dto.LastName;
            doctor.Specialization = dto.Specialization;
            doctor.Email = dto.Email;
            doctor.PhoneNumber = dto.PhoneNumber;
            doctor.IsAvailable = dto.IsAvailable;

            await _context.SaveChangesAsync();
            return Ok(doctor);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(24)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Delete(int id)
        {
            var doctor = await _context.Doctors.FindAsync(id);
            if (doctor == null) return NotFound(new { message = "Not found" });

            _context.Doctors.Remove(doctor);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
