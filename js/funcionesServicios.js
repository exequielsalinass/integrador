$(function () {
    var operacion = "C"; 
    var seleccionarIndice = -1; 
    var tblServicios = localStorage.getItem("tblServicios"); 
    tblServicios = JSON.parse(tblServicios); 
    if (tblServicios === null) 
        tblServicios = [];
  
    function crearServicio() {
      var servicio = JSON.stringify({
        idServicio: $("#txtIDServicio").val(),
        carga: $("#txtCarga").val(),
        camion: $("#txtCamion").val(),
        precioServicio: $("#txtPrecioServicio").val()
      }); 
      
      tblServicios.push(servicio);
      localStorage.setItem("tblServicios", JSON.stringify(tblServicios));
      alert("Se ha creado un nuevo servicio"); //Alerta
      return true;
    }
  
    function editarServicio() {
      tblServicios[seleccionarIndice] = JSON.stringify({
          idServicio: $("#txtIDServicio").val(),
          carga: $("#txtCarga").val(),
          camion: $("#txtCamion").val(),
          precioServicio: $("#txtPrecioServicio").val()
      });
      localStorage.setItem("tblServicios", JSON.stringify(tblServicios)); 
      alert("El servicio a sido modificado"); //Alerta
      return true;
    }
  
    function eliminarServicio() {
      tblServicios.splice(seleccionarIndice, 1); 
      localStorage.setItem("tblServicios", JSON.stringify(tblServicios)); 
      alert("El servicio ha sido Eliminado"); //Alerta
      location.reload(); 
    }
  
    function listarServicio() {
      $("#tblLista2").html("");
      $("#tblLista2").html(
              "<thead>" +
              "<tr>" +                
              "<th>Destino</th>" +
              "<th>Carga</th>" +
              "<th>Camión</th>" +
              "<th>Carga</th>" +
              "<th>Acciones</th>" +
              "</tr>" +
              "</thead>" +
              "<tbody>" +
              "</tbody>"
              ); 
      for (var i in tblServicios) {
          var ser = JSON.parse(tblServicios[i]);
          $("#tblLista2 tbody").append("<tr>" +                    
                  "<td>" + ser.idServicio + "</td>" +
                  "<td>" + ser.carga + "</td>" +
                  "<td>" + ser.camion + "</td>" +
                  "<td>" + ser.precioServicio + "</td>" +                    
                  "<td><img src='edit.png' alt='Edit" + i + "' class='btnModificar'/><img src='delete.png' alt='Delete" + i + "' class='btnBorrar'/></td>" +
                  "</tr>"
                  );
      } 
    }
  
    $("#frmServicio2").bind("submit", function () {
      if (operacion=== "C")
          return crearServicio();
      else
          return editarServicio();
    }); 
    
    listarServicio();
  
    
    $(".btnModificar").bind("click", function () {
      operacion = "E"; 
      seleccionarIndice = parseInt($(this).attr("alt").replace("Edit", ""));
      var ser = JSON.parse(tblServicios[seleccionarIndice]); 
      $("#txtIDServicio").val(ser.idServicio);
      $("#txtCarga").val(ser.carga);
      $("#txtCamion").val(ser.camion);
      $("#txtPrecioServicio").val(ser.precioServicio);
      $("#txtIDServicio").attr("readonly", "readonly");
      $("#txtCarga").focus();
    });
  
  
    $(".btnBorrar").bind("click", function () {
     
      seleccionarIndice = parseInt($(this).attr("alt").replace("Delete", "")); 
      eliminarServicio(); 
      listarServicio(); 
    });
  });
  
  