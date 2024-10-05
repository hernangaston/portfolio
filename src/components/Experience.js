export default function Experience() {
    return (
      <div>
        <section className="resume-section" id="experience">
          <div className="resume-section-content">
            <h2 className="mb-5">Experiencia</h2>
            <div className="d-flex flex-column flex-md-row justify-content-between mb-5">
              <div className="flex-grow-1">
                <h3 className="mb-0">Web Developer</h3>
                <div className="subheading mb-3">Devomas</div>
                <p>
                  Desarrollo de funcionalidades backend y crear APIs para proporcionar datos desde la base de datos MySQL al frontend. Garantizar que el producto sea estable, tenga menos errores e integrar nuevas tecnologías listas para la producción para enviarlas a los propietarios.
                </p>
                
                </div>
              <div className="flex-shrink-0">
                <span className="text-primary">January 2023 - August - 2023</span>
              </div>
            </div>
           
            <div className="d-flex flex-column flex-md-row justify-content-between">
              <div className="flex-grow-1">
                <h3 className="mb-0">Fullstack developer</h3>
                <div className="subheading mb-3">Vindu</div>
                <p>Creación de funciones para carga de datos extraídos de las paginas web de los clientes.
                  Participando en el backend desarrollando nuevas funciones para mostrar datos en el frontend y 
                  participando en la implementacion de nuevas funcionalidades en el frontend. </p>
              </div>
            <div className="flex-shrink-0">
                <span className="text-primary">June 2020 - June 2022</span>
              </div>
            </div>
          </div>
        </section>
        <hr className="m-0" />
      </div>
    );
  }