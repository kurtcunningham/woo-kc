<?php
namespace MBM\NonProfitToolkit\Events\Dates;

class PrettyDateRangeFormatter implements DateRangeFormatterInterface {
  public function __construct(
    protected string $start_only_format = 'F j, Y \| h:i A',
    protected array $same_day_format = ['F j, Y h:i A', ' \- h:i A T'],
    protected array $same_month_format = ['F j', ' \- j, Y'],
    protected array $same_year_format = ['F j', ' \- F j, Y'],
    protected array $full_date_format = ['F j Y', ' \- F j Y'],
    protected string $no_date_fallback = 'N/A',
  ) {}

  public function formatDateRange(?\DateTime $start_date, ?\DateTime $end_date): string {
    if (empty($start_date)) {
      return $this->no_date_fallback;
    }

    if (empty($end_date)) {
      return $start_date->format($this->start_only_format);
    }

    $is_same_year = $start_date->format('Y') === $end_date->format('Y');
    $is_same_month = $is_same_year && $start_date->format('m') === $end_date->format('m');
    $is_same_day = $is_same_month && $start_date->format('d') === $end_date->format('d');

    if ($is_same_day) {
      [$start_format, $end_format] = $this->same_day_format;
      return $start_date->format($start_format) . $end_date->format($end_format);
    }

    if ($is_same_month) {
      [$start_format, $end_format] = $this->same_month_format;
      return $start_date->format($start_format) . $end_date->format($end_format);
    }

    if ($is_same_year) {
      [$start_format, $end_format] = $this->same_year_format;
      return $start_date->format($start_format) . $end_date->format($end_format);
    }

    [$start_format, $end_format] = $this->full_date_format;
    return $start_date->format($start_format) . $end_date->format($end_format);
  }
}
