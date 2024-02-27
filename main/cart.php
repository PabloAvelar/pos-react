<?php
	include("function/session.php");
	include("db/dbconn.php");
?>
<!DOCTYPE html>
<html>
<head>
	<title>BaseD</title>
	<link rel="icon" href="img/logo.jpg" />
	<link rel = "stylesheet" type = "text/css" href="css/style.css" media="all">
	<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
	<script src="js/bootstrap.js"></script>
	<script src="js/jquery-1.7.2.min.js"></script>
	<script src="js/carousel.js"></script>
	<script src="js/button.js"></script>
	<script src="js/dropdown.js"></script>
	<script src="js/tab.js"></script>
	<script src="js/tooltip.js"></script>
	<script src="js/popover.js"></script>
	<script src="js/collapse.js"></script>
	<script src="js/modal.js"></script>
	<script src="js/scrollspy.js"></script>
	<script src="js/alert.js"></script>
	<script src="js/transition.js"></script>
	<script src="js/bootstrap.min.js"></script>
</head>
<body>
	<div id="header">
		<img src="img/logo.jpg">
		<label>BaseD</label>
			
			<?php
				$id = (int) $_SESSION['id'];
			
					$query = mysql_query ("SELECT * FROM customer WHERE customerid = '$id' ") or die (mysql_error());
					$fetch = mysql_fetch_array ($query);
			?>
	
			<ul>
				<li><a href="function/logout.php"><i class="icon-off icon-white"></i>Salir</a></li>
				<li>Bienvenido:&nbsp;&nbsp;&nbsp;<a href="#profile"  data-toggle="modal"><i class="icon-user icon-white"></i><?php echo $fetch['firstname']; ?>&nbsp;<?php echo $fetch['lastname'];?></a></li>
			</ul>
	</div>
	
	<div id="profile" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="width:700px;">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
					<h3 id="myModalLabel">Mi cuenta</h3>
				</div>
					<div class="modal-body">
						<?php
							$id = (int) $_SESSION['id'];
			
								$query = mysql_query ("SELECT * FROM customer WHERE customerid = '$id' ") or die (mysql_error());
								$fetch = mysql_fetch_array ($query);
						?>
						<center>
					<form method="post">
						<center>
							<table>
								<tr>
									<td class="profile">Nombre:</td><td class="profile"><?php echo $fetch['firstname'];?>&nbsp;<?php echo $fetch['mi'];?>&nbsp;<?php echo $fetch['lastname'];?></td>
								</tr>
								<tr>
									<td class="profile">Direccion:</td><td class="profile"><?php echo $fetch['address'];?></td>
								</tr>
								<tr>
									<td class="profile">Pais:</td><td class="profile"><?php echo $fetch['country'];?></td>
								</tr>
								<tr>
									<td class="profile">Codigo postal:</td><td class="profile"><?php echo $fetch['zipcode'];?></td>
								</tr>
								<tr>
									<td class="profile">Telefono celular:</td><td class="profile"><?php echo $fetch['mobile'];?></td>
								</tr>
								<tr>
									<td class="profile">Telefono casa:</td><td class="profile"><?php echo $fetch['telephone'];?></td>
								</tr>
								<tr>
									<td class="profile">Email:</td><td class="profile"><?php echo $fetch['email'];?></td>
								</tr>
							</table>
						</center>
					</div>
				<div class="modal-footer">
					<a href="account.php?id=<?php echo $fetch['customerid']; ?>"><input type="button" class="btn btn-success" name="edit" value="Edit Account"></a>
					<button class="btn btn-danger" data-dismiss="modal" aria-hidden="true">Cerrar</button>
				</div>
					</form>
			</div>
	
	
	
	<br>
<div id="container">
	<div class="nav">	
			 <ul>
				<li><a href="home.php">   <i class="icon-home"></i>Inicio</a></li>
				<li><a href="product1.php"> 			 <i class="icon-th-list"></i>Producto</a></li>
				<li><a href="aboutus1.php">   <i class="icon-bookmark"></i>Sobre nosotros</a></li>
			</ul>
	</div>
	
	<form method="post" class="well" style="background-color:#fff;">
	<table class="table">
	<label style="font-size:25px;">Mi carrito</label>
		<tr>
			<th><h3>Imagen</h3></td>
			<th><h3>Nombre del producto</h3></th>
			<th><h3>Tamaño</h3></th>
			<th><h3>Cantidad</h3></th>
			<th><h3>Precio</h3></th>
			<th><h3>Agregar</h3></th>
			<th><h3>Eliminar</h3></th>
			<th><h3>Subtotal</h3></th>
		</tr>
	
<?php


	if (isset($_GET['id']))
	$id=$_GET['id'];
	else
	$id=1;
	if (isset($_GET['action']))
	$action=$_GET['action'];
	else
	$action="empty";

	switch($action)
	{
		
		case "view":
			if (isset($_SESSION['cart'][$id]))
			$_SESSION['cart'][$id];
		break;
		case "add":
			if (isset($_SESSION['cart'][$id]))
			$_SESSION['cart'][$id]++;
			else
			$_SESSION['cart'][$id]=1;
		break;
		case "remove":
			if (isset($_SESSION['cart'][$id]))
			{
				$_SESSION['cart'][$id]--;
				if ($_SESSION['cart'][$id]==0)
				unset($_SESSION['cart'][$id]);
			}
		break; 
		case "empty":
			unset($_SESSION['cart']);
		break;
	}
if (isset($_SESSION['cart']))
	{	
	
	$total=0;
	foreach($_SESSION['cart'] as $id => $x)
	{
	$result=mysql_query("Select * from product where product_id=$id");
	$myrow=mysql_fetch_array($result);
	$name=$myrow['product_name'];
	$name=substr($name,0,40);
	$price=$myrow['product_price'];
	$image=$myrow['product_image'];
	$product_size=$myrow['product_size'];
	$line_cost=$price*$x;
	$total=$total+$line_cost;
	
	
		echo "<tr class='table'>";
		echo "<td><h4><img height='70px' width='70px' src='photo/".$image."'></h4></td>";
		echo "<td><h4><input type='hidden' required value='".$id."' name='pid[]'> ".$name."</h4></td>";
		echo "<td><h4>".$product_size."</h4></td>";
		echo "<td><h4><input type='hidden' required value='".$x."' name='qty[]'> ".$x."</h4></td>";
		echo "<td><h4>".$price."</h4></td>";
		echo "<td><h4><a href='cart.php?id=".$id."&action=add'><i class='icon-plus-sign'></i></a></td>";
		echo "<td><h4><a href='cart.php?id=".$id."&action=remove'><i class='icon-minus-sign'></i></a></td>";
		echo "<td><strong><h3>P ".$line_cost."</h3></strong>";
		echo "</tr>";
		}
		
		echo"<tr>";
		echo "<td></td>";
		echo "<td></td>";
		echo "<td></td>";
		echo "<td></td>";
		echo "<td><h2>TOTAL:</h2></td>";
		echo "<td><strong><input type='hidden' value='".$total."' required name='total'><h2 class='text-danger'>P ".$total."</h2></strong></td>";
		echo "<td></td>";
		echo "<td><a class='btn btn-danger btn-sm pull-right' href='cart.php?id=".$id."&action=empty'><i class='fa fa-trash-o'></i> Empty cart</a></td>";		
		echo "</tr>";
	}
 	else
		echo "<font color='#111' class='alert alert-error' style='float:right'>Cart is empty</font>";

?>
	</table>
	
			
	<div class='pull-right'>
	<a href='product1.php' class='btn btn-inverse btn-lg'>Continuar comprando</a>
	<?php echo "<button name='pay_now' type='submit' class='btn btn-inverse btn-lg' >Purchase</button>";
	include ("function/paypal.php"); 
	?>
	</form>
	</div>

		<div id="purchase" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="width:400px;">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
				<h3 id="myModalLabel">Modo de pago</h3>
			</div>
				<div class="modal-body">
					<form method="post">
					<center>
						<input type="image" src="images/button.jpg" border="0" name="submit" alt="Make payments with PayPal - it's fast, free and secure!"  />
						<br/>
						<br/>
						<button class="btn btn-lg" >Efectivo</button>
					</center>
				</div>
			<div class="modal-footer">
				<button class="btn btn-danger" data-dismiss="modal" aria-hidden="true">Cerrar</button>
					</form>
			</div>
		</div>
			
			
		<br />		
		<br />	
</div>
<br />
	<div id="footer">
		<div class="foot">
			<label style="font-size:17px;"> Copyright &copy; </label>
			<p style="font-size:25px;">BaseD</p>
		</div>
			
			<div id="foot">
				<h4>Links</h4>
					<ul>
						<a href="http://www.facebook.com/CUCEI"><li>Facebook</li></a>
						<a href="http://www.twitter.com/CUCEI"><li>Twitter</li></a>
						<a href="http://www.pinterest.com/CUCEI"><li>Pinterest</li></a>
						<a href="http://www.tumblr.com/CUCEI"><li>Tumblr</li></a>
					</ul>
			</div>
			
			<div id="develop">
				<h4>Developed By:</h4>
					<ul>
						<a href="#"><li>Ricardo, Saul</li><a>
						<a href="#"><li>Cassiel, Alexis</li><a>
					</ul>
			</div>
	</div>
</body>
</html>