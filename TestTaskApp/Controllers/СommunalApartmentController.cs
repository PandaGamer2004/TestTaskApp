using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Mime;
using System.Threading.Tasks;
using TestTaskApp.Contexts;
using TestTaskApp.Models;
using TestTaskApp.ViewModels;

namespace TestTaskApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces(MediaTypeNames.Application.Json)]
    public class СommunalApartmentController : ControllerBase
    {

        private CommunalApartmentContext _context;

        public СommunalApartmentController(CommunalApartmentContext context)
        {
            _context = context;
        }



        [HttpDelete]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteRangeCommunalAppartments(CommunalApartmentDeletionModel deletionModel)
        {
            var modelsToDelete = GetCommunalAppartmentPaysEntities(deletionModel.ModelIdsToDelete);
            await foreach(var entity in modelsToDelete)
            {
                if(entity is null)
                {
                    return NotFound("Some part of entities is not found");
                }
                _context.Remove((object) entity);
            }

            return NoContent();
        }


        [NonAction]
        private async IAsyncEnumerable<СommunalApartmentPay?> GetCommunalAppartmentPaysEntities(List<Guid> entitiesIds)
        {
             foreach(var entityId in entitiesIds)
             {
                var foundEntity = await _context.CommunalApartmentPays
                    .SingleOrDefaultAsync(ent => ent.Id == entityId);
  
                yield return foundEntity;
             }
        }

        [HttpDelete("{id:guid}")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteCommunalAppartment(Guid id)
        {
            var entityToDelete = await _context.CommunalApartmentPays.SingleOrDefaultAsync(x => x.Id == id);
            if(entityToDelete is null) 
            {
                return NotFound("Not found entity");
            }

            _context.Remove(entityToDelete);
            await _context.SaveChangesAsync();

            return NoContent();
        }



        [HttpGet("{id:guid}")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetComunalApartmentRecord(Guid id)
        {
            var requestedEntity = await _context.CommunalApartmentPays.SingleOrDefaultAsync(entity => entity.Id == id);
            if(requestedEntity is null)
            {
                return NotFound("Entity wasn't found");
            }
            return Ok(requestedEntity); 
        }


        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllComunalApartmentRecords()
        {
            return Ok(await _context.CommunalApartmentPays.ToListAsync());
        }

    }
}
