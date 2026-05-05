using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MedicineManagementService.Data;
using MedicineManagementService.DTOs;
using MedicineManagementService.Models;

namespace MedicineManagementService.Controllers
{
    [ApiController]
    [Route("api/medicines")]
    public class MedicineController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MedicineController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [ProducesResponseType(typeof(Medicine), 201)]
        public async Task<IActionResult> Create(CreateMedicineDto dto)
        {
            var medicine = new Medicine
            {
                Name = dto.Name,
                Category = dto.Category,
                Quantity = dto.Quantity,
                Price = dto.Price,
                ExpiryDate = dto.ExpiryDate
            };
            _context.Medicines.Add(medicine);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = medicine.Id }, medicine);
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Medicine>), 200)]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _context.Medicines.ToListAsync());
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Medicine), 200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetById(int id)
        {
            var medicine = await _context.Medicines.FindAsync(id);
            if (medicine == null) return NotFound(new { message = "Not found" });
            return Ok(medicine);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(typeof(Medicine), 200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Update(int id, UpdateMedicineDto dto)
        {
            var medicine = await _context.Medicines.FindAsync(id);
            if (medicine == null) return NotFound(new { message = "Not found" });

            medicine.Name = dto.Name;
            medicine.Category = dto.Category;
            medicine.Quantity = dto.Quantity;
            medicine.Price = dto.Price;
            medicine.ExpiryDate = dto.ExpiryDate;

            await _context.SaveChangesAsync();
            return Ok(medicine);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(24)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Delete(int id)
        {
            var medicine = await _context.Medicines.FindAsync(id);
            if (medicine == null) return NotFound(new { message = "Not found" });

            _context.Medicines.Remove(medicine);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
