import { Coordinates, PrayerTimes, CalculationMethod, Madhab } from 'adhan';

export interface PrayerConfig {
  location: { latitude: number; longitude: number; timezone: string; name: string };
  calculation: { method: string; asrMethod: string; highLatitudeRule: string };
  iqama: Record<string, string>;
}

const METHOD_MAP: Record<string, () => any> = {
  'ISNA': CalculationMethod.NorthAmerica,
  'MWL': CalculationMethod.MuslimWorldLeague,
  'Egyptian': CalculationMethod.Egyptian,
  'Karachi': CalculationMethod.Karachi,
  'UmmAlQura': CalculationMethod.UmmAlQura,
};

export function createEngine(config: PrayerConfig) {
  const coords = new Coordinates(config.location.latitude, config.location.longitude);
  const params = (METHOD_MAP[config.calculation.method] || CalculationMethod.NorthAmerica)();
  if (config.calculation.asrMethod === 'Hanafi') params.madhab = Madhab.Hanafi;
  const tz = config.location.timezone;

  const KEYS = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'] as const;
  const NAMES: Record<string, string> = {
    fajr: 'Fajr', dhuhr: 'Dhuhr', asr: 'Asr', maghrib: 'Maghrib', isha: 'Isha'
  };

  function fmt(d: Date): string {
    return d.toLocaleTimeString('en-US', {
      hour: 'numeric', minute: '2-digit', hour12: true, timeZone: tz
    });
  }

  function isRelativeVal(val: string): boolean {
    const v = val.trim().toLowerCase();
    return v === 'same' || v === 'adhan' || v.startsWith('+') || /^\d{1,3}$/.test(v);
  }

  function parseIqama(key: string, adhanDate: Date): Date | null {
    const val = config.iqama[key];
    if (!val) return null;
    const trimmed = val.trim().toLowerCase();
    if (trimmed === 'same' || trimmed === 'adhan') {
      return new Date(adhanDate.getTime());
    }
    if (trimmed.startsWith('+')) {
      return new Date(adhanDate.getTime() + parseInt(trimmed.slice(1), 10) * 60000);
    }
    if (/^\d{1,3}$/.test(trimmed)) {
      return new Date(adhanDate.getTime() + parseInt(trimmed, 10) * 60000);
    }
    const m = val.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (m) {
      let h = parseInt(m[1], 10);
      const min = parseInt(m[2], 10);
      const ap = m[3].toUpperCase();
      if (ap === 'PM' && h !== 12) h += 12;
      if (ap === 'AM' && h === 12) h = 0;
      const d = new Date();
      d.setHours(h, min, 0, 0);
      return d;
    }
    return null;
  }

  function getTimes(now: Date = new Date()) {
    const pt = new PrayerTimes(coords, now, params);
    return KEYS.map(key => {
      const adhan = pt[key];
      const iqama = parseIqama(key, adhan);
      return { key, name: NAMES[key], adhan, iqama: iqama || adhan, isRelative: isRelativeVal(config.iqama[key] || '') };
    });
  }

  function getSunTimes(now: Date = new Date()) {
    const pt = new PrayerTimes(coords, now, params);
    const duha = new Date(pt.sunrise.getTime() + 15 * 60000);
    return { sunrise: pt.sunrise, sunset: pt.sunset, duha };
  }

  function getNext(now: Date = new Date()) {
    const times = getTimes(now);
    return times.find(p => p.iqama > now) || times[0];
  }

  function formatCountdown(target: Date, now: Date = new Date()): string {
    const diff = target.getTime() - now.getTime();
    if (diff < 0) return '';
    const mins = Math.floor(diff / 60000);
    const hrs = Math.floor(mins / 60);
    const rem = mins % 60;
    return hrs > 0 ? `in ${hrs}h ${rem}m` : `in ${mins}m`;
  }

  function getHijriDate(now: Date = new Date()): string {
    try {
      return new Intl.DateTimeFormat('en-US', {
        calendar: 'islamic-umalqura',
        day: 'numeric', month: 'long', year: 'numeric', timeZone: tz
      }).format(now);
    } catch { return ''; }
  }

  function getGregorianDate(now: Date = new Date()): string {
    return now.toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: tz
    });
  }

  function getClock(now: Date = new Date()) {
    const full = now.toLocaleTimeString('en-US', {
      hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true, timeZone: tz
    });
    const hm = now.toLocaleTimeString('en-US', {
      hour: 'numeric', minute: '2-digit', hour12: false, timeZone: tz
    });
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
    let hour = now.getHours() % 12;
    if (hour === 0) hour = 12;
    const minute = String(now.getMinutes()).padStart(2, '0');
    const timeOnly = `${hour}:${minute}`;
    return { time: `${timeOnly} ${ampm}`, seconds, full, timeOnly, ampm };
  }

  return { getTimes, getSunTimes, getNext, formatCountdown, getHijriDate, getGregorianDate, getClock, fmt, KEYS, NAMES };
}
