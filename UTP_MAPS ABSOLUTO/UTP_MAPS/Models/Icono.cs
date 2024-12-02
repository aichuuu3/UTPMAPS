using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace UTP_MAPS.Models;

[Table("ICONOS")]
public partial class Icono
{
    [Key]
    [Column("cod_icono")]
    public int CodIcono { get; set; }

    [Column("nom_icono")]
    [StringLength(200)]
    [Unicode(false)]
    public string? NomIcono { get; set; }

    [InverseProperty("CodIconoNavigation")]
    public virtual ICollection<Edificio> Edificios { get; set; } = new List<Edificio>();

    [InverseProperty("CodIconoNavigation")]
    public virtual ICollection<Salon> Salons { get; set; } = new List<Salon>();
}
