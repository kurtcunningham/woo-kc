<?php
namespace MBM\Amplify\Team\Settings;

abstract class SiteOption {
  public function __construct(
    public string $key, 
    public mixed $defaultValue,
    public bool $autoload = false,
  ) {}

  public function register(): bool {
    $add_option_success = add_option(
      option: $this->key, 
      value: $this->defaultValue,
      autoload: $this->autoload,
    );

    return $add_option_success;
  }

  public function get(): mixed {
    return get_option($this->key, $this->defaultValue);
  }

  public function set(mixed $value): void {
    update_option($this->key, $value);
  }

  abstract public function render(): void;
}
