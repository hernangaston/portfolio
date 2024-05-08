export default function Education() {
    return (
      <div>
        <section className="resume-section" id="education">
          <div className="resume-section-content">
            <h2 className="mb-5">Education</h2>
            <div className="d-flex flex-column flex-md-row justify-content-between mb-5">
              <div className="flex-grow-1">
                <h3 className="mb-0">National Tecnology University</h3>
                <div className="subheading mb-3">University technician in programming</div>
                <div>
                  Full-stack web developer.
                </div>
                <p>Percentage: Above 80% in all semesters</p>
              </div>
              <div className="flex-shrink-0">
                <span className="text-primary">April 2023 - Present</span>
              </div>
            </div>
            <div className="d-flex flex-column flex-md-row justify-content-between">
              <div className="flex-grow-1">
                <h3 className="mb-0">
                  High School - E.M.P.I. Nº 3004 "San José", Villa Cañás.
                </h3>
                <div className="subheading mb-3">
                  Commercial expert
                </div>
                <p>Completed</p>
              </div>
              <div className="flex-shrink-0">
                <span className="text-primary">1994 - 1999</span>
              </div>
            </div>
          </div>
        </section>
        <hr className="m-0" />
      </div>
    );
  }