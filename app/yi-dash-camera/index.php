<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="Cache-control" content="no-cache">
		<meta http-equiv="Pragma" content="no-cache">
        <meta http-equiv="Expires" content="-1">

        <title>YI Dash Camera</title>
        <?php include '../includes/head.html'; ?>
    </head>
    <body>
        <div class="container-fluid">
        <?php 
            include '../includes/header.html';
            include '../includes/yi-dash.html';
            include '../includes/footer.html';
            include '../includes/overlay.html';
            include '../includes/overlay-video.html'; 
        ?>
        </div>
        <?php include '../includes/count.html'; ?>
    </body>
</html>