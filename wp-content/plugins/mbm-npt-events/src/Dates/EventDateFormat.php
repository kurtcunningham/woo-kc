<?php
namespace MBM\NonProfitToolkit\Events;

class EventDateFormat implements DateRangeFormatterInterface {
  public function __construct(
    public string $start_format = 'F j, Y',
    public string $end_format = 'F j, Y',
    public string $separator = ' — ',
    public string $no_date_fallback = 'N/A',
  ) {}

  public function formatDateRange(?\DateTime $start_date, ?\DateTime $end_date): string {
    if (empty($start_date)) {
      return $this->no_date_fallback;
    }

    $formatted_start = $start_date->format($this->start_format);

    if (empty($end_date)) {
      return $formatted_start;
    }

    $formatted_end = $end_date->format($this->end_format);

    return $formatted_start . $this->separator . $formatted_end;
  }
}
