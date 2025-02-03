<?php
namespace MBM\Amplify\Team\Settings;

class TextSiteOption extends SiteOption {
  public function render(): void {
    ?>
      <input 
        type="text" 
        name="<?php echo esc_attr($this->key); ?>" 
        value="<?php echo esc_attr($this->get()); ?>" 
      />
    <?php

    return;
  }
}
