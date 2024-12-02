using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using UTP_MAPS.Models;

namespace UTP_MAPS.Context;

public partial class UtpMapsContext : DbContext
{
    public UtpMapsContext()
    {
    }

    public UtpMapsContext(DbContextOptions<UtpMapsContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Edificio> Edificios { get; set; }

    public virtual DbSet<Estudiante> Estudiantes { get; set; }

    public virtual DbSet<Icono> Iconos { get; set; }

    public virtual DbSet<Salon> Salons { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=ConnectionStrings:DefaultConnection");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Edificio>(entity =>
        {
            entity.HasKey(e => e.CodEdificio).HasName("pk_cod_edificio");

            entity.HasOne(d => d.CodIconoNavigation).WithMany(p => p.Edificios)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EDIFICIO_ICONOS");
        });

        modelBuilder.Entity<Estudiante>(entity =>
        {
            entity.HasKey(e => e.EmailEstudiante).HasName("pk_email_estudiante");
        });

        modelBuilder.Entity<Icono>(entity =>
        {
            entity.Property(e => e.CodIcono).ValueGeneratedNever();
        });

        modelBuilder.Entity<Salon>(entity =>
        {
            entity.HasKey(e => e.CodSalon).HasName("pk_cod_salon");

            entity.HasOne(d => d.CodEdificioNavigation).WithMany(p => p.Salons)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SALON_EDIFICIO");

            entity.HasOne(d => d.CodIconoNavigation).WithMany(p => p.Salons)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SALON_ICONOS");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
