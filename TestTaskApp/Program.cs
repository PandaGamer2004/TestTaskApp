using System;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using TestTaskApp.Contexts;
using TestTaskApp.Data.DataSeeding;
using TestTaskApp.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<CommunalApartmentContext>(opts => opts.UseSqlServer(connectionString));


var app = builder.Build();

using (var serviceScope = app.Services.CreateScope())
{
    var services = serviceScope.ServiceProvider;
    var apartmentContext = services.GetRequiredService<CommunalApartmentContext>();
    var seeder = new DataSeeder(apartmentContext);
    await seeder.SeedData();
}





// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(opts =>
{
    opts.AllowAnyHeader()
        .AllowAnyMethod()
        .AllowAnyOrigin();
});

app.MapControllers();
app.Run();
