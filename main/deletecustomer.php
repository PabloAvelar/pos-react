<?php
	include('../connect.php');
	$id=$_GET['id'];
	$result = $db->prepare("DELETE FROM customer WHERE customer_id= :memid");
	$result->bindParam(':memid', $id);
	$result->execute();
?>