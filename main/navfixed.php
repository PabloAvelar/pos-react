 <div class="navbar navbar-inverse navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container-fluid">
          <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </a>
          <a class="brand" href="#"><b>Punto de ventas</b></a>
          <div class="nav-collapse collapse">
            <ul class="nav pull-right">
              <li><a><i class="icon-user icon-large"></i> Bienvenido:<strong> <?php echo $_SESSION['SESS_LAST_NAME'];?></strong></a></li>
			 <li><a> <i class="icon-calendar icon-large"></i>
								<?php
								$today = date('l, F d, Y');
                echo $today;
								?>

				</a></li>
              <li><a href="../index.php"><font color="red"><i class="icon-off icon-large"></i></font> Cerrar la sesión</a></li>
            </ul>
          </div><!--/.nav-collapse -->
        </div>
      </div>
    </div>
	