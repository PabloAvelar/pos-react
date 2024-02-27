<?php
	include('../connect.php');
	$id=$_GET['id'];
	$qty=$_GET['qty'];
	
	$result = $db->prepare("SELECT * FROM products WHERE product_code= :userid");
$result->bindParam(':userid', $b);
$result->execute();
for($i=0; $row = $result->fetch(); $i++){
$qty=$row['qty'];
}

	$sql = "UPDATE products 
        SET qty=qty+?
		WHERE product_id=?";

	
	$result = $db->prepare("DELETE FROM sales_order WHERE transaction_id= :id");
	$result->bindParam(':id', $id);
	$result->execute();
		header("location: sales_inventory.php");
?>