function Hero() {
  return (
    <section
      className="text-white text-center d-flex align-items-center justify-content-center"
      style={{
        minHeight: "60vh",
        backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
          url('https://wallpapercave.com/wp/wp3277657.jpg')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container">
        <div className="p-5 rounded">
          <h1 className="display-3 fw-bold mb-3 animate_animated animate_fadeInDown">
            Bienvenido al universo Rick & Morty
          </h1>
          <p className="lead fs-4 animate_animated animate_fadeInUp">
            Explora todos los personajes de la serie con esta app interactiva
          </p>
          <a
            href="/list"
            className="btn btn-outline-light btn-lg mt-4 animate_animated animate_fadeIn"
          >
            Ver Personajes
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;