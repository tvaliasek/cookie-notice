<?php
/*
Plugin Name: EU Cookie Notice by tvaliasek
Plugin URI: https://github.com/tvaliasek/cookie-notice
Description: Custom plugin for integration of EU cookie notice.
Version: 1.0.0
Author: Tomáš Valiašek
Author URI: http://www.valiasek.cz
License: MIT
*/

defined( 'ABSPATH' ) or die( 'B)' );

//***************
// admin scripts
//***************
include_once __DIR__.'/cookie-notice-admin.php';

//***************
// scripts for frontend
//***************
function register_cookie_notice_scripts(){
    wp_register_script('cookie-notice-js', plugins_url('/js/cookie-notice.min.js', __FILE__), array(), '20150329', true);
    wp_register_style('cookie-notice-css', plugins_url('/css/cookie-notice.min.css', __FILE__));
    wp_enqueue_style('cookie-notice-css');
    wp_localize_script('cookie-notice-js', 'notice_strings', get_eucn_option() );
    wp_enqueue_script('cookie-notice-js');
}

$options = get_eucn_option();

if( $options['eucn_enabled'] === "1"){
    add_action('wp_enqueue_scripts', 'register_cookie_notice_scripts');
}
