using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace UTP_MAPS.Models;

[Table("EDIFICIO")]
public partial class Edificio
{
    [Key]
    [Column("cod_edificio")]
    public int CodEdificio { get; set; }

    [Column("nombre_edificio")]
    [StringLength(50)]
    [Unicode(false)]
    public string? NombreEdificio { get; set; }

    [Column("coordenadas_edificio")]
    [StringLength(50)]
    [Unicode(false)]
    public string? CoordenadasEdificio { get; set; }

    [Column("cod_icono")]
    public int CodIcono { get; set; }

    [ForeignKey("CodIcono")]
    [InverseProperty("Edificios")]
    public virtual Icono CodIconoNavigation { get; set; } = null!;

    [InverseProperty("CodEdificioNavigation")]
    public virtual ICollection<Salon> Salons { get; set; } = new List<Salon>();
}
