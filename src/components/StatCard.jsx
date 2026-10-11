function StatCard({ title, value, icon }) {
  return (
    <div className="col-md-3 mb-4">

      <div className="card stat-card shadow-sm border-0 h-100">

        <div className="card-body">

          <div className="d-flex justify-content-between align-items-center">

            <div>

              <h6 className="text-muted mb-2">
                {title}
              </h6>

              <h2 className="fw-bold mb-0">
                {value}
              </h2>

            </div>

            <div className="fs-1">
              {icon}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default StatCard;