import './MapScreen.css';

const sections = [
  {
    id: 'saving',
    name: 'Saving Reef',
    emoji: '💰',
    color: '#4CAF50'
  },
  {
    id: 'spending',
    name: 'Spending Bay',
    emoji: '🛒',
    color: '#2196F3'
  },
  {
    id: 'management',
    name: 'Money Management Lagoon',
    emoji: '📊',
    color: '#9C27B0'
  }
];

export default function MapScreen({ state, dispatch }) {
  const handleSectionClick = (sectionId) => {
    dispatch({ type: 'START_SECTION', section: sectionId });
  };

  return (
    <div className="map-screen">
      <h2 className="map-title">Choose Your Path</h2>
      <p className="map-subtitle">Defeat the Loan Sharks in all three zones!</p>

      <div className="sections-grid">
        {sections.map((section) => {
          const sectionData = state.sections[section.id];
          const progress = (sectionData.completed / 5) * 100;
          const sharkHp = sectionData.hp;
          const hasBadge = sectionData.badge;

          return (
            <div
              key={section.id}
              className="section-card"
              style={{ borderColor: section.color }}
            >
              <div className="section-header">
                <span className="section-emoji">{section.emoji}</span>
                <h3 className="section-name">{section.name}</h3>
              </div>

              <div className="section-stats">
                <div className="stat-row">
                  <span>Progress:</span>
                  <span>{sectionData.completed}/5 levels</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: section.color
                    }}
                  />
                </div>

                <div className="stat-row">
                  <span>Shark HP:</span>
                  <span>{sharkHp}/100</span>
                </div>
                <div className="hp-bar">
                  <div
                    className="hp-fill"
                    style={{ width: `${sharkHp}%` }}
                  />
                </div>
              </div>

              {hasBadge && (
                <div className="badge-earned">
                  🏅 Badge Earned!
                </div>
              )}

              <button
                className="btn-primary"
                style={{ backgroundColor: section.color }}
                onClick={() => handleSectionClick(section.id)}
              >
                {sectionData.completed === 0 ? 'Start' : 'Continue'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Check if all badges earned */}
      {state.sections.saving.badge &&
        state.sections.spending.badge &&
        state.sections.management.badge && (
          <div className="victory-banner">
            🎉 You've collected all badges! You're a Finance Pro! 🎉
          </div>
        )}
    </div>
  );
}