<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><?php wp_title('|', true, 'right'); ?></title>
    <link rel="stylesheet" href="<?php echo $GLOBALS['assets']->get(get_template_directory_uri() . '/build', 'main.css'); ?>">
    <!--<?php get_template_part('partials/service-worker', 'index'); ?>-->
    <?php wp_head(); ?>
</head>
<body <?php body_class($class); ?>>
