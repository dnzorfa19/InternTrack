import { useState, useEffect } from "react";

function Applications() {
  const [applications, setApplications] = useState([]);

  const [form, setForm] = useState({
    company: "",
    position: "",
    date: "",
    status: "",
    type: "",
    notes: ""
  });

  const [editingId, setEditingId] = useState(null);

  // Search and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    const savedApplications =
      JSON.parse(localStorage.getItem("applications")) || [];

    setApplications(savedApplications);
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setForm({
      company: "",
      position: "",
      date: "",
      status: "",
      type: "",
      notes: ""
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.company) {
      alert("Please enter the company name.");
      return;
    }

    if (!form.position) {
      alert("Please enter the position.");
      return;
    }

    if (!form.date) {
      alert("Please select the application date.");
      return;
    }

    if (!form.status) {
      alert("Please select a status.");
      return;
    }

    if (!form.type) {
      alert("Please select an application type.");
      return;
    }

    // UPDATE
    if (editingId !== null) {
      const updatedApplications = applications.map((application) =>
        application.id === editingId
          ? {
              ...application,
              ...form
            }
          : application
      );

      setApplications(updatedApplications);

      localStorage.setItem(
        "applications",
        JSON.stringify(updatedApplications)
      );

      alert("Application updated successfully!");

      setEditingId(null);
      resetForm();

      return;
    }

    // ADD
    const newApplication = {
      id: Date.now(),
      ...form
    };

    const updatedApplications = [
      ...applications,
      newApplication
    ];

    setApplications(updatedApplications);

    localStorage.setItem(
      "applications",
      JSON.stringify(updatedApplications)
    );

    alert("Application added successfully!");

    resetForm();
  };

  const handleEdit = (application) => {
    setForm({
      company: application.company,
      position: application.position,
      date: application.date,
      status: application.status,
      type: application.type,
      notes: application.notes
    });

    setEditingId(application.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmDelete) {
      return;
    }

    const updatedApplications = applications.filter(
      (application) => application.id !== id
    );

    setApplications(updatedApplications);

    localStorage.setItem(
      "applications",
      JSON.stringify(updatedApplications)
    );

    alert("Application deleted successfully!");
  };

  // STATUS BADGE
  const getStatusBadge = (status) => {
    switch (status) {
      case "Applied":
        return "badge bg-primary";

      case "Interview":
        return "badge bg-warning text-dark";

      case "Accepted":
        return "badge bg-success";

      case "Rejected":
        return "badge bg-danger";

      default:
        return "badge bg-secondary";
    }
  };

  // SEARCH + FILTER
  const filteredApplications = applications.filter(
    (application) => {
      const matchesSearch =
        application.company
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        application.position
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === "" ||
        application.status === filterStatus;

      return matchesSearch && matchesStatus;
    }
  );

  return (
    <div className="container-fluid applications-page">

      {/* HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold">
          Applications
        </h2>

        <p className="text-muted">
          Manage your internship and job applications.
        </p>
      </div>

      <div className="row">

        {/* FORM */}
        <div className="col-lg-4 mb-4">

          <div className="card shadow-sm border-0">

            <div className="card-body">

              <h5 className="fw-bold mb-4">

                {editingId !== null
                  ? "Update Application"
                  : "Add New Application"}

              </h5>

              <form onSubmit={handleSubmit}>

                {/* COMPANY */}
                <div className="mb-3">

                  <label className="form-label">
                    Company
                  </label>

                  <input
                    type="text"
                    name="company"
                    className="form-control"
                    value={form.company}
                    onChange={handleChange}
                  />

                </div>

                {/* POSITION */}
                <div className="mb-3">

                  <label className="form-label">
                    Position
                  </label>

                  <input
                    type="text"
                    name="position"
                    className="form-control"
                    value={form.position}
                    onChange={handleChange}
                  />

                </div>

                {/* DATE */}
                <div className="mb-3">

                  <label className="form-label">
                    Application Date
                  </label>

                  <input
                    type="date"
                    name="date"
                    className="form-control"
                    value={form.date}
                    onChange={handleChange}
                  />

                </div>

                {/* STATUS */}
                <div className="mb-3">

                  <label className="form-label">
                    Status
                  </label>

                  <select
                    name="status"
                    className="form-select"
                    value={form.status}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select
                    </option>

                    <option value="Applied">
                      Applied
                    </option>

                    <option value="Interview">
                      Interview
                    </option>

                    <option value="Accepted">
                      Accepted
                    </option>

                    <option value="Rejected">
                      Rejected
                    </option>

                  </select>

                </div>

                {/* TYPE */}
                <div className="mb-3">

                  <label className="form-label">
                    Type
                  </label>

                  <select
                    name="type"
                    className="form-select"
                    value={form.type}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select
                    </option>

                    <option value="Internship">
                      Internship
                    </option>

                    <option value="Full Time">
                      Full Time
                    </option>

                    <option value="Part Time">
                      Part Time
                    </option>

                  </select>

                </div>

                {/* NOTES */}
                <div className="mb-3">

                  <label className="form-label">
                    Notes
                  </label>

                  <textarea
                    name="notes"
                    className="form-control"
                    rows="3"
                    value={form.notes}
                    onChange={handleChange}
                  />

                </div>

                {/* BUTTONS */}
                <div className="d-flex gap-2">

                  <button
                    type="submit"
                    className="btn btn-dark w-100"
                  >

                    {editingId !== null
                      ? "Update Application"
                      : "+ Add Application"}

                  </button>

                  {editingId !== null && (

                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        setEditingId(null);
                        resetForm();
                      }}
                    >
                      Cancel
                    </button>

                  )}

                </div>

              </form>

            </div>

          </div>

        </div>

        {/* LIST */}
        <div className="col-lg-8">

          <div className="card shadow-sm border-0">

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center mb-4">

                <h5 className="fw-bold mb-0">
                  Application List
                </h5>

                <span className="badge bg-dark">
                  {filteredApplications.length} Applications
                </span>

              </div>

              {/* SEARCH + FILTER */}

              <div className="row mb-4">

                <div className="col-md-7 mb-2">

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search company or position..."
                    value={searchTerm}
                    onChange={(e) =>
                      setSearchTerm(e.target.value)
                    }
                  />

                </div>

                <div className="col-md-5 mb-2">

                  <select
                    className="form-select"
                    value={filterStatus}
                    onChange={(e) =>
                      setFilterStatus(e.target.value)
                    }
                  >

                    <option value="">
                      All Statuses
                    </option>

                    <option value="Applied">
                      Applied
                    </option>

                    <option value="Interview">
                      Interview
                    </option>

                    <option value="Accepted">
                      Accepted
                    </option>

                    <option value="Rejected">
                      Rejected
                    </option>

                  </select>

                </div>

              </div>

              {/* TABLE */}

              {filteredApplications.length === 0 ? (

                <div className="text-center text-muted py-5">

                  <div className="fs-1">
                    📋
                  </div>

                  <p className="mt-3">
                    No applications found.
                  </p>

                </div>

              ) : (

                <div className="table-responsive">

                  <table className="table table-hover align-middle">

                    <thead>

                      <tr>

                        <th>
                          Company
                        </th>

                        <th>
                          Position
                        </th>

                        <th>
                          Date
                        </th>

                        <th>
                          Status
                        </th>

                        <th>
                          Type
                        </th>

                        <th>
                          Actions
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {filteredApplications.map(
                        (application) => (

                          <tr key={application.id}>

                            <td className="fw-bold">
                              {application.company}
                            </td>

                            <td>
                              {application.position}
                            </td>

                            <td>
                              {application.date}
                            </td>

                            <td>

                              <span
                                className={getStatusBadge(
                                  application.status
                                )}
                              >
                                {application.status}
                              </span>

                            </td>

                            <td>
                              {application.type}
                            </td>

                            <td>

                              <div className="d-flex gap-2">

                                <button
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() =>
                                    handleEdit(application)
                                  }
                                >
                                  Edit
                                </button>

                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() =>
                                    handleDelete(
                                      application.id
                                    )
                                  }
                                >
                                  Delete
                                </button>

                              </div>

                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Applications;