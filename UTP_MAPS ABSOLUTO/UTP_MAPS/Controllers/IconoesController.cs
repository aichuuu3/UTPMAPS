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
    public class IconoesController : ControllerBase
    {
        private readonly UtpMapsContext _context;

        public IconoesController(UtpMapsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Icono>>> GetIconos()
        {
            return await _context.Iconos.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Icono>> GetIcono(int id)
        {
            var icono = await _context.Iconos.FindAsync(id);

            if (icono == null)
            {
                return NotFound();
            }

            return icono;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutIcono(int id, Icono icono)
        {
            if (id != icono.CodIcono)
            {
                return BadRequest();
            }

            _context.Entry(icono).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IconoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Icono>> PostIcono(Icono icono)
        {
            _context.Iconos.Add(icono);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (IconoExists(icono.CodIcono))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetIcono", new { id = icono.CodIcono }, icono);
        }

        [HttpGet("ico")]
        public async Task<ActionResult<Icono>> ObtenerUrl(int ico)
        {
            var icono = await _context.Iconos.FindAsync(ico);
            if (icono == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(icono.NomIcono);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIcono(int id)
        {
            var icono = await _context.Iconos.FindAsync(id);
            if (icono == null)
            {
                return NotFound();
            }

            _context.Iconos.Remove(icono);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool IconoExists(int id)
        {
            return _context.Iconos.Any(e => e.CodIcono == id);
        }
    }
}
