import { ProjectRecommendation } from '@/types';
import { Lightbulb, Wrench, BarChart2 } from 'lucide-react';

export default function ProjectRecommendationsCard({ recommendations }: { recommendations: ProjectRecommendation[] }) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="card p-6 border-2 border-indigo-500/20 bg-indigo-500/5">
      <h3 className="text-xl font-bold mb-5 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
        <Lightbulb className="w-5 h-5 text-indigo-400" />
        Smart Project Recommendations
      </h3>
      <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
        Based on your domain and identified skill gaps, we recommend building these projects to strengthen your profile.
      </p>

      <div className="space-y-4">
        {recommendations.map((rec, i) => (
          <div
            key={i}
            className="p-4 rounded-xl border border-indigo-500/20 bg-white/5 backdrop-blur-sm hover:border-indigo-500/40 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-base text-indigo-300">{rec.title}</h4>
              <span className="text-xs px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-medium whitespace-nowrap ml-3">
                {rec.difficulty}
              </span>
            </div>
            
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              {rec.description}
            </p>
            
            <div className="flex items-start gap-2">
              <Wrench className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
              <div className="flex flex-wrap gap-1.5">
                {rec.skills_gained.map(skill => (
                  <span
                    key={skill}
                    className="text-xs px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-200 border border-indigo-500/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
