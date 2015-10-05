<?php
add_action('admin_menu', 'eucn_add_admin_menu');
add_action('admin_init', 'eucn_settings_init');

function eucn_admin_enqueue($hook) {
    if ( $_GET['page']!=='eu_cookie_notice') {
        return;
    }
    wp_register_script('cookie-notice-admin-js', plugins_url('/js/cookie-notice-admin.min.js', __FILE__), array(), '20150329', true);
    wp_register_style('cookie-notice-css', plugins_url('/css/cookie-notice.min.css', __FILE__));
    wp_enqueue_style('cookie-notice-css');
    wp_localize_script('cookie-notice-admin-js', 'notice_strings', get_eucn_option() );
    wp_enqueue_script('cookie-notice-admin-js');
    wp_enqueue_style('eucn_admin_scripts', plugin_dir_url( __FILE__ ) . 'css/admin.min.css' );
}

add_action( 'admin_enqueue_scripts', 'eucn_admin_enqueue' );


function eucn_add_admin_menu() {
    add_options_page('EU Cookie notice', 'EU Cookie notice', 'manage_options', 'eu_cookie_notice', 'eucn_settings_page');
}

function eucn_settings_init() {
    register_setting('pluginPage', 'eucn_settings');

    add_settings_section(
            'eucn_pluginPage_section', __('Settings', 'wordpress'), 'eucn_settings_section_callback', 'pluginPage'
    );
    add_settings_field(
            'eucn_enabled', __('Enable display of cookie notice:', 'wordpress'), 'eucn_enabled_render', 'pluginPage', 'eucn_pluginPage_section'
    );
    add_settings_field(
            'eucn_message_text', __('Cookie notice text:', 'wordpress'), 'eucn_message_text_render', 'pluginPage', 'eucn_pluginPage_section'
    );
    add_settings_field(
            'eucn_google_link_text', __('Text description of link to google info page:', 'wordpress'), 'eucn_google_link_text_render', 'pluginPage', 'eucn_pluginPage_section'
    );
    add_settings_field(
            'eucn_google_link_href', __('Link to google info page:', 'wordpress'), 'eucn_google_link_href_render', 'pluginPage', 'eucn_pluginPage_section'
    );
    add_settings_field(
            'eucn_ok_btn_text', __('Agree button text:', 'wordpress'), 'eucn_ok_btn_text_render', 'pluginPage', 'eucn_pluginPage_section'
    );
}

function get_eucn_option(){
    return get_option('eucn_settings', array(
        'eucn_enabled'=>0, 
        'eucn_message_text'=>'This site uses cookies from Google to deliver its services, to personalize ads and to analyze traffic. information about your use of this site is shared with google. By using this site, you agree to its use of cookies.',
        'eucn_google_link_text'=>'Learn More',
        'eucn_google_link_href'=>'https://www.google.com/intl/cs/policies/technologies/cookies/',
        'eucn_ok_btn_text'=>'Got it'));
}

function eucn_enabled_render() {
    $options = get_eucn_option();
    ?>
    <select name='eucn_settings[eucn_enabled]'>
        <option value='0' <?php selected($options['eucn_enabled'], 0); ?>>Disabled</option>
        <option value='1' <?php selected($options['eucn_enabled'], 1); ?>>Enabled</option>
    </select>
    <?php
}

function eucn_message_text_render() {
    $options = get_eucn_option();
    ?>
    <textarea class="eucn_input eucn_textarea" name='eucn_settings[eucn_message_text]'><?php echo $options['eucn_message_text']; ?></textarea>
    <?php
}

function eucn_google_link_text_render() {
    $options = get_eucn_option();
    ?>
    <input type='text' class="eucn_input eucn_text" name='eucn_settings[eucn_google_link_text]' value='<?php echo $options['eucn_google_link_text']; ?>'>
    <?php
}

function eucn_google_link_href_render() {
    $options = get_eucn_option();
    ?>
    <input type='text' class="eucn_input eucn_text" name='eucn_settings[eucn_google_link_href]' value='<?php echo $options['eucn_google_link_href']; ?>'>
    <?php
}

function eucn_ok_btn_text_render() {
    $options = get_eucn_option();
    ?>
    <input type='text' class="eucn_input eucn_text" name='eucn_settings[eucn_ok_btn_text]' value='<?php echo $options['eucn_ok_btn_text']; ?>'>
    <?php
}

function eucn_settings_section_callback() {
    echo __('', 'wordpress');
}

function eucn_settings_page() {
    ?>
    <form action='options.php' method='post'>

        <h2>EU Cookie notice</h2>
    <?php
    settings_fields('pluginPage');
    do_settings_sections('pluginPage');
    submit_button();
    ?>
    </form>
    <hr/>
    <p>
        <span id="eucn_cookie_status" data-status="0">Cookie notice was not agreed.</span>
        <a href="javascript:void(0);" id="eucn_btn_test" target="_self" title="Test message">Test message display</a>
        <a href="javascript:void(0);" id="eucn_btn_cancel" target="_self" title="Cancel agreement cookie">Cancel agreement cookie</a>
    </p>
    <?php
}
?>