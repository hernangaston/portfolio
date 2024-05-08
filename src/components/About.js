export default function About() {
    return (
      <section className="resume-section" id="about">
        <div className="resume-section-content">
          <h1 className="mb-0">
            Hernan
            <span className="text-primary"> Gaston</span>
          </h1>
          <div className="subheading mb-5">FULL-STACK Developer - Santa Fe, Argentina</div>
          <p className="lead mb-5">
            I am experienced in building websites and backend development. My previous experience 
            of working in product based companies as well as emerging startups will surely 
            help in product development for companies at various stages.
          </p>
          <p className="lead mb-5">
            Tengo experiencia en la construcción de sitios web y desarrollo backend. Mi experiencia previa de trabajo en empresas basadas en productos,
            así como startups emergentes seguramente ayudará en el desarrollo de productos para empresas en diversas etapas.
          </p>
          <div className="social-icons">
            <a
              className="social-icon"
              href="https://www.linkedin.com/in/hernan-gaston" target="_blank" rel="noreferrer"
            >
              <i className="fab fa-linkedin-in" />
            </a>
            <a className="social-icon" href="https://github.com/hernangaston" target="_blank" rel="noreferrer">
              <i className="fab fa-github" />
            </a>
          </div>
        </div>
      </section>
    );
  }