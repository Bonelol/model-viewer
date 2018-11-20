using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using JsonToQueryable.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SIMS.Models.Generated;

namespace SIMS.Controllers
{
    [Route("model")]
    [AllowAnonymous]
    public class ModelController : BaseController
    {
        private readonly SIMSContext _context;

        public ModelController(SIMSContext context)
        {
            _context = context;
        }

        [HttpGet("list")]
        public IActionResult ListModels()
        {
            return Json(_context.Model.GetEntityTypes().Select(t => new {t.ClrType.Name, t.ClrType.FullName}));
        }

        [HttpGet("describe/{className}")]
        public IActionResult Describe(string className)
        {
            var obj = _context.Model.GetEntityTypes().First(t => t.ClrType.FullName == className);
            var properties = obj.GetProperties();
            var navigations = obj.GetNavigations();
            var list = new List<Description>();

            list.AddRange(properties.Select(p => new Description()
            {
                Name = p.Name,
                TypeName = p.IsNullable && p.ClrType != typeof(string) ? p.ClrType.GenericTypeArguments[0].FullName : p.ClrType.FullName,
                IsNullable = p.IsNullable,
                IsPrimaryKey = p.IsPrimaryKey()
            }));

            list.AddRange(navigations.Select(n => new Description()
            {
                Name = n.Name,
                TypeName = n.IsCollection() ? n.ClrType.GenericTypeArguments[0].FullName : n.ClrType.FullName,
                ForeignKeys = n.DeclaringEntityType.ClrType == obj.ClrType
                    ? n.ForeignKey.Properties.Select(p => p.Name)
                    : n.ForeignKey.PrincipalKey.Properties.Select(p => p.Name),
                IsNavigation = true,
                IsCollection = n.IsCollection()
            }));

            return Json(list);
        }

        [HttpPost("search")]
        [AllowAnonymous]
        public async Task<IActionResult> Search()
        {
            var queryString = await new StreamReader(Request.Body).ReadToEndAsync();
            var types = _context.Model.GetEntityTypes().Select(et => et.ClrType).ToList();
            var queryable = _context.CreateQuery(queryString, types);
            
            return Json(queryable, JsonReferenceLoopSettings);
        }

        [HttpPost("update")]
        [AllowAnonymous]
        public async Task<IActionResult> Update(string query, [FromBody] Dictionary<string, object> values)
        {
            var types = _context.Model.GetEntityTypes().Select(et => et.ClrType).ToList();
            var queryable = _context.CreateQuery(query, types);
            var enumerator = queryable.GetEnumerator();

            while (enumerator.MoveNext())
            {
                var obj = enumerator.Current;
                var objType = obj.GetType();

                foreach (var o in values)
                {
                    var pInfo = objType.GetProperty(o.Key, BindingFlags.Public | BindingFlags.Instance);
                    pInfo.SetValue(obj, o.Value);
                    _context.Entry(obj).Property(o.Key).IsModified = true;
                }
            }

            await _context.SaveChangesAsync();

            return Json(queryable, JsonReferenceLoopSettings);
        }
    }

    public class Description
    {
        public string Name { get; set; }
        public string TypeName { get; set; }
        public string ForeignKey { get; set; }
        public bool IsPrimaryKey { get; set; }
        public bool IsNavigation { get; set; }
        public bool IsCollection { get; set; }
        public bool IsNullable { get; set; }
        public IEnumerable<string> ForeignKeys { get; set; }
    }
}
