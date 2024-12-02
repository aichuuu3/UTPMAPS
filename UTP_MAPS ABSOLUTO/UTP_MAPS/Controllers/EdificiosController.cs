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
    public class EdificiosController : ControllerBase
    {
        private readonly UtpMapsContext _context;

        public EdificiosController(UtpMapsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Edificio>>> GetEdificios()
        {
            return await _context.Edificios.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Edificio>> GetEdificio(int id)
        {
            var edificio = await _context.Edificios.FindAsync(id);

            if (edificio == null)
            {
                return NotFound();
            }

            return edificio;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEdificio(int id, Edificio edificio)
        {
            if (id != edificio.CodEdificio)
            {
                return BadRequest();
            }

            _context.Entry(edificio).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EdificioExists(id))
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
        public async Task<ActionResult<Edificio>> PostEdificio(Edificio edificio)
        {
            _context.Edificios.Add(edificio);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEdificio", new { id = edificio.CodEdificio }, edificio);
        }
        /*[HttpPost("login")]
        public async Task<ActionResult<Estudiante>> LoginEstudiante(LoginRequest login)
        {
            var estudiante = await _context.Estudiantes.FindAsync(login.Email);
            if (estudiante != null)
            {
                if (estudiante.ContrasenaEmailEstudiante.Equals(login.Password))
                {
                    return Ok();
                }
            }
            return Unauthorized();
        }*/

        [HttpGet("coor")]
        public async Task<ActionResult<Edificio>> ObtenerCoordenadas(int coor)
        {
            var edificio = await _context.Edificios.FindAsync(coor);
            if (edificio == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(edificio.CoordenadasEdificio);
            }
        }

        [HttpGet("ico")]
        public async Task<ActionResult<Edificio>> ObtenerCodigo(int ico)
        {
            var edificio = await _context.Edificios.FindAsync(ico);
            if (edificio == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(edificio.CodIcono);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEdificio(int id)
        {
            var edificio = await _context.Edificios.FindAsync(id);
            if (edificio == null)
            {
                return NotFound();
            }

            _context.Edificios.Remove(edificio);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EdificioExists(int id)
        {
            return _context.Edificios.Any(e => e.CodEdificio == id);
        }
    }
}
