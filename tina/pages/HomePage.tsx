import { tinaField, useTina } from "tinacms/dist/react";
import type { PageQuery, PageQueryVariables } from "../__generated__/types";

type Props = {
  variables: PageQueryVariables;
  data: PageQuery;
  query: string;
}

const HomePage = (props: Props) => {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const page = data.page;

  const hero = page.hero || {};
  const about = page.about || {};
  const services = page.services || {};
  const portfolio = page.portfolio || {};
  const designers = page.designers || {};
  const testimonials = page.testimonials || {};
  const booking = page.booking || {};

  return (
    <main>
      <section id="hero" data-tina-field={tinaField(page, "hero")} className="hero-section">
        {hero.brandTag && (
          <span data-tina-field={tinaField(hero, "brandTag")}>{hero.brandTag}</span>
        )}
        {hero.title && (
          <h1 data-tina-field={tinaField(hero, "title")}>{hero.title}</h1>
        )}
        {hero.subtitle && (
          <h2 data-tina-field={tinaField(hero, "subtitle")}>{hero.subtitle}</h2>
        )}
        {hero.tagline && (
          <p data-tina-field={tinaField(hero, "tagline")}>{hero.tagline}</p>
        )}
        {hero.description && (
          <p data-tina-field={tinaField(hero, "description")}>{hero.description}</p>
        )}
      </section>

      <section id="about" data-tina-field={tinaField(page, "about")} className="about-section">
        {about.label && (
          <span data-tina-field={tinaField(about, "label")}>{about.label}</span>
        )}
        {about.title && (
          <h2 data-tina-field={tinaField(about, "title")}>{about.title}</h2>
        )}
        {about.description1 && (
          <p data-tina-field={tinaField(about, "description1")}>{about.description1}</p>
        )}
        {about.description2 && (
          <p data-tina-field={tinaField(about, "description2")}>{about.description2}</p>
        )}
      </section>

      <section id="services" data-tina-field={tinaField(page, "services")} className="services-section">
        {services.label && (
          <span data-tina-field={tinaField(services, "label")}>{services.label}</span>
        )}
        {services.title && (
          <h2 data-tina-field={tinaField(services, "title")}>{services.title}</h2>
        )}
        {services.description && (
          <p data-tina-field={tinaField(services, "description")}>{services.description}</p>
        )}
      </section>

      <section id="portfolio" data-tina-field={tinaField(page, "portfolio")} className="portfolio-section">
        {portfolio.label && (
          <span data-tina-field={tinaField(portfolio, "label")}>{portfolio.label}</span>
        )}
        {portfolio.title && (
          <h2 data-tina-field={tinaField(portfolio, "title")}>{portfolio.title}</h2>
        )}
        {portfolio.description && (
          <p data-tina-field={tinaField(portfolio, "description")}>{portfolio.description}</p>
        )}
      </section>

      <section id="designers" data-tina-field={tinaField(page, "designers")} className="designers-section">
        {designers.label && (
          <span data-tina-field={tinaField(designers, "label")}>{designers.label}</span>
        )}
        {designers.title && (
          <h2 data-tina-field={tinaField(designers, "title")}>{designers.title}</h2>
        )}
        {designers.description && (
          <p data-tina-field={tinaField(designers, "description")}>{designers.description}</p>
        )}
      </section>

      <section id="testimonials" data-tina-field={tinaField(page, "testimonials")} className="testimonials-section">
        {testimonials.label && (
          <span data-tina-field={tinaField(testimonials, "label")}>{testimonials.label}</span>
        )}
        {testimonials.title && (
          <h2 data-tina-field={tinaField(testimonials, "title")}>{testimonials.title}</h2>
        )}
        {testimonials.description && (
          <p data-tina-field={tinaField(testimonials, "description")}>{testimonials.description}</p>
        )}
      </section>

      <section id="booking" data-tina-field={tinaField(page, "booking")} className="booking-section">
        {booking.label && (
          <span data-tina-field={tinaField(booking, "label")}>{booking.label}</span>
        )}
        {booking.title && (
          <h2 data-tina-field={tinaField(booking, "title")}>{booking.title}</h2>
        )}
        {booking.description && (
          <p data-tina-field={tinaField(booking, "description")}>{booking.description}</p>
        )}
      </section>
    </main>
  );
};

export default HomePage;
