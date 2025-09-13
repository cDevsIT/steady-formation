export interface Timezone {
  name: string;
  value: string;
  offset: string;
}

export const timezones: Timezone[] = [
  { name: "(GMT-12:00) International Date Line West", value: "Pacific/Kwajalein", offset: "-12:00" },
  { name: "(GMT-11:00) Midway Island, Samoa", value: "Pacific/Midway", offset: "-11:00" },
  { name: "(GMT-10:00) Hawaii", value: "Pacific/Honolulu", offset: "-10:00" },
  { name: "(GMT-09:00) Alaska", value: "America/Anchorage", offset: "-09:00" },
  { name: "(GMT-08:00) Pacific Time (US & Canada)", value: "America/Los_Angeles", offset: "-08:00" },
  { name: "(GMT-07:00) Mountain Time (US & Canada)", value: "America/Denver", offset: "-07:00" },
  { name: "(GMT-06:00) Central Time (US & Canada)", value: "America/Chicago", offset: "-06:00" },
  { name: "(GMT-05:00) Eastern Time (US & Canada)", value: "America/New_York", offset: "-05:00" },
  { name: "(GMT-05:00) Indiana (East)", value: "America/Indiana/Indianapolis", offset: "-05:00" },
  { name: "(GMT-04:00) Atlantic Time (Canada)", value: "America/Halifax", offset: "-04:00" },
  { name: "(GMT-04:00) Caracas, La Paz", value: "America/Caracas", offset: "-04:00" },
  { name: "(GMT-03:30) Newfoundland", value: "America/St_Johns", offset: "-03:30" },
  { name: "(GMT-03:00) Brasilia", value: "America/Sao_Paulo", offset: "-03:00" },
  { name: "(GMT-03:00) Buenos Aires, Georgetown", value: "America/Argentina/Buenos_Aires", offset: "-03:00" },
  { name: "(GMT-02:00) Mid-Atlantic", value: "America/Noronha", offset: "-02:00" },
  { name: "(GMT-01:00) Azores, Cape Verde Is.", value: "Atlantic/Azores", offset: "-01:00" },
  { name: "(GMT) Casablanca, Monrovia, Reykjavik", value: "Africa/Casablanca", offset: "+00:00" },
  { name: "(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London", value: "Europe/London", offset: "+00:00" },
  { name: "(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna", value: "Europe/Paris", offset: "+01:00" },
  { name: "(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague", value: "Europe/Belgrade", offset: "+01:00" },
  { name: "(GMT+01:00) Brussels, Copenhagen, Madrid, Paris", value: "Europe/Brussels", offset: "+01:00" },
  { name: "(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb", value: "Europe/Sarajevo", offset: "+01:00" },
  { name: "(GMT+01:00) West Central Africa", value: "Africa/Lagos", offset: "+01:00" },
  { name: "(GMT+02:00) Amman", value: "Asia/Amman", offset: "+02:00" },
  { name: "(GMT+02:00) Athens, Bucharest, Istanbul", value: "Europe/Athens", offset: "+02:00" },
  { name: "(GMT+02:00) Beirut", value: "Asia/Beirut", offset: "+02:00" },
  { name: "(GMT+02:00) Cairo", value: "Africa/Cairo", offset: "+02:00" },
  { name: "(GMT+02:00) Harare, Pretoria", value: "Africa/Harare", offset: "+02:00" },
  { name: "(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius", value: "Europe/Helsinki", offset: "+02:00" },
  { name: "(GMT+02:00) Jerusalem", value: "Asia/Jerusalem", offset: "+02:00" },
  { name: "(GMT+02:00) Minsk", value: "Europe/Minsk", offset: "+02:00" },
  { name: "(GMT+02:00) Windhoek", value: "Africa/Windhoek", offset: "+02:00" },
  { name: "(GMT+03:00) Baghdad", value: "Asia/Baghdad", offset: "+03:00" },
  { name: "(GMT+03:00) Kuwait, Riyadh, Baghdad", value: "Asia/Kuwait", offset: "+03:00" },
  { name: "(GMT+03:00) Moscow, St. Petersburg, Volgograd", value: "Europe/Moscow", offset: "+03:00" },
  { name: "(GMT+03:00) Nairobi", value: "Africa/Nairobi", offset: "+03:00" },
  { name: "(GMT+03:30) Tehran", value: "Asia/Tehran", offset: "+03:30" },
  { name: "(GMT+04:00) Abu Dhabi, Muscat", value: "Asia/Muscat", offset: "+04:00" },
  { name: "(GMT+04:00) Baku", value: "Asia/Baku", offset: "+04:00" },
  { name: "(GMT+04:00) Yerevan", value: "Asia/Yerevan", offset: "+04:00" },
  { name: "(GMT+04:30) Kabul", value: "Asia/Kabul", offset: "+04:30" },
  { name: "(GMT+05:00) Yekaterinburg", value: "Asia/Yekaterinburg", offset: "+05:00" },
  { name: "(GMT+05:00) Islamabad, Karachi, Tashkent", value: "Asia/Karachi", offset: "+05:00" },
  { name: "(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi", value: "Asia/Kolkata", offset: "+05:30" },
  { name: "(GMT+05:45) Kathmandu", value: "Asia/Kathmandu", offset: "+05:45" },
  { name: "(GMT+06:00) Almaty, Novosibirsk", value: "Asia/Almaty", offset: "+06:00" },
  { name: "(GMT+06:00) Astana, Dhaka", value: "Asia/Dhaka", offset: "+06:00" },
  { name: "(GMT+06:30) Yangon (Rangoon)", value: "Asia/Yangon", offset: "+06:30" },
  { name: "(GMT+07:00) Bangkok, Hanoi, Jakarta", value: "Asia/Bangkok", offset: "+07:00" },
  { name: "(GMT+07:00) Krasnoyarsk", value: "Asia/Krasnoyarsk", offset: "+07:00" },
  { name: "(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi", value: "Asia/Shanghai", offset: "+08:00" },
  { name: "(GMT+08:00) Kuala Lumpur, Singapore", value: "Asia/Kuala_Lumpur", offset: "+08:00" },
  { name: "(GMT+08:00) Irkutsk, Ulaan Bataar", value: "Asia/Irkutsk", offset: "+08:00" },
  { name: "(GMT+08:00) Perth", value: "Australia/Perth", offset: "+08:00" },
  { name: "(GMT+08:00) Taipei", value: "Asia/Taipei", offset: "+08:00" },
  { name: "(GMT+09:00) Osaka, Sapporo, Tokyo", value: "Asia/Tokyo", offset: "+09:00" },
  { name: "(GMT+09:00) Seoul", value: "Asia/Seoul", offset: "+09:00" },
  { name: "(GMT+09:00) Yakutsk", value: "Asia/Yakutsk", offset: "+09:00" },
  { name: "(GMT+09:30) Adelaide", value: "Australia/Adelaide", offset: "+09:30" },
  { name: "(GMT+09:30) Darwin", value: "Australia/Darwin", offset: "+09:30" },
  { name: "(GMT+10:00) Brisbane", value: "Australia/Brisbane", offset: "+10:00" },
  { name: "(GMT+10:00) Canberra, Melbourne, Sydney", value: "Australia/Sydney", offset: "+10:00" },
  { name: "(GMT+10:00) Hobart", value: "Australia/Hobart", offset: "+10:00" },
  { name: "(GMT+10:00) Guam, Port Moresby", value: "Pacific/Guam", offset: "+10:00" },
  { name: "(GMT+10:00) Vladivostok", value: "Asia/Vladivostok", offset: "+10:00" },
  { name: "(GMT+11:00) Magadan, Solomon Is., New Caledonia", value: "Asia/Magadan", offset: "+11:00" },
  { name: "(GMT+12:00) Auckland, Wellington", value: "Pacific/Auckland", offset: "+12:00" },
  { name: "(GMT+12:00) Fiji, Kamchatka, Marshall Is.", value: "Pacific/Fiji", offset: "+12:00" },
  { name: "(GMT+13:00) Nuku'alofa", value: "Pacific/Tongatapu", offset: "+13:00" }
];

export const getTimezoneName = (value: string): string => {
  const timezone = timezones.find(t => t.value === value);
  return timezone ? timezone.name : value;
};

export const getTimezoneValue = (name: string): string => {
  const timezone = timezones.find(t => t.name === name);
  return timezone ? timezone.value : name;
}; 