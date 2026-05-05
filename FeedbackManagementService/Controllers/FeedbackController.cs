using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FeedbackManagementService.Data;
using FeedbackManagementService.DTOs;
using FeedbackManagementService.Models;

namespace FeedbackManagementService.Controllers
{
    [ApiController]
    [Route("api/feedback")]
    public class FeedbackController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FeedbackController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [ProducesResponseType(typeof(Feedback), 201)]
        public async Task<IActionResult> Create(CreateFeedbackDto dto)
        {
            var feedback = new Feedback
            {
                PatientId = dto.PatientId,
                ServiceType = dto.ServiceType,
                Rating = dto.Rating,
                Comment = dto.Comment
            };
            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = feedback.Id }, feedback);
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Feedback>), 200)]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _context.Feedbacks.ToListAsync());
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Feedback), 200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetById(int id)
        {
            var feedback = await _context.Feedbacks.FindAsync(id);
            if (feedback == null) return NotFound(new { message = "Not found" });
            return Ok(feedback);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(typeof(Feedback), 200)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Update(int id, UpdateFeedbackDto dto)
        {
            var feedback = await _context.Feedbacks.FindAsync(id);
            if (feedback == null) return NotFound(new { message = "Not found" });

            feedback.PatientId = dto.PatientId;
            feedback.ServiceType = dto.ServiceType;
            feedback.Rating = dto.Rating;
            feedback.Comment = dto.Comment;

            await _context.SaveChangesAsync();
            return Ok(feedback);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(24)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Delete(int id)
        {
            var feedback = await _context.Feedbacks.FindAsync(id);
            if (feedback == null) return NotFound(new { message = "Not found" });

            _context.Feedbacks.Remove(feedback);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
