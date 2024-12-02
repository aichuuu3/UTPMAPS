using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UTP_MAPS.Context;
using UTP_MAPS.Models;

namespace UTP_MAPS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalonsController : ControllerBase
    {
        private readonly UtpMapsContext _context;

        public SalonsController(UtpMapsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Salon>>> GetSalons()
        {
            return await _context.Salons.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Salon>> GetSalon(string id)
        {
            var salon = await _context.Salons.FindAsync(id);

            if (salon == null)
            {
                return NotFound();
            }

            return salon;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSalon(string id, Salon salon)
        {
            if (id != salon.CodSalon)
            {
                return BadRequest();
            }

            _context.Entry(salon).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                return Problem("Ha ocurrido un error");
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Salon>> PostSalon(Salon salon)
        {
            _context.Salons.Add(salon);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                return Problem("Ha ocurrido un error");
            }

            return CreatedAtAction("GetSalon", new { id = salon.CodSalon }, salon);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSalon(string id)
        {
            var salon = await _context.Salons.FindAsync(id);
            if (salon == null)
            {
                return NotFound();
            }

            _context.Salons.Remove(salon);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SalonExists(string id)
        {
            return _context.Salons.Any(e => e.CodSalon == id);
        }
    }
}
