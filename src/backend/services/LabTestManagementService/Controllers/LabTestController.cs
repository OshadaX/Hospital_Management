using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LabTestManagementService.Data;
using LabTestManagementService.DTOs;
using LabTestManagementService.Models;

namespace LabTestManagementService.Controllers
{
    [ApiController]
    [Route("api/labtests")]
    public class LabTestController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LabTestController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [ProducesResponseType(typeof(LabTest), 201)]
        public async Task<IActionResult> Create(CreateLabTestDto dto)
        {
            var labTest = new LabTest
            {
                PatientId = dto.PatientId,
                TestName = dto.TestName,
                Status = dto.Status,
                Result = dto.Result
            };
            _context.LabTests.Add(labTest);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = labTest.Id }, labTest);
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<LabTest>), 200)]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _context.LabTests.ToListAsync());
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(LabTest), 200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetById(int id)
        {
            var labTest = await _context.LabTests.FindAsync(id);
            if (labTest == null) return NotFound(new { message = "Not found" });
            return Ok(labTest);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(typeof(LabTest), 200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Update(int id, UpdateLabTestDto dto)
        {
            var labTest = await _context.LabTests.FindAsync(id);
            if (labTest == null) return NotFound(new { message = "Not found" });

            labTest.PatientId = dto.PatientId;
            labTest.TestName = dto.TestName;
            labTest.Status = dto.Status;
            labTest.Result = dto.Result;

            await _context.SaveChangesAsync();
            return Ok(labTest);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(24)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Delete(int id)
        {
            var labTest = await _context.LabTests.FindAsync(id);
            if (labTest == null) return NotFound(new { message = "Not found" });

            _context.LabTests.Remove(labTest);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
