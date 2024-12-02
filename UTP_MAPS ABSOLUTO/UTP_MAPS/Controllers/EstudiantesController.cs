using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UTP_MAPS.Context;
using UTP_MAPS.Models;

namespace UTP_MAPS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstudiantesController : ControllerBase
    {
        private readonly UtpMapsContext _context;

        public EstudiantesController(UtpMapsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Estudiante>>> GetEstudiantes()
        {
            return await _context.Estudiantes.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Estudiante>> GetEstudiante(string id)
        {
            var estudiante = await _context.Estudiantes.FindAsync(id);

            if (estudiante == null)
            {
                return NotFound();
            }

            return estudiante;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEstudiante(string id, Estudiante estudiante)
        {
            if (id != estudiante.EmailEstudiante)
            {
                return BadRequest();
            }

            _context.Entry(estudiante).State = EntityState.Modified;

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
        public async Task<ActionResult<Estudiante>> PostEstudiante(Estudiante estudiante)
        {
            _context.Estudiantes.Add(estudiante);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                return Problem("Ha ocurrido un error");
            }

            return CreatedAtAction("GetEstudiante", new { id = estudiante.EmailEstudiante }, estudiante);
        }

        [HttpPost("login")]
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
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEstudiante(string id)
        {
            var estudiante = await _context.Estudiantes.FindAsync(id);
            if (estudiante == null)
            {
                return NotFound();
            }

            _context.Estudiantes.Remove(estudiante);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EstudianteExists(string id)
        {
            return _context.Estudiantes.Any(e => e.EmailEstudiante == id);
        }
    }
}
