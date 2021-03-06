<% if (projectType === 'Wordpress Theme') { %><?php
the_post();
get_header();
?>

<p>This is a WHQ Wordpress theme.</p>

<?php get_footer();
<% } else { %><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><%= name %></title>
    <?php
    $manifest = file_get_contents('build/manifest.json');
    $assets = json_decode($manifest, true);
    ?>
    <link rel="stylesheet" href="build/<?php echo $assets['main.css']; ?>">
    <!--<script>
        if ('serviceWorker' in navigator && !window.location.hostname.startsWith('dev')) {
            window.addEventListener('load', function () {
                navigator.serviceWorker.register('/build/service-worker.js', {scope: '/'})
                    .then(registration => {
                        console.log('SW registered: ', registration)
                    }).catch(registrationError => {
                        console.log('SW registration failed: ', registrationError)
                    })
            })
        }
    </script>-->
</head>
<body>
    <p>This is a WHQ project.</p>
    <script src="build/<?php echo $assets['main.js']; ?>"></script>
</body>
</html><% } %>
