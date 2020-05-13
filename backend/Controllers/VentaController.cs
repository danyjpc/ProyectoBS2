using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using iTextSharp.text;
using iTextSharp.text.pdf;
using System.IO;
using System;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
  //  [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class VentaController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly BdContext _context;

        public VentaController(UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager, BdContext bdContext)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _context = bdContext;
        }

        //OBTENER PRODUCTOS
        //GET: api/producto/productos
        [HttpGet("dropproductos")]
        public async Task<ActionResult<IEnumerable<Producto>>> obtenerProductos()
        {
            var items = await _context.Productos.ToListAsync();
            return items;
        }

        [HttpGet("dropclientes")]
        public async Task<ActionResult<IEnumerable<Persona>>> obtenerClientes()
        {
            var items = await _context.Personas.ToListAsync();
            return items;
        }

        //Obtener cliente por email
        [Route("getxemail/{email}")]
        [HttpGet]
        public async Task<ActionResult<Persona>> ObtenerIdPersona(string email)
        {
            var idPersona = await _userManager.Users.Where(x => x.Email == email).Select(y => y.id_persona).FirstOrDefaultAsync();
            var pers = await _context.Personas.Where(per => per.id_persona == idPersona).FirstOrDefaultAsync();
            return pers;
        }

        //ObtenerProducto por id
        [Route("productos/{id}")]
        [HttpGet]
        public async Task<ActionResult<Producto>> ObtenerProductosxId(int id)
        {
            var prod = await _context.Productos.Where(pr => pr.id_producto == id).FirstOrDefaultAsync();
            return prod;
        }

        [HttpGet("getdetxprod")]
        public async Task<ActionResult<IEnumerable<Detalle_factura>>> obtenerDetalles()
        {
            var items = await _context.Detalles_facturas.ToListAsync();
            return items;
        }

        [HttpGet("getusucliente/{usr}")]
        public async Task<Int32> obtenerUsuCli(string usr)
        {
            var us = await _userManager.Users.Where(u => u.Email == usr).FirstOrDefaultAsync();
            return us.Id;
        }

        [HttpGet("getdetxfac/{idfac}")]
        public async Task<ActionResult<IEnumerable<Detalle_factura>>> obtenerDetallesxFac(int idfac)
        {
            var items = await _context.Detalles_facturas.Where(itf => itf.id_factura == idfac).Select(
                df => new{
                    id_detalle_factura = df.id_detalle_factura, 
                    cantidad = df.cantidad, 
                    id_factura = df.id_factura, 
                    id_producto = df.id_producto,
                    nom_producto = df.producto.nom_producto,
                    precio_producto = df.producto.precio_unitario,
                    subtotal = df.cantidad * df.producto.precio_unitario
                }
            ).ToListAsync();
            return Ok(items);
        }

        [HttpGet("getdetkxprod")]
        public async Task<ActionResult<IEnumerable<Detalle_kardex>>> obtenerDetallesK()
        {
            var items = await _context.Detalles_kardex.Where(dk => dk.kardex.validado == 1) .ToListAsync();
            return items;
        }

        [HttpGet("venxsem")]
        public async Task<ActionResult<IEnumerable<Decimal>>> ObtenerVentasxSemana()
        {
            Decimal mtotal = 0;
            var facs = await _context.Facturas.Where(fac => fac.fecha <= DateTime.Now && fac.fecha >= DateTime.Now.AddDays(-7)).Select(
                fct => new
                {
                    total = fct.total
                }
             ).ToListAsync();    
             foreach (var item in facs)
             {
                 mtotal = mtotal + item.total;
             }
            return Ok(mtotal);

        }

        [HttpGet("getfacturas")]
        public async Task<ActionResult<IEnumerable<Factura>>> obtenerFactura()
        {
            var fac = await _context.Facturas.ToListAsync();

            if(fac == null)
            {
                return NotFound();
            }

            return fac;
        }

        [HttpGet("{id_factura}")]
        public async Task<ActionResult<Factura>> obtenerFactura(int id_factura)
        {
            var fac = await _context.Facturas.FindAsync(id_factura);

            if(fac == null)
            {
                return NotFound();
            }

            return fac;
        }

    /*    [HttpPost]
        public async Task<ActionResult<Factura>> crearFactura([FromBody] Factura factura)
        {
            _context.Facturas.Add(factura);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(obtenerFactura), new {id_factura = factura.id_factura}, factura);
        }*/


        [HttpPost]
        public async Task<ActionResult<Factura>> crearFactura( Factura factura)
        {
            System.Console.Write(factura);
            await _context.Facturas.AddAsync(factura);
            await _context.SaveChangesAsync();

            int id = factura.id_factura;

            var nuevaFactura = _context.Facturas.Where(x => x.id_factura == id);

            return Ok(nuevaFactura);
        }

        [HttpPost("adddetalle/{id_factura}")]
        public async Task<ActionResult> aniadirDetalle(Detalle_factura[] detalles, int id_factura)
        {
            for(int i=0; i<detalles.Length; i++)
            {
                detalles[i].id_factura = id_factura;
            await _context.Detalles_facturas.AddAsync(detalles[i]);
            await _context.SaveChangesAsync();

           // int id = detalles[i].id_detalle_factura;
            }

            return Ok(); //return id detalle_factura creada
        }




        [HttpGet("facturapdf/{idfactura}")]
        public async Task<FileResult> generarPDF(int idfactura)
        {
            var fac = await _context.Facturas.FindAsync(idfactura);

            MemoryStream workStream = new MemoryStream();
            Document document = new Document();
            PdfWriter.GetInstance(document, workStream).CloseStream = false;

            document.Open();

            Paragraph title = new Paragraph();
            Paragraph encabezado = new Paragraph();
            Paragraph infoCliente = new Paragraph();
            Paragraph fechaGeneracion= new Paragraph();

            title.Font = FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 28f,BaseColor.BLACK);
            title.Alignment = Element.ALIGN_CENTER;
            title.Add("AMABISCA S. A.");
            title.Add(Chunk.NEWLINE);
            document.Add(title);
            fechaGeneracion.Font = FontFactory.GetFont(FontFactory.HELVETICA_OBLIQUE, 8f,BaseColor.BLACK);
            fechaGeneracion.Alignment = Element.ALIGN_RIGHT;
            fechaGeneracion.Add("Generada el " + DateTime.Now.ToString());
            document.Add(fechaGeneracion);
            
            document.Add(Chunk.NEWLINE);            
            document.Add(Chunk.NEWLINE);

            encabezado.Font = FontFactory.GetFont(FontFactory.HELVETICA, 18f,BaseColor.BLACK);
            encabezado.Alignment = Element.ALIGN_LEFT;
            encabezado.Add("Factura No. " + idfactura.ToString());
            encabezado.Add(Chunk.NEWLINE);
            encabezado.Add("4ta calle 5ta avenida zona 1, Guatemala");
            encabezado.Add(Chunk.NEWLINE);
            encabezado.Add("(+502)7777-7777");
            encabezado.Add(Chunk.NEWLINE);
            encabezado.Add("amabiscasa@amabisca.com");
            encabezado.Add(Chunk.NEWLINE);
            encabezado.Add(Chunk.NEWLINE);
            document.Add(encabezado);

            var idfper = await _context.Facturas.Where(f => f.id_factura == fac.id_factura).Select(
                ob => ob.usuario_cliente.persona.id_persona
            ).FirstOrDefaultAsync();

            var cli = await _context.Personas.Join(
                _userManager.Users, 
                ip => ip.id_persona, 
                iu => iu.id_persona,
                (ip, iu) => new {
                    idpersona = iu.id_persona, 
                    nompersona = ip.nom_persona, 
                    direccion = ip.direccion, 
                    nit = ip.nit,
                    telefono = ip.telefono
                }

            ).Where( p => p.idpersona == idfper).FirstOrDefaultAsync();
            
            infoCliente.Alignment = Element.ALIGN_LEFT;
            infoCliente.Add(cli.nit);
            infoCliente.Add(Chunk.SPACETABBING);
            infoCliente.Add(Chunk.SPACETABBING);
            infoCliente.Add(cli.nompersona);
            infoCliente.Add(Chunk.SPACETABBING);
            infoCliente.Add(Chunk.SPACETABBING);
            infoCliente.Add(cli.direccion);
            infoCliente.Add(Chunk.SPACETABBING);
            infoCliente.Add(Chunk.SPACETABBING);
            infoCliente.Add(cli.telefono);
            document.Add(infoCliente);

            document.Add(Chunk.SPACETABBING);
            document.Add(Chunk.SPACETABBING);

            var dets = await _context.Detalles_facturas.Where(df => df.id_factura == idfactura).ToListAsync();

            iTextSharp.text.Font _fuenteNormal = new iTextSharp.text.Font(iTextSharp.text.Font.FontFamily.HELVETICA, 8, iTextSharp.text.Font.NORMAL, BaseColor.BLACK);
            iTextSharp.text.Font _fuenteTitulosTabla = new iTextSharp.text.Font(iTextSharp.text.Font.FontFamily.HELVETICA, 8, iTextSharp.text.Font.BOLD, BaseColor.BLACK);

            PdfPTable table = new PdfPTable(5);

            // Esta es la primera fila
            table.AddCell(new Paragraph("No.", _fuenteTitulosTabla));
            table.AddCell(new Paragraph("Cantidad", _fuenteTitulosTabla));
            table.AddCell(new Paragraph("Producto", _fuenteTitulosTabla));
            table.AddCell(new Paragraph("Precio unitario", _fuenteTitulosTabla));
            table.AddCell(new Paragraph("Subtotal", _fuenteTitulosTabla));

                for (int i = 0; i < dets.Count; i++)
                {
                    var prod = await _context.Productos.Where(p => p.id_producto == dets[i].id_producto).FirstOrDefaultAsync();

                    table.AddCell(new Paragraph((i+1).ToString(), _fuenteNormal));
                    table.AddCell(new Paragraph(dets[i].cantidad.ToString(), _fuenteNormal));
                    table.AddCell(new Paragraph(prod.nom_producto, _fuenteNormal));
                    table.AddCell(new Paragraph((Math.Truncate(prod.precio_unitario * 100)/100).ToString(), _fuenteNormal));
                    table.AddCell(new Paragraph((Math.Truncate(dets[i].cantidad * prod.precio_unitario * 100)/100).ToString(),_fuenteNormal));
                }

            document.Add(table);
            
            document.Add(Chunk.NEWLINE);
            document.Add(Chunk.NEWLINE);

            Paragraph totalFactura = new Paragraph();
            totalFactura.Font = FontFactory.GetFont(FontFactory.HELVETICA, 18f,BaseColor.BLACK);
            totalFactura.Alignment = Element.ALIGN_RIGHT;
            totalFactura.Add("Total: Q." + (Math.Truncate(fac.total * 100)/100).ToString());
            document.Add(totalFactura);          

            document.Close();

            byte[] byteInfo = workStream.ToArray();
            workStream.Write(byteInfo, 0, byteInfo.Length);
            workStream.Position = 0;

            return new FileStreamResult(workStream, "application/pdf");    
        }

    }
}