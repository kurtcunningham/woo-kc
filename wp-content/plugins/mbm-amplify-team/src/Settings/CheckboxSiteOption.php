<?php
namespace MBM\Amplify\Team\Settings;

class CheckboxSiteOption extends SiteOption {
  public function render(): void {
    ?>
      <input 
        type="checkbox" 
        name="<?php echo esc_attr($this->key); ?>" 
        value="1" 
        <?php checked('1', $this->get(), true); ?> 
      />
    <?php

    return;
  }
}
