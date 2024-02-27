<?php
	require_once('auth.php');
?>
<html>
<head>
<title>
POS
</title>
<?php
	require_once('auth.php');
?>
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
              <li><a href="sales.php"><i class="icon-inbox icon-large"></i> Efectivo <div class="pull-right"><i class="icon-circle-arrow-right icon-large"></i></div></a></li>
			   <li><a href="user.php"><i class="icon-user icon-large"></i> Usuarios <div class="pull-right"><i class="icon-circle-arrow-right icon-large"></i></div></a></li>
            </ul>
          </div><!--/.well -->
        </div><!--/span-->
	<div class="span10">
	<div class="contentheader">
			<i class="icon-dashboard"></i> Panel
			</div>
			<ul class="breadcrumb">
			<a href="dashboard.php"><li>Panel</li></a> /
			<li class="active">Listas de la compra</li>
			</ul>
<div id="maintable">
<a  href="index.php"><button class="btn btn-default btn-large" style="float: none;"><i class="icon icon-circle-arrow-left icon-large"></i> Regresar</button></a><br><br>

<form action="savepurchasesitem.php" method="post" >
<input type="hidden" name="invoice" value="<?php echo $_GET['iv']; ?>" />
<select name="product" style="width: 600px;">
	<?php
	include('../connect.php');
	$result = $db->prepare("SELECT * FROM products");
		$result->bindParam(':userid', $res);
		$result->execute();
		for($i=0; $row = $result->fetch(); $i++){
	?>
		<option value="<?php echo $row['product_code']; ?>"><?php echo $row['product_code']; ?> - <?php echo $row['product_name']; ?></option>
	<?php
	}
	?>
</select>
<input type="text" name="qty" value="" placeholder="Qty" autocomplete="off" style="width: 68px; height:30px; padding-top: 6px; padding-bottom: 6px; margin-right: 4px;" />
<Button type="submit" class="btn btn-info" style="width: 123px; height:35px; margin-top:-5px;" /><i class="icon-save icon-large"></i> Save</button>

</form>
<div class="content" id="content">
<div>
<?php
$id=$_GET['iv'];
include('../connect.php');
$resultaz = $db->prepare("SELECT * FROM purchases WHERE invoice_number= :xzxz");
$resultaz->bindParam(':xzxz', $id);
$resultaz->execute();
for($i=0; $rowaz = $resultaz->fetch(); $i++){
echo 'Transaction ID : TR-'.$rowaz['transaction_id'].'<br>';
echo 'Invoice Number : '.$rowaz['invoice_number'].'<br>';
echo 'Date : '.$rowaz['date'].'<br>';
echo 'Supplier : '.$rowaz['suplier'].'<br>';
echo 'Remarks : '.$rowaz['remarks'].'<br>';
}
?>
</div>

<table class="table table-bordered" id="resultTable" data-responsive="table" style="text-align: left;">
	<thead>
		<tr>
			<th width="35%"> Nombre </th>
			<th width="10%"> Cantidad </th>
			<th width="15%"> Costo </th>
			<th width="12%"> Acción </th>
		</tr>
	</thead>
	<tbody>
		
			<?php
				$id=$_GET['iv'];
				$result = $db->prepare("SELECT * FROM purchases_item WHERE invoice= :userid");
				$result->bindParam(':userid', $id);
				$result->execute();
				for($i=0; $row = $result->fetch(); $i++){
			?>
			<tr class="record">
			<td><?php
			$rrrrrrr=$row['name'];
			$resultss = $db->prepare("SELECT * FROM products WHERE product_code= :asas");
			$resultss->bindParam(':asas', $rrrrrrr);
			$resultss->execute();
			for($i=0; $rowss = $resultss->fetch(); $i++){
			echo $rowss['product_name'];
			}
			?></td>
			<td><?php echo $row['qty']; ?></td>
			<td>
			<?php
			$dfdf=$row['cost'];
			echo formatMoney($dfdf, true);
			?>
			</td>
			<td><center><a href="deletep.php?id=<?php echo $row['id']; ?>&invoice=<?php echo $_GET['iv']; ?>&qty=<?php echo $row['qty'];?>&code=<?php echo $row['name'];?>"><button class="btn btn-danger btn-mini"><i class="icon-trash"></i> Borrar </button></a></td>
			</center>
			</tr>
			<?php
				}
			?>
			<tr>
				<td colspan="2"><strong style="font-size: 12px; color: #222222;">Total:</strong></td>
				<td colspan="2"><strong style="font-size: 12px; color: #222222;">
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
				$sdsd=$_GET['iv'];
				$resultas = $db->prepare("SELECT sum(cost) FROM purchases_item WHERE invoice= :a");
				$resultas->bindParam(':a', $sdsd);
				$resultas->execute();
				for($i=0; $rowas = $resultas->fetch(); $i++){
				$fgfg=$rowas['sum(cost)'];
				echo formatMoney($fgfg, true);
				}
				?>
				</strong></td>
			</tr>
		
	</tbody>
</table></div><br>
<button  style="width: 123px; height:35px; float:right;" class="btn btn-success btn-large">
<a href="javascript:Clickheretoprint()"><i class="icon icon-print icon-large"></i> Imprimir</a></button>
<div class="clearfix"></div>
</div>
</body>
</html>