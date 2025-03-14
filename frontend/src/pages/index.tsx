import DefaultLayout from "@/layouts/default";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h1 className="text-2xl font-bold">Prueba</h1>

        {/* 🔹 Carrusel de imágenes */}
        <div className="w-full max-w-3xl">
          <Carousel>
            <Carousel.Item interval={6000}>
              <img className="d-block w-100 rounded-lg" src="/src/assets/slide01.jpg" alt="First slide" />
            </Carousel.Item>
            <Carousel.Item interval={6000}>
              <img className="d-block w-100 rounded-lg" src="/src/assets/slide02.jpg" alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item interval={6000}>
              <img className="d-block w-100 rounded-lg" src="/src/assets/slide03.jpg" alt="Third slide" />
            </Carousel.Item>
          </Carousel>
        </div>

      </section>
    </DefaultLayout>
  );
}
