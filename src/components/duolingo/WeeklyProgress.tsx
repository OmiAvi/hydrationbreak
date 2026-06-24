'use client';

export function WeeklyProgress() {
  const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  // Mock data: assume user has done Mon-Fri, today is Friday
  const completed = [true, true, true, true, true, false, false];
  
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-bold text-gray-900 mb-1">This week's progress</p>
        <p className="text-xs text-slate-600">5 out of 7 days completed</p>
      </div>
      <div className="flex justify-between gap-1.5">
        {days.map((day, i) => (
          <div
            key={day}
            className="flex-1 flex flex-col items-center gap-1.5"
          >
            <div
              className={`w-full aspect-square rounded-xl flex items-center justify-center font-bold text-sm transition-all sm:text-base ${
                completed[i]
                  ? 'bg-green-500 text-white shadow-md'
                  : i === new Date().getDay() - 1 || (new Date().getDay() === 0 && i === 4)
                    ? 'bg-white border-2 border-green-500 text-green-600'
                    : 'bg-slate-200 text-slate-500'
              }`}
            >
              {completed[i] ? '✓' : day.charAt(0)}
            </div>
            <p className="text-xs text-slate-600 font-medium">{day}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
