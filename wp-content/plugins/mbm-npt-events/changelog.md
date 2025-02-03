# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).


## [0.3.0] - 2025-01-16

### Added

- Event Date now works on specific event date properties, and mimics the behavior of the stock Post Date block.


## [0.2.2] - 2024-12-20

### Fixed

- Correctly converts event start and end dates into the site timezone.


## [0.2.1] - 2024-11-18

### Fixed

- Refined icons.


## [0.2.0] - 2024-11-01

### Added

- Registration deadline support. Registration link buttons can now be automatically hidden once an optional registration deadline has passed.
- Blocks are organized under an "Amplify Events" category.
- Registration button now hides when registration deadline or event is passed.

### Fixed

- Setting a date on an event when the site's timezoen hasn't been established will now default to a generic UTC timezone. The timezone warning on the Amplify Events event data sidebar is 
now conditional depending on whether we can find a configured timezone.


## [0.1.10] - 2023-04-08

### Fixed

- Query Loops targeting Events will now sort by event start date when the sort order is "Newest to oldest" or "Oldest to newest". In those cases, events without specific start dates will be excluded from the query results.


## [0.1.9] - 2023-04-01

### Added

- Event Registration Buttons now have custom icons.


## [0.1.8] - 2023-03-11

### Added

- Admin list of Events is now sortable by event date.


## [0.1.7] - 2023-03-05

### Fixed

- More verbose Event Category labels to help disambiguate them from the stock WordPress post category taxonomy.


## [0.1.6] - 2023-03-04

### Added

- Flush rewrite rules upon plugin activation and deactivation.


### Fixed

- Incorrectly handled missing Event start times inside Gutenberg Editor Query Loop blocks.
- Adds missing Composer dependencies (MBM Gutenberg support classes).


## [0.1.5] - 2023-03-01

### Fixed

- Errors in Gutenberg module (view) script registration and enqueueing.


## [0.1.4] - 2023-02-29

### Fixed

- Correct hierarchical configuration for Events Categories taxonomy.


## [0.1.3] - 2023-02-28

### Added

- Custom taxonomy for Events.
- Events admin list "event date" column.

### Fixed

- More accurate labels for Events admin functions.


## [0.1.2] - 2023-02-28

### Fixed

- Adds missing Composer dependency that prevented Event Registration Button from rendering.
- Error when rendering Event Date in an editor that isn't providing post context.


## [0.1.1] - 2023-02-26

### Fixed

- Error in parsing time values for new events.


## [0.1.0] - 2023-02-10

### Added

- Initial build.
