<?php
namespace MBM\Amplify\Team\Settings;

// TODO: Extract this to a separate file?
trait SingletonTrait {
    private static ?self $instance = null;

    public static function getInstance(): self {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {}
    private function __clone() {}
    public function __wakeup() {}
}

class SettingsData {
    use SingletonTrait;

    public SiteOption $teamArchiveEnabled;
    public SiteOption $teamSlug;
    public SiteOption $teamPostAccessAllowed;
    public SiteOption $careersArchiveEnabled;
    public SiteOption $careersSlug;
    public SiteOption $careersPostAccessAllowed;

    private function __construct() {
        $option_key_root = 'amplify_team_';
        $option_key_team = $option_key_root . 'team_';
        $option_key_careers = $option_key_root . 'careers_';

        $this->teamArchiveEnabled = new CheckboxSiteOption(
            key: $option_key_team . 'archive_enabled',
            defaultValue: true
        );
        $this->teamSlug = new TextSiteOption(
            key: $option_key_team . 'slug',
            defaultValue: 'team',
        );
        $this->teamPostAccessAllowed = new CheckboxSiteOption(
            key: $option_key_team . 'post_access_allowed',
            defaultValue: true
        );

        $this->careersArchiveEnabled = new CheckboxSiteOption(
            key: $option_key_careers . 'archive_enabled',
            defaultValue: true
        );
        $this->careersSlug = new TextSiteOption(
            key: $option_key_careers . 'slug',
            defaultValue: 'careers',
        );
        $this->careersPostAccessAllowed = new CheckboxSiteOption(
            key: $option_key_careers . 'post_access_allowed',
            defaultValue: true
        );
    }

    public static function register():void {
        self::getInstance()->registerOptions();
    }

    protected function registerOptions(): void {
        $this->teamArchiveEnabled->register();
        $this->teamSlug->register();
        $this->teamPostAccessAllowed->register();
        $this->careersArchiveEnabled->register();
        $this->careersSlug->register();
        $this->careersPostAccessAllowed->register();
    }
}
