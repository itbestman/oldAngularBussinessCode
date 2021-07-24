using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using ProjectBrightSun.Models;

namespace ProjectBrightSun.Data
{
    public partial class ProjectSramikFinderContext : DbContext
    {
        //public ProjectSramikFinderContext()
        //{
        //}

        public ProjectSramikFinderContext(DbContextOptions<ProjectSramikFinderContext> options)
            : base(options)
        {
        }


        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<Employees> Employees { get; set; }
        public virtual DbSet<Team> Team { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=.;Database=ProjectSramikFinder;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>(entity =>
            {
                entity.Property(e => e.About)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.DeleteFlag).HasDefaultValueSql("((0))");

                entity.Property(e => e.Name)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateAt).HasDefaultValueSql("(getdate())");
            });

            modelBuilder.Entity<Employees>(entity =>
            {
                entity.Property(e => e.About)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.AdharNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.AltPhone)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.DeleteFlag).HasDefaultValueSql("((0))");

                entity.Property(e => e.DocumentBoxPath)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Father)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ImagePath)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.MiddleName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Mother)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PanNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Phone)
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateAt).HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Team)
                    .WithMany(p => p.Employees)
                    .HasForeignKey(d => d.TeamId)
                    .HasConstraintName("FK_Employees_Team");
            });

            modelBuilder.Entity<Team>(entity =>
            {
                entity.Property(e => e.About)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Address)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.CategoryId).HasColumnName("Category_id");

                entity.Property(e => e.DeleteFlag).HasDefaultValueSql("((0))");

                entity.Property(e => e.District)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.LeadName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Rank).HasDefaultValueSql("((0))");

                entity.Property(e => e.State)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UpdateAt).HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Team)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK_Team_Category");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
