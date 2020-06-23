$(function () {
  var operacion = "C"; 
  var seleccionarIndice = -1; 
  var tblClientes = localStorage.getItem("tblClientes"); 
  tblClientes = JSON.parse(tblClientes); 
  if (tblClientes === null) 
    tblClientes = [];

  function crearCliente() {
    
    var cliente = JSON.stringify({
      idCliente: $("#txtID").val(),
      dniCliente: $("#txtDni").val(),
      nombreCliente: $("#txtNombre").val(),
      telefonoCliente: $("#txtTelefono").val(),
      emailCliente: $("#txtEmail").val()
    });
    
    tblClientes.push(cliente);
    localStorage.setItem("tblClientes", JSON.stringify(tblClientes));
    alert("Tus datos han sido guardados correctamente"); //Alerta
    return true;
  }

  function editarCliente() {
    tblClientes[seleccionarIndice] = JSON.stringify({
      idCliente: $("#txtID").val(),
      dniCliente: $("#txtDni").val(),
      nombreCliente: $("#txtNombre").val(),
      telefonoCliente: $("#txtTelefono").val(),
      emailCliente: $("#txtEmail").val()
    });
    localStorage.setItem("tblClientes", JSON.stringify(tblClientes));
    alert("Los datos del cliente han sido modificados"); //Alerta
    return true;
  }

  function eliminarCliente() {
    tblClientes.splice(seleccionarIndice, 1);
    localStorage.setItem("tblClientes", JSON.stringify(tblClientes));
    alert("Cliente eliminado"); //Alerta
    location.reload();
  }

  function listarCliente() {
    $("#tblLista3").html("");
    $("#tblLista3").html(
      "<thead>" +
      "<tr>" +
      "<th>ID</th>" +
      "<th>DNI</th>" +
      "<th>Nombre Y Apellido</th>" +
      "<th>Teléfono o Celular</th>" +
      "<th>Correo Electrónico</th>" +
      "<th>Acciones</th>" +
      "</tr>" +
      "</thead>" +
      "<tbody>" +
      "</tbody>"
    ); 

    for (var i in tblClientes) {
      var cli = JSON.parse(tblClientes[i]);
      $("#tblLista3 tbody").append("<tr>" +
        "<td>" + cli.idCliente + "</td>" +
        "<td>" + cli.dniCliente + "</td>" +
        "<td>" + cli.nombreCliente + "</td>" +
        "<td>" + cli.telefonoCliente + "</td>" +
        "<td>" + cli.emailCliente + "</td>" +
        "<td><img src='edit.png' alt='Edit" + i + "' class='btnEditar'/><img src='delete.png' alt='Delete" + i + "' class='btnEliminar'/></td>" +
        "</tr>"
      );
    } 
  }

  $("#frmClientes").bind("submit", function () {
    if (operacion === "C")
      return crearCliente();
    else
      return editarCliente();
  });

  listarCliente();

  $(".btnEditar").bind("click", function () {
    operacion = "E"; 
    seleccionarIndice = parseInt($(this).attr("alt").replace("Edit", ""));

    var cli = JSON.parse(tblClientes[seleccionarIndice]);
    $("#txtID").val(cli.idCliente);
    $("#txtDni").val(cli.dniCliente);
    $("#txtNombre").val(cli.nombreCliente);
    $("#txtTelefono").val(cli.telefonoCliente);
    $("#txtEmail").val(cli.emailCliente);
    $("#txtID").attr("readonly", "readonly");
    $("#txtDni").focus();
  });

  $(".btnEliminar").bind("click", function () {
   
    seleccionarIndice = parseInt($(this).attr("alt").replace("Delete", ""));
    eliminarCliente();
    listarCliente(); 
  });
});

