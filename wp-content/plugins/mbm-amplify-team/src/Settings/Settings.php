<?php
namespace MBM\Amplify\Team\Settings;

class Settings {
    const SETTINGS_GROUP = 'amplify_team_settings';
    const SETTINGS_SECTION_TEAM = 'amplify_team_settings_section_team';
    const SETTINGS_SECTION_CAREERS = 'amplify_team_settings_section_careers';
    const SETTINGS_PAGE = 'amplify-team-settings';

    public static function register(): void {
        add_action('admin_menu', [self::class, 'add_settings_page']);
        add_action('admin_init', [self::class, 'register_settings_fields']);
        add_action('rest_api_init', [self::class, 'register_settings']);

        $settings_data = SettingsData::getInstance();
        $flush_on_update_option_keys = [
            $settings_data->teamArchiveEnabled->key,
            $settings_data->teamSlug->key,
            $settings_data->careersArchiveEnabled->key,
            $settings_data->careersSlug->key,
        ];
        foreach ($flush_on_update_option_keys as $idx => $key) {
            add_action(
                'update_option_' . $key,
                [self::class, 'flush_permalinks_on_update'],
                10,
                3
            );
        }

        add_action(
            'init',
            function() {
                SettingsData::getInstance()->register();
            },
            10,
            0 
        );
    }

    public static function add_settings_page(): void {
        add_submenu_page(
            'edit.php?post_type=mbmamp_team_member', // Parent slug (Team custom post type menu)
            'Amplify Team Settings',   // Page title
            'Settings',                // Menu title
            'manage_options',          // Capability
            self::SETTINGS_PAGE,       // Menu slug
            [self::class, 'render_settings_page'] // Callback function
        );
    }

    public static function register_settings(): void {
        $settings_data = SettingsData::getInstance();
        
        register_setting(
            self::SETTINGS_GROUP, 
            $settings_data->teamArchiveEnabled->key,
            ['type' => 'boolean', 'default' => $settings_data->teamArchiveEnabled->defaultValue, 'show_in_rest' => false]
        );
        register_setting(
            self::SETTINGS_GROUP, 
            $settings_data->teamSlug->key,
            ['type' => 'string', 'default' => $settings_data->teamSlug->defaultValue, 'show_in_rest' => false]
        );
        register_setting(
            self::SETTINGS_GROUP, 
            $settings_data->teamPostAccessAllowed->key, 
            ['type' => 'boolean', 'default' => $settings_data->teamPostAccessAllowed->defaultValue, 'show_in_rest' => true]
        );
        register_setting(
            self::SETTINGS_GROUP, 
            $settings_data->careersArchiveEnabled->key,
            ['type' => 'boolean', 'default' => $settings_data->careersArchiveEnabled->defaultValue, 'show_in_rest' => false]
        );
        register_setting(
            self::SETTINGS_GROUP, 
            $settings_data->careersSlug->key,
            ['type' => 'string', 'default' => $settings_data->careersSlug->defaultValue, 'show_in_rest' => false]
        );
        register_setting(
            self::SETTINGS_GROUP, 
            $settings_data->careersPostAccessAllowed->key,
            ['type' => 'boolean', 'default' => $settings_data->careersPostAccessAllowed->defaultValue, 'show_in_rest' => true]
        );
    }    
    
    public static function register_settings_fields(): void {
        self::register_settings();

        $settings_data = SettingsData::getInstance();

        add_settings_section(
            self::SETTINGS_SECTION_TEAM,
            'Team Archive Settings',
            null,
            self::SETTINGS_PAGE
        );

        add_settings_field(
            $settings_data->teamArchiveEnabled->key,
            'Enable Team Archive',
            function() use ($settings_data): void {
               $settings_data->teamArchiveEnabled->render();
            },
            self::SETTINGS_PAGE,
            self::SETTINGS_SECTION_TEAM
        );

        add_settings_field(
            $settings_data->teamSlug->key,
            'Team Slug',
            function() use ($settings_data): void {
                $settings_data->teamSlug->render();
             },
            self::SETTINGS_PAGE,
            self::SETTINGS_SECTION_TEAM
        );

        add_settings_field(
            $settings_data->teamPostAccessAllowed->key,
            'Post Access Allowed',
            function() use ($settings_data): void {
                $settings_data->teamPostAccessAllowed->render();
             },
            self::SETTINGS_PAGE,
            self::SETTINGS_SECTION_TEAM
        );

        add_settings_section(
            self::SETTINGS_SECTION_CAREERS,
            'Careers Archive Settings',
            null,
            self::SETTINGS_PAGE
        );

        add_settings_field(
            $settings_data->careersArchiveEnabled->key,
            'Enable Careers Archive',
            function() use ($settings_data): void {
                $settings_data->careersArchiveEnabled->render();
             },
            self::SETTINGS_PAGE,
            self::SETTINGS_SECTION_CAREERS
        );

        add_settings_field(
            $settings_data->careersSlug->key,
            'Careers Slug',
            function() use ($settings_data): void {
                $settings_data->careersSlug->render();
             },
            self::SETTINGS_PAGE,
            self::SETTINGS_SECTION_CAREERS
        );

        add_settings_field(
            $settings_data->careersPostAccessAllowed->key,
            'Post Access Allowed',
            function() use ($settings_data): void {
                $settings_data->careersPostAccessAllowed->render();
             },
            self::SETTINGS_PAGE,
            self::SETTINGS_SECTION_CAREERS
        );
    }

    public static function render_settings_page(): void {
        ?>
        <div class="wrap">
            <h1>Amplify Team Settings</h1>
            <form method="post" action="options.php">
                <?php
                settings_fields(self::SETTINGS_GROUP);
                do_settings_sections(self::SETTINGS_PAGE);
                submit_button();
                ?>
            </form>
        </div>
        <?php
    }

    public static function flush_permalinks_on_update(
        string $option, 
        mixed $old_value, 
        mixed $value
    ): void {
        if ($old_value === $value) {
            return;
        }

        // Warn: flushing rewrite rules as a response to options updates
        // seems to happen too late in the WP lifecycle to have any effect.
        flush_rewrite_rules();

        // Delete the rewrite rules transient to force a refresh
        // From: https://developer.wordpress.org/reference/functions/flush_rewrite_rules/#comment-4023
        delete_option('rewrite_rules');

        return;
    }
}
