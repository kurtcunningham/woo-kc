# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).


## [2.3.0] - 2025-01-07

### Added

- Introduced the first versions of the carousel blocks (Carousel and Carousel Query).


## Fixed

- Refactored the responsive settings panel components to improve reusability.


## [2.2.0] - 2024-11-22

### Added

- Converted Gridible to an entirely new build system, paving the way for future updates.


## [2.1.10] - 2024-10-07

### Fixed

- Resolved issue with Composer dependencies unintentionally creating Git submodules.


## [2.1.9] - 2024-08-16

### Fixed

- There is no longer a single-pixel gap between breakpoints in the column visibility rules.


## [2.1.8] - 2024-08-15

### Fixed

- Fixed column offset functionality.


## [2.1.7] - 2024-06-25

### Fixed

- Rely on Gutenberg block supports to provide `has-global-padding` class for the Gridible Container block.


## [2.1.6] - 2024-06-17

### Added

- Adds border, background, and dimension style controls to Gridible Container.

### Fixed

- Improves the padding rendering of the Gridible Container block inside Gutenberg editors.


## [2.1.5] - 2024-06-06

### Fixed

- Updates all blocks to Gutenberg block API version 3, adding block props support.
- Cleans up a couple React list-missing-key warnings.
- Deprecated Block Editor useSetting call.


## [2.1.4] - 2024-05-30

### Fixed

- Column and offset selection in the responsive controls now expands to span the full width of the Inspector panel. Note that this change causes the range controls to no longer full width in Gutenberg versions earlier than v18.4. These changes, and bugs, are identical to those present in the core Gutenberg blocks.


## [2.1.3] - 2024-04-19

### Fixed

- Updates preview device type acquisition to silence deprecation errors in the Gutenberg editor interfaces.


## [2.1.2] - 2024-01-26

### Fixed

- Forces activation status updates after any persistence operations on the Gridible plugin settings page.
- No longer disables all Gridible blocks upon license validation failure. Instead, additional Gridible blocks cannot be added to pages in the Gutenberg editor.


## [2.1.1] - 2024-01-25

### Fixed

- Fixes typo in license validation warning message.


## [2.1.0] - 2023-11-30

### Fixed

- Gridible Container removes inner element, which requires block recovery but fixes issue with failure to take alignment settings.
- Adds styles to compensate for Gutenberg nested container padding changes.


## [2.0.0] - 2023-08-26

### Release Note

- Gridible 2.0 is here. This version is jammed packed with new features and it better integrates with block themes. We do not suggest upgrading this this feature unless you are still in development mode for your client site or are starting brand new.
- Over the next few months we will be working on improving the overall user experience and creating more efficient ways to build beautiful, responsive WordPress block layouts.
- Oh yeah, we also updated the plugin's settings page.

### Fixed

- Container block now uses layout settings and sets the max-width based on your theme's wideSize.
- Container block now supports margin dimensions.
- Grid Container has been renamed to Grid Layout.
- Grid Layout now supports dimensions.
- Grid Layout now supports alignment options.
- Offset now looks and feels like the core/spacer block but allows you to set the visibility per-breakpoint.
- New responsive controls link up with the preview mode controls so you see what your design will look like in each breakpoint.
- We removed the extra small breakpoint to better align with WordPress' breakpoint settings.


- PHP 8.2 compatibility.

## [0.4.11] - 2023-07-05

### Fixed

- PHP 8.2 compatibility.


## [0.4.10] - 2023-06-02

### Fixed

- Responsive spacer now defaults to fully translucent, following the lead of Gutenberg's Spacer block.
- Patterns and custom pattern category are not registered when the plugin isn't licnensed.


## [0.4.9] - 2023-06-01

### Fixed

- Transient initialization for config manager.
- Missing pattern definitions.
- Failure to load all web assets in the Site Editor.


## [0.4.8] - 2023-05-30

### Fixed

- Transient clean up for the update and config managers.


## [0.4.7] - 2023-05-30

### Added

- Gridible block patterns and a custom 'Gridible' pattern category.


## [0.4.6] - 2023-04-26

### Added

- Support for automatic plugin updates from custom plugin update server.


## [0.4.4] - 2023-04-26

### Fixed

- Improved licenses status checks after WP Migrate operations.


## [0.4.3] - 2023-04-25

### Fixed

- Specifies box sizing for editor views to ensure alignment.


## [0.4.2] - 2023-04-03

### Added

- Better invalid license error messaging.

### Fixed

- Refactors the web asset build system and resolves issue with missing front styles within the site editor.
- Handles activation when license check config values are missing.
- Adds some resiliency around unexpected server responses when making activation checks.


## [0.4.0] - 2023-03-29

### Fixed

- Rewrote the flexbox implementation of the grid to better support more theme layout approaches. This also fixes a bug that prevented accurate nested grid rendering in the Gutenberg editor.
- Cleans out unnecessary git files from distributable archive.
- Failure to update license status check transient after the transient expires.


## [0.3.1] - 2023-03-21

### Added

- Link to Gridible settings page when license key is flagged as invalid.

### Fixed

- Failures when attempting to read uninitialized site options.
- Missing license server configuration file.
- License state failed to update when initially setting license config values.
- Incorrect web asset path.
- Updates Composer autoload files to resolve issues with WP Engine.


## [0.3.0] - 2023-03-19

Initial release for internal testing.

### Added

- Licensing support.
