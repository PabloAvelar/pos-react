<html>
<head>

<?php 
require_once('auth.php');
?>
<title>
POS
</title>
</title>
 <link href="css/bootstrap.css" rel="stylesheet">

    <link rel="stylesheet" type="text/css" href="css/DT_bootstrap.css">
  
  <link rel="stylesheet" href="css/font-awesome.min.css">
    <style type="text/css">
      body {
        padding-top: 60px;
        padding-bottom: 40px;
      }
      .sidebar-nav {
        padding: 9px 0;
      }
    </style>
    <link href="css/bootstrap-responsive.css" rel="stylesheet">

<link href="../style.css" media="screen" rel="stylesheet" type="text/css" />
<!--sa poip up-->
<script src="argiepolicarpio.js" type="text/javascript" charset="utf-8"></script>
<script src="js/application.js" type="text/javascript" charset="utf-8"></script>
<link href="src/facebox.css" media="screen" rel="stylesheet" type="text/css" />
<script src="lib/jquery.js" type="text/javascript"></script>
<script src="src/facebox.js" type="text/javascript"></script>
<script type="text/javascript">
  jQuery(document).ready(function($) {
    $('a[rel*=facebox]').facebox({
      loadingImage : 'src/loading.gif',
      closeImage   : 'src/closelabel.png'
    })
  })
</script>
</head>
<body>

<?php include('navfixed.php');?>
	
	
	
	<div class="container-fluid">
      <div class="row-fluid">
	<div class="span2">
          <div class="well sidebar-nav">
            <ul class="nav nav-list">
              <li class="active"><a href="#"><i class="icon-dashboard icon-large"></i> Panel <div class="pull-right"><i class="icon-circle-arrow-right icon-large"></i></div></a></li> 
              <li><a href="#"><i class="icon-group icon-large"></i> Clientes <div class="pull-right"><i class="icon-circle-arrow-right icon-large"></i></div></a></li>
              <li><a href="#"><i class="icon-table icon-large"></i> Productos <div class="pull-right"><i class="icon-circle-arrow-right icon-large"></i></div></a></li>
              <li><a href="#"><i class="icon-group icon-large"></i> Proveedores <div class="pull-right"><i class="icon-circle-arrow-right icon-large"></i></div></a></li>
              <li><a href="sales.php"><i class="icon-bar-chart icon-large"></i> Reporte de ventas <div class="pull-right"><i class="icon-circle-arrow-right icon-large"></i></div></a></li>
              <li><a href="sales.php"><i class="icon-inbox icon-large"></i> Dinero <div class="pull-right"><i class="icon-circle-arrow-right icon-large"></i></div></a></li>
			   <li><a href="user.php"><i class="icon-user icon-large"></i> Usuarios <div class="pull-right"><i class="icon-circle-arrow-right icon-large"></i></div></a></li>
            </ul>
          </div><!--/.well -->
        </div><!--/span-->
	<div class="span10">
	<div class="contentheader">
			<i class="icon-list"></i> Libro de clientes
			</div>
			<ul class="breadcrumb">
			<li><a href="index.php">Panel</a></li> /
			<li class="active">Libro de clientes</li>
			</ul>

<div id="maintable">
<div style="margin-top: -19px; margin-bottom: 21px;">
<a  href="index.php"><button class="btn btn-default btn-large" style="float: none;"><i class="icon icon-circle-arrow-left icon-large"></i> Regresar</button></a>
</div>
<?php
include('../connect.php');
$tftft=$_GET['cname'];
$resulta = $db->prepare("SELECT * FROM sales WHERE invoice_number= :a");
$resulta->bindParam(':a', $tftft);
$resulta->execute();
for($i=0; $rowa = $resulta->fetch(); $i++){
$name=$rowa['name'];
$amount=$rowa['amount'];
}
$resultas = $db->prepare("SELECT * FROM customer WHERE customer_name= :b");
$resultas->bindParam(':b', $name);
$resultas->execute();
for($i=0; $rowas = $resultas->fetch(); $i++){
echo 'Name : '.$rowas['customer_name'].'<br>';
echo 'Address : '.$rowas['address'].'<br>';
echo 'Contact : '.$rowas['contact'].'<br>';
}
?>
<table class="table table-bordered" id="resultTable" data-responsive="table" style="text-align: left;">
	<thead>
		<tr>
			<th> Transaccion ID </th>
			<th> Fecha </th>
			<th> Numero de factura </th>
			<th> Pago </th>
			<th> Monto total adeudado </th>
			<th> Saldo </th>
		</tr>
	</thead>
	<tbody>
			<tr class="record">
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td><strong><?php echo $rowa['amount']; ?></strong></td>
			<td>&nbsp;</td>
			</tr>
			<?php
				$tftft=$_GET['cname'];
				$result = $db->prepare("SELECT * FROM collection WHERE name= :userid ORDER BY transaction_id ASC");
				$result->bindParam(':userid', $tftft);
				$result->execute();
				for($i=0; $row = $result->fetch(); $i++){
			?>
			<tr class="record">
			<td>TR-000<?php echo $row['transaction_id']; ?></td>
			<td><?php echo $row['date']; ?></td>
			<td><?php echo $row['invoice']; ?></td>
			<td><?php echo $row['amount']; ?></td>
			<td>&nbsp;</td>
			<td><?php echo $row['balance']; ?></td>
			</tr>
			<?php
				}
			?>
		
	</tbody>
</table>
<a rel="facebox" href="addledger.php?invoice=<?php echo $_GET['cname']; ?>&amount=<?php echo $rowa['amount']; ?>" style="margin-top: 10px;"><button class="btn btn-success"><i class="icon-plus-sign icon-large"></i> Agregar pago</button></a><br><br>
<div class="clearfix"></div>
</div>
</body>
<?php include('footer.php');?>

</html>