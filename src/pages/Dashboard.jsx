
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const savedApplications = JSON.parse(
      localStorage.getItem("applications") || "[]"
    );
    setApplications(
      Array.isArray(savedApplications) ? savedApplications : []
    );
  }, []);

  const countByStatus = (status) =>
    applications.filter(
      (app) =>
        String(app.status || "").toLowerCase() === status.toLowerCase()
    ).length;

  const stats = [
    {
      title: "Total Applications",
      value: applications.length,
      icon: "📁",
      color: "blue",
      description: "All submitted applications",
    },
    {
      title: "Applied",
      value: countByStatus("Applied"),
      icon: "📨",
      color: "purple",
      description: "Waiting for a response",
    },
    {
      title: "Interviews",
      value: countByStatus("Interview"),
      icon: "🤝",
      color: "orange",
      description: "Opportunities to connect",
    },
    {
      title: "Accepted",
      value: countByStatus("Accepted"),
      icon: "✓",
      color: "green",
      description: "Offers received",
    },
  ];

  const statusItems = [
    { label: "Applied", color: "status-applied" },
    { label: "Interview", color: "status-interview" },
    { label: "Accepted", color: "status-accepted" },
    { label: "Rejected", color: "status-rejected" },
  ];

  const getDate = (app) =>
    app.applicationDate || app.date || app.createdAt || "";

  const recentApplications = [...applications]
    .sort((a, b) => {
      const dateA = new Date(getDate(a)).getTime() || 0;
      const dateB = new Date(getDate(b)).getTime() || 0;
      return dateB - dateA;
    })
    .slice(0, 5);

  const formatDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return date;

    return parsedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusClass = (status) => {
    const normalized = String(status || "").toLowerCase();

    if (normalized === "applied") return "status-applied";
    if (normalized === "interview") return "status-interview";
    if (normalized === "accepted") return "status-accepted";
    if (normalized === "rejected") return "status-rejected";

    return "status-default";
  };

  return (
    <main className="dashboard-page">
      <div className="container-fluid dashboard-container">
        <section className="dashboard-heading">
          <div>
            <span className="dashboard-eyebrow">
              YOUR CAREER WORKSPACE
            </span>
            <h1>Dashboard</h1>
            <p>
              Keep track of your applications and your next opportunity.
            </p>
          </div>

          <Link
            to="/applications"
            className="btn btn-dark dashboard-add-button"
          >
            <span className="me-2">+</span>
            Add Application
          </Link>
        </section>

        <section className="dashboard-stats">
          {stats.map((stat) => (
            <article
              className="dashboard-stat-card"
              key={stat.title}
            >
              <div className="stat-card-top">
                <div className={`stat-icon ${stat.color}`}>
                  {stat.icon}
                </div>
                <span className="stat-card-label">{stat.title}</span>
              </div>

              <div className="stat-card-value">{stat.value}</div>
              <p className="stat-card-description">
                {stat.description}
              </p>
            </article>
          ))}
        </section>

        <section className="dashboard-content-grid">
          <article className="dashboard-panel status-panel">
            <div className="panel-heading">
              <div>
                <h2>Application Overview</h2>
                <p>Track the progress of your applications.</p>
              </div>
              <span className="panel-heading-icon">◉</span>
            </div>

            <div className="status-list">
              {statusItems.map((item) => {
                const count = countByStatus(item.label);
                const percentage =
                  applications.length > 0
                    ? (count / applications.length) * 100
                    : 0;

                return (
                  <div className="status-item" key={item.label}>
                    <div className="status-item-info">
                      <span className={`status-dot ${item.color}`} />
                      <span className="status-item-name">
                        {item.label}
                      </span>
                      <span className="status-item-count">
                        {count}
                      </span>
                    </div>

                    <div
                      className="status-progress-track"
                      role="progressbar"
                      aria-label={`${item.label} applications`}
                      aria-valuenow={Math.round(percentage)}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <div
                        className={`status-progress-fill ${item.color}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              to="/applications"
              className="dashboard-text-link"
            >
              View all applications <span>→</span>
            </Link>
          </article>

          <article className="dashboard-panel recent-panel">
            <div className="panel-heading">
              <div>
                <h2>Recent Applications</h2>
                <p>Your latest career activities.</p>
              </div>

              <Link
                to="/applications"
                className="dashboard-view-all"
              >
                View all
              </Link>
            </div>

            {recentApplications.length === 0 ? (
              <div className="dashboard-empty-state">
                <div className="empty-state-icon">📂</div>
                <h3>No applications yet</h3>
                <p>
                  Add your first application to start tracking
                  your progress.
                </p>
                <Link
                  to="/applications"
                  className="btn btn-dark btn-sm"
                >
                  Add your first application
                </Link>
              </div>
            ) : (
              <div className="recent-applications-list">
                {recentApplications.map((app, index) => (
                  <div
                    className="recent-application-item"
                    key={app.id ?? `${app.company}-${index}`}
                  >
                    <div className="company-avatar">
                      {String(app.company || "?")
                        .trim()
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="recent-application-details">
                      <h3>{app.company || "Unnamed Company"}</h3>
                      <p>{app.position || "Position not specified"}</p>
                    </div>

                    <div className="recent-application-meta">
                      <span
                        className={`application-status-badge ${getStatusClass(
                          app.status
                        )}`}
                      >
                        {app.status || "Unknown"}
                      </span>
                      <span className="recent-application-date">
                        {formatDate(getDate(app))}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </article>
        </section>

        <footer className="dashboard-footer">
          <span>InternTrack</span>
          <span>Every application is a step forward.</span>
        </footer>
      </div>
    </main>
  );
}

export default Dashboard;
