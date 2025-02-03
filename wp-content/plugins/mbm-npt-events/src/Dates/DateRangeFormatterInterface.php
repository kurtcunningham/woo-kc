<?php
namespace MBM\NonProfitToolkit\Events\Dates;

interface DateRangeFormatterInterface {
  public function formatDateRange(?\DateTime $start_date, ?\DateTime $end_date): string;
}
