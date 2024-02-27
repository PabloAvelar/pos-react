<html>
<head>
<?php
	require_once('auth.php');
?>
<title>
POS
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
<link rel="stylesheet" type="text/css" href="tcal.css" />
<script type="text/javascript" src="tcal.js"></script>
<script language="javascript">
function Clickheretoprint()
{ 
  var disp_setting="toolbar=yes,location=no,directories=yes,menubar=yes,"; 
      disp_setting+="scrollbars=yes,width=700, height=400, left=100, top=25"; 
  var content_vlue = document.getElementById("content").innerHTML; 
  
  var docprint=window.open("","",disp_setting); 
   docprint.document.open(); 
   docprint.document.write('</head><body onLoad="self.print()" style="width: 700px; font-size:11px; font-family:arial; font-weight:normal;">');          
   docprint.document.write(content_vlue); 
   docprint.document.close(); 
   docprint.focus(); 
}
</script>
</head>
<body>
<?php
	include('navfixed.php');
?>
	
	
	<div class="container-fluid">
      <div class="row-fluid">
	<div class="span2">
          <div class="well sidebar-nav">
                   <ul class="nav nav-list">
              <li><a href="#"><i class="icon-dashboard icon-2x"></i> Panel </a></li> 
				<li><a href="salesreport.php?d1=0&d2=0"><i class="icon-bar-chart icon-2x"></i> Informe de ventas</a>							</li>
				<li class="active"><a href="collection.php?d1=0&d2=0"><i class="icon-bar-chart icon-2x"></i> Informe de cobranza</a>                     </li>
				<li><a href="accountreceivables.php?d1=0&d2=0"><i class="icon-bar-chart icon-2x"></i> Cuentas deudoras</a>    </li>
				<li><a rel="facebox" href="select_customer.php"><i class="icon-user icon-2x"></i> Libro de facturas</a>                   </li>
				<li><a href="products.php"><i class="icon-table icon-2x"></i> Productos</a>                                              </li>
				<li><a href="customer.php"><i class="icon-group icon-2x"></i> Clientes</a>                                             </li>
				<li><a href="supplier.php"><i class="icon-group icon-2x"></i> Proveedores</a>                                             </li>
				<li><a href="purchaseslist.php"><i class="icon-inbox icon-2x"></i> Compras</a></li>
				</ul>           
          </div><!--/.well -->
        </div><!--/span-->
	<div class="span10">
	<div class="contentheader">
			<i class="icon-bar-chart"></i> Informe de cobranza
			</div>
			<ul class="breadcrumb">
			<li><a href="index.php">Panel</a></li> /
			<li class="active">Informe de cobranza</li>
			</ul>

<div id="maintable"><div style="margin-top: -19px; margin-bottom: 21px;">
<a  href="index.php"><button class="btn btn-default btn-large" style="float: none;"><i class="icon icon-circle-arrow-left icon-large"></i> Regresar</button></a>
</div>
<form action="collection.php" method="get">
De : <input type="text" name="d1" style="width: 223px; padding:14px;" class="tcal" value="" /> Para: <input type="text" style="width: 223px; padding:14px;" name="d2" class="tcal" value="" />
 <button class="btn btn-info" style="width: 123px; height:35px; margin-top:-8px;" type="submit"><i class="icon icon-search icon-large"></i> Buscar</button>
<button  style="width: 123px; height:35px; margin-top:-2px; float:right;" class="btn btn-success btn-large"><a href="javascript:Clickheretoprint()"><i class="icon icon-print icon-large"></i> Imprimir</a></button>
</form>
<div class="content" id="content">
<div style="font-weight:bold; text-align:center;font-size:14px;margin-bottom: 15px;">
Informe de recogida&nbsp;<?php echo $_GET['d1'] ?>&nbsp;to&nbsp;<?php echo $_GET['d2'] ?>
</div>
<table class="table table-bordered" id="resultTable" data-responsive="table" style="text-align: left;">
	<thead>
		<tr>
			<th width="17%"> Transaccion ID </th>
			<th width="8%"> Fecha </th>
			<th width="25%"> Nombre de cliente </th>
			<th width="25%"> Numero de factura </th>
			<th width="15%"> Cantidad </th>
			<th width="10%"> Comentarios </th>
		</tr>
	</thead>
	<tbody>
		
			<?php
				include('../connect.php');
				$d1=$_GET['d1'];
				$d2=$_GET['d2'];
				$result = $db->prepare("SELECT * FROM collection WHERE date BETWEEN :a AND :b");
				$result->bindParam(':a', $d1);
				$result->bindParam(':b', $d2);
				$result->execute();
				for($i=0; $row = $result->fetch(); $i++){
			?>
			<tr class="record">
			<td>CTI-000<?php echo $row['transaction_id']; ?></td>
			<td><?php echo $row['date']; ?></td>
			<td><?php echo $row['name']; ?></td>
			<td><?php echo $row['invoice']; ?></td>
			<td><?php
			$dsdsd=$row['amount'];
			echo formatMoney($dsdsd, true);
			?></td>
			<td><?php echo $row['remarks']; ?></td>
			</tr>
			<?php
				}
			?>
		
	</tbody>
	<thead>
		<tr>
			<th colspan="4" style="border-top:1px solid #999999"> Total </th>
			<th colspan="2" style="border-top:1px solid #999999"> 
			<?php
				function formatMoney($number, $fractional=false) {
					if ($fractional) {
						$number = sprintf('%.2f', $number);
					}
					while (true) {
						$replaced = preg_replace('/(-?\d+)(\d\d\d)/', '$1,$2', $number);
						if ($replaced != $number) {
							$number = $replaced;
						} else {
							break;
						}
					}
					return $number;
				}
				$d1=$_GET['d1'];
				$d2=$_GET['d2'];
				$results = $db->prepare("SELECT sum(amount) FROM collection WHERE date BETWEEN :a AND :b");
				$results->bindParam(':a', $d1);
				$results->bindParam(':b', $d2);
				$results->execute();
				for($i=0; $rows = $results->fetch(); $i++){
				$dsdsd=$rows['sum(amount)'];
				echo formatMoney($dsdsd, true);
				}
				?>
			</th>
		</tr>
	</thead>
</table>
</div>
<div class="clearfix"></div>
</div>
</body>
<?php include('footer.php');?>

</html>