using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace UTP_MAPS.Models;

[Table("SALON")]
public partial class Salon
{
    [Key]
    [Column("cod_salon")]
    [StringLength(10)]
    [Unicode(false)]
    public string CodSalon { get; set; } = null!;

    [Column("tipo_salon")]
    [StringLength(20)]
    [Unicode(false)]
    public string TipoSalon { get; set; } = null!;

    [Column("cod_edificio")]
    public int CodEdificio { get; set; }

    [Column("cooredenadas_salon")]
    [StringLength(50)]
    [Unicode(false)]
    public string? CooredenadasSalon { get; set; }

    [Column("cod_icono")]
    public int CodIcono { get; set; }

    [ForeignKey("CodEdificio")]
    [InverseProperty("Salons")]
    public virtual Edificio CodEdificioNavigation { get; set; } = null!;

    [ForeignKey("CodIcono")]
    [InverseProperty("Salons")]
    public virtual Icono CodIconoNavigation { get; set; } = null!;
}
