import "./quotation.css";
import { quotes } from "../data";

const Quotation = () => {
  let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <section id="quotation">
      <h2 className="section-title divider">Quote of the day</h2>
      <blockquote
      // data-aos="fade-up"
      // data-aos-delay="200"
      // data-aos-duration="1000"
      >
        <q>{randomQuote.quote}</q>
        <div className="author-name">{randomQuote.author}</div>
      </blockquote>
    </section>
  );
};

export default Quotation;
