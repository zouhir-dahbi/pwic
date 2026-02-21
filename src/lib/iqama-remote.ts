/**
 * Fetches iqama times from a published Google Sheet CSV.
 *
 * Expected sheet layout (two columns, row 1 is header):
 *   Column 1  | Column 2
 *   Fajr      | 6:00 AM
 *   Dhuhr     | 1:00 PM
 *   Asr       | 3:30 PM
 *   Maghrib   | same
 *   Isha      | 8:00 PM
 *   Jummah    | 1:00 PM
 *
 * Returns the updated iqama + jummah config, or null on failure.
 */

interface IqamaOverride {
  iqama: Record<string, string>;
  jummah: string[];
}

const CACHE_KEY = 'pwic_iqama_cache';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const KEY_MAP: Record<string, string> = {
  fajr: 'fajr',
  dhuhr: 'dhuhr',
  duhr: 'dhuhr',
  zuhr: 'dhuhr',
  asr: 'asr',
  maghrib: 'maghrib',
  magrib: 'maghrib',
  isha: 'isha',
  ishaa: 'isha',
};

const DEFAULT_AMPM: Record<string, string> = {
  fajr: 'AM',
  dhuhr: 'PM',
  asr: 'PM',
  maghrib: 'PM',
  isha: 'PM',
  jummah: 'PM',
};

function normalizeTime(val: string, prayerKey: string): string {
  const trimmed = val.trim();
  if (/am|pm/i.test(trimmed)) return trimmed;
  if (/^\d{1,2}:\d{2}$/.test(trimmed)) {
    const ampm = DEFAULT_AMPM[prayerKey] || 'PM';
    return `${trimmed} ${ampm}`;
  }
  return trimmed;
}

function getCache(): { data: IqamaOverride; ts: number } | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw);
    if (Date.now() - cached.ts < CACHE_TTL) return cached;
  } catch {}
  return null;
}

function setCache(data: IqamaOverride) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
  } catch {}
}

function parseCsvValue(raw: string): string {
  return raw.replace(/^"(.*)"$/, '$1').trim();
}

export async function fetchIqamaFromSheet(csvUrl: string): Promise<IqamaOverride | null> {
  const cached = getCache();
  if (cached) return cached.data;

  try {
    const res = await fetch(csvUrl);
    if (!res.ok) return null;
    const csv = await res.text();

    const rows = csv.trim().split('\n').slice(1); // skip header
    const iqama: Record<string, string> = {};
    const jummah: string[] = [];

    for (const row of rows) {
      const cols = row.split(',');
      if (cols.length < 2) continue;
      const rawKey = parseCsvValue(cols[0]);
      const val = parseCsvValue(cols[1]);
      if (!rawKey || !val) continue;

      const key = rawKey.trim().toLowerCase();

      if (key === 'jummah' || key === 'jummah1' || key === 'jumuah') {
        jummah[0] = normalizeTime(val, 'jummah');
      } else if (key === 'jummah2' || key === 'jumuah2') {
        jummah[1] = normalizeTime(val, 'jummah');
      } else if (key === 'jummah3') {
        jummah[2] = normalizeTime(val, 'jummah');
      } else if (KEY_MAP[key]) {
        const mapped = KEY_MAP[key];
        iqama[mapped] = normalizeTime(val, mapped);
      }
    }

    if (Object.keys(iqama).length === 0) return null;

    const result: IqamaOverride = {
      iqama,
      jummah: jummah.filter(Boolean),
    };
    setCache(result);
    return result;
  } catch {
    return null;
  }
}

export function applyOverrides(
  config: any,
  overrides: IqamaOverride,
  createEngine: (c: any) => any,
) {
  for (const [key, val] of Object.entries(overrides.iqama)) {
    config.iqama[key] = val;
  }
  if (overrides.jummah.length > 0) {
    config.jummah = config.jummah || {};
    config.jummah.khutbah = overrides.jummah;
  }
  return createEngine(config);
}
