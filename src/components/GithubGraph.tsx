import { useQuery } from '@tanstack/react-query';

interface DayData {
  contributionCount: number;
  date: string;
  color: string;
}

interface WeekData {
  contributionDays: DayData[];
}

interface CalendarData {
  totalContributions: number;
  weeks: WeekData[];
}

const COLORS = ['#e5e5e5', '#a3a3a3', '#737373', '#404040', '#171717'];
const BLOCK = 12;
const GAP = 4;

function level(count: number): number {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 8) return 2;
  if (count <= 15) return 3;
  return 4;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

function firstMonday(date: Date) {
  // align to Monday start for weekday labels even though API returns Sun-first weeks
  return (date.getDay() + 6) % 7;
}

const GithubGraph = () => {
  const { data, isLoading, isError } = useQuery<CalendarData>({
    queryKey: ['github-contribs'],
    queryFn: async () => {
      const res = await fetch('/api/github-contribs');
      if (!res.ok) throw new Error('Failed to load');
      return res.json();
    },
    staleTime: 60 * 60 * 1000,
    retry: 2,
  });

  const weeks = data?.weeks.map((w) => w.contributionDays) ?? [];

  // pad first week if it doesn't start on Sunday
  if (weeks.length > 0) {
    const first = weeks[0];
    const pad = first.length < 7 ? 7 - first.length : 0;
    if (pad > 0) {
      const empty: DayData[] = Array.from({ length: pad }, () => ({
        contributionCount: 0,
        date: '',
        color: COLORS[0],
      }));
      weeks[0] = [...empty, ...first];
    }
  }

  // month label segments
  const monthSegments: { label: string; span: number }[] = [];
  let lastMonth = -1;
  for (const week of weeks) {
    const d = new Date(week[0]?.date);
    const m = isNaN(d.getTime()) ? lastMonth : d.getMonth();
    if (m !== lastMonth) {
      monthSegments.push({ label: MONTHS[m] ?? '', span: 1 });
      lastMonth = m;
    } else if (monthSegments.length > 0) {
      monthSegments[monthSegments.length - 1].span++;
    }
  }

  // legend labels (only show labels for rows that have content)
  const labelRows = DAY_LABELS.map((label, i) => {
    // only show if at least one column has a real day at this row
    const hasContent = weeks.some((w) => w[i] && w[i].date);
    return hasContent ? label : null;
  });

  return (
    <div className="border-4 border-black p-4 bg-white text-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
      <h3 className="font-mono text-xl font-bold mb-4 border-b-2 border-black pb-2 uppercase tracking-tighter">
        GitHub Activity_
      </h3>

      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="font-mono text-sm text-gray-500 animate-pulse">
            Loading contributions...
          </div>
        </div>
      )}

      {isError && (
        <div className="flex items-center justify-center py-8">
          <div className="font-mono text-sm text-red-500">
            Could not load contribution data.
          </div>
        </div>
      )}

      {data && weeks.length > 0 && (
        <div className="flex justify-center overflow-x-auto pb-1">
          <div>
            {/* month labels */}
            <div className="flex" style={{ marginBottom: 4, marginLeft: 26 }}>
              {monthSegments.map((seg, i) => (
                <span
                  key={i}
                  className="font-mono text-[10px] text-gray-500 leading-none"
                  style={{
                    width: seg.span * (BLOCK + GAP) - GAP,
                    textAlign: 'left',
                  }}
                >
                  {seg.label}
                </span>
              ))}
            </div>

            <div className="flex" style={{ gap: GAP }}>
              {/* day labels */}
              <div
                className="flex flex-col shrink-0"
                style={{ gap: GAP, width: 22, marginRight: 4 }}
              >
                {labelRows.map((label, i) => (
                  <span
                    key={i}
                    className="font-mono text-[10px] text-gray-400 leading-none flex items-center"
                    style={{ height: BLOCK }}
                  >
                    {label}
                  </span>
                ))}
              </div>

              {/* week columns */}
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col" style={{ gap: GAP }}>
                  {week.map((day, di) => (
                    <div
                      key={di}
                      className="rounded-sm"
                      style={{
                        width: BLOCK,
                        height: BLOCK,
                        backgroundColor: COLORS[level(day.contributionCount)],
                      }}
                      title={
                        day.date
                          ? `${day.contributionCount} contribution${day.contributionCount === 1 ? '' : 's'} on ${day.date}`
                          : undefined
                      }
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {data && (
        <div className="mt-3 flex items-center justify-between font-mono text-xs text-gray-500">
          <span>{data.totalContributions} contributions in the last year</span>
          <div className="flex items-center gap-1">
            <span>Less</span>
            {COLORS.map((c, i) => (
              <div
                key={i}
                className="rounded-sm"
                style={{ width: 10, height: 10, backgroundColor: c }}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GithubGraph;
