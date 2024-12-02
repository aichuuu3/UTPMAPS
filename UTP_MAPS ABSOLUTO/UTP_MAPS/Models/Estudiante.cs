using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace UTP_MAPS.Models;

[Table("ESTUDIANTE")]
public partial class Estudiante
{
    [Key]
    [Column("email_estudiante")]
    [StringLength(50)]
    [Unicode(false)]
    public string EmailEstudiante { get; set; } = null!;

    [Column("contrasena_email_estudiante")]
    [StringLength(20)]
    [Unicode(false)]
    public string ContrasenaEmailEstudiante { get; set; } = null!;
}
