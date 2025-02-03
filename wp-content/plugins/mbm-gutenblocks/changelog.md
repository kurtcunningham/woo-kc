# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).


## [4.11.0] - 2024-10-07

### Added

- Exclude Post Query variation now supports two methods for excluding the current post, allowing for a choice between faster or cache-friendly approaches.
- Related Post Query variation now works with term archives, adding the queried term to the taxonomy arguments of the query.

### Fixed

- Featured Post Image dynamic caption attributes were too widely available, and are now restricted to just the Featured Post Image block.


## [4.10.2] - 2024-09-11

### Fixed

- Improves robustness in matching posts to user input within the Selected Post Query post selector.


## [4.10.1] - 2024-09-07

### Fixed

- Resolves issue arising from  PHPCS complaint.


## [4.10.0] - 2024-09-05

### Added

- Featured image caption extension.


## [4.9.1] - 2024-08-21

### Fixed

- Icon cleanup for the new terms conditional blocks.


## [4.9.0] - 2024-08-08

### Added

- Adds the Post Terms Conditional Container block.


## [4.8.0] - 2024-07-11

### Added

- Adds the Related Posts Query variation.


## [4.7.0] - 2024-07-08

### Added

- Current Date (and copyright) block.


## [4.6.0] - 2024-06-05

### Added

- Query Taxonomy Filter now presents hierarchical taxonomies as a tree.

### Fixed

- Query Taxonomy Filter no longer removes taxonomy filter configurations when changing the selected taxonomy. This resolves errors that occurred when multiple Query Taxonomy Filter blocks were pointed at the same taxonomy.


## [4.5.0] - 2024-04-17

### Added

- Restores the Semantic Wrapper block, and adds support for new elements (nav, ol, ul, li).

### Fixed

- Tab Layout's Tab Buttons block now uses the Gutenberg "flex layout" controls (similar to the Group block).
- Query Taxonomy Filter now properly renders in the editor and will reflect block selection as expected.
- Updates all blocks to use block API v3.


## [4.4.0] - 2024-04-17

### Added

- Tab Layout block.


## [4.3.1] - 2024-04-11

### Added

- Alters labels on the dropdowns of the Query Taxonomy Filter block.
- Added more typography configurability for the Query Taxonomy Filter block.


## [4.3.0] - 2024-04-05

### Added

- Adds ability to select the relation of the terms in the query constructed by the Taxonomy Filter block.
- Adds click-outside support to Taxonomy Filter block.


## [4.2.2] - 2024-04-05

### Fixed

- Style fix for query filter select block.


## [4.2.1] - 2024-04-01

### Fixed

- Correctly matches web asset versions to the plugin version.


## [4.2.0] - 2024-03-28

### Added

- Query Taxonomy Filter now supports multiple selects.


## [4.1.2] - 2024-03-21

### Fixed

- Selected Post Query now works with custom post types.


## [4.1.1] - 2024-03-15

### Fixed

- Single Post Query has now been deprecated and is now longer available for selection from the block inserter. The Selected Post Query block should be used instead.
- Exclude Current Post variation no longer shows exclude post controls on Munsters variations.


## [4.1.0] - 2024-03-15

### Added

- Rebuilt the Accordion block to be simpler and render to semantic HTML.


## [4.0.3] - 2024-01-31

### Fixed

- Updates build system configuration to produce the correct module type for the editor script.
- Now compatible wtih Gutenberg v17.6 module registration.
- Query Loop variations now work when a block's `queryId` attribute is `0`.


## [4.0.2] - 2024-01-24

### Added

- Placeholder icons for all recently rebuilt blocks.

### Fixed

- More compact plugin archive that excludes unnecessary source files.


## [4.0.1] - 2024-01-23

### Fixed

- New blocks now have accurate block support declarations.


## [4.0.0] - 2024-01-17

### Added

- Initial versions of the Accordion, Accordion Group, and Query Filter blocks.
- Query Loop variations to exclude the current post and select a single post to feature.


## [3.3.0] - 2023-11-27

### Fixed

- Updated Card to use new APIv3 Gutenberg style controls.


## [3.3.2] - 2023-07-26

### Fixed

- Carousel query slide functionality is restored.


## [3.3.1] - 2023-07-24

### Fixed

- Carousel editor UX improvements.


## [3.3.0] - 2023-07-21

### Fixed

- Carousel and slides are now built with Gridible grid container and columns.
- Updates Swiper to v10, improving reliability.


## [3.2.5] - 2023-07-20

### Added

- "Exclude current post" functionality to the core Query Loop block.


## [3.2.4] - 2023-07-05

### Fixed

- Compatibility issue with PHP 8.2.


## [3.2.3] - 2023-06-05

### Fixed

- Failure to load and initialize Alpine in the Gutenberg editors.


## [3.2.2] - 2023-05-19

### Fixed

- Looping mode in Carousel.
- Carousel configuration not being read.


## [3.1.0] - 2023-04-06

### Fixed

- Web asset build system updated and simplified.


## [3.0.1] - 2023-03-01

### Removed

- Grid-related blocks (Grid Container, Grid Column, Responsive Spacer, Container) moved to Gridible.
